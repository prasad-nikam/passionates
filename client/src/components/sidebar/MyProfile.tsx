import { useEffect, useRef, useState } from 'react';
import { NodeInstance } from '../../APIs/axiosInstance';
import type { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../app/features/authSlice';
import type { RootState } from '../../app/store';
import { EllipsisVertical } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileAvatar from '../../UI/ProfileAvatar';
import { motion } from 'motion/react';

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetched = useRef(false);
  const [logoutButton, setLogoutButton] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const { pathname } = useLocation();

  useEffect(() => {
    async function getProfileDetails() {
      if (fetched.current) return;
      try {
        const response = await NodeInstance.get('/auth/me', {
          withCredentials: true,
        });
        dispatch(setUser(response.data));
        fetched.current = true;
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorData = axiosError?.response?.data as { message?: string };
        console.log(errorData?.message);
      }
    }
    if (!user._id) getProfileDetails();
  }, [user, fetched]);

  const logOut = async () => {
    try {
      await NodeInstance.delete('/auth/logout', { withCredentials: true }).then(
        () => {
          let u = {
            _id: null,
            firstname: null,
            lastname: null,
            email: null,
            interests: [],
            profilePic: null,
            userId: null,
            socketID: null,
          };
          dispatch(setUser(u));
        }
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError?.response?.data as { message?: string };
      console.log(errorData?.message);
    }
  };

  if (!user._id)
    return (
      <div className="flex w-full items-center gap-2 rounded-full bg-orange-100 p-2">
        <div className="size-12 overflow-hidden rounded-full bg-pink-200">
          <ProfileAvatar className="h-full w-full" camera={false} />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div>
            <div className="text-sm font-semibold">You are not Logged in</div>
            <div className="text-sm text-neutral-500">Please login</div>
          </div>
          <div className="relative">
            <button
              onClick={() => navigate('/login')}
              className="cursor-pointer rounded-full bg-black px-4 py-1 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );

  console.log(user);
  return (
    <motion.div
      onClick={() => navigate('/me')}
      className={`flex w-full cursor-pointer items-center gap-2 rounded-full p-2 ${pathname === '/me' ? 'bg-neutral-200 text-black' : 'bg-neutral-200 text-black'}`}
    >
      <div className="size-12 overflow-hidden rounded-full bg-pink-200">
        <ProfileAvatar />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <div className="font-semibold">
            {user.firstname} {user.lastname}
          </div>
          <div className="text-sm text-neutral-500">@{user.email}</div>
        </div>
        <div
          onClick={() => setLogoutButton((prev) => !prev)}
          className="relative p-1 text-neutral-500 hover:text-neutral-800"
        >
          <EllipsisVertical className="size-5 w-fit" />
          {logoutButton && (
            <div className="absolute -bottom-12 left-1/2 -translate-1/2 rounded-md bg-black text-sm font-semibold text-white">
              <div className="relative">
                <div className="absolute left-1/2 size-2 -translate-1/2 rotate-45 bg-black"></div>
                <div onClick={logOut} className="px-2 py-1">
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
