import { useEffect, useRef } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";
import type { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../app/features/authSlice";
import type { RootState } from "../../app/store";

const MyProfile = () => {
  const dispatch = useDispatch()
  const fetched  = useRef(false)

  const user = useSelector((state:RootState)=>state.auth.user)
  console.log(user.firstname)

  useEffect(() => {
    async function getProfileDetails() {
      if (fetched.current)
        return
      try {
        const response = await NodeInstance("/auth/me", {
          withCredentials: true,
        });
        dispatch(
          setUser(response.data)
        )
        fetched.current=true
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorData = axiosError?.response?.data as { message?: string };
        console.log(errorData?.message);
      }
    }
    if(user._id==="")
      getProfileDetails();
  }, []);

  if (user._id==="")
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center gap-1 rounded-xl bg-orange-100">
        <div className="size-24 overflow-hidden rounded-full bg-pink-200">
          <img
            src={`https://plus.unsplash.com/premium_vector-1721131162397-943dc390c744?w=352&dpr=1&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0`}
            alt=""
          />
        </div>
        <div className="mt-1 text-lg font-semibold">You are not Logged in</div>
        <div className="text-neutral-500">Please log in</div>
      </div>
    );

  return (
    <div className="flex h-60 w-full flex-col items-center justify-center gap-1 rounded-xl bg-orange-100">
      <div className="size-24 overflow-hidden rounded-full bg-pink-200">
        <img src={user.ProfilePicture} alt="" />
      </div>
      <div className="mt-1 text-lg font-semibold">
        {user.firstname} {user.lastname}
      </div>
      <div className="text-neutral-500">@{user.userId}</div>
    </div>
  );
};

export default MyProfile;
