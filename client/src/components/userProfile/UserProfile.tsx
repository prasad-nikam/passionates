import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NodeInstance } from '../../APIs/axiosInstance';
import type { AxiosError } from 'axios';
import ProfileAvatar from '../../UI/ProfileAvatar';
import { useDispatch } from 'react-redux';
import { pushToChatList } from '../../app/features/chatListSlice';

interface UserProfile {
  _id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  bio: string | null;
  profilePic: string | null;
  followersCount: number | null;
  followingCount: number | null;
  postsCount: number | null;
  isFollowed: boolean | null;
  privacy: 'private' | 'public';
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const fetched = useRef(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProfileDetails() {
      if (fetched.current || !id) return;
      try {
        const response = await NodeInstance.get<UserProfile>(`/users/${id}`, {
          withCredentials: true,
        });
        setUser(response.data);
        fetched.current = true;
        console.log(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorData = axiosError?.response?.data as { message?: string };
        console.log(errorData?.message);
      }
    }
    if (!user?._id) getProfileDetails();
  }, [id, user?._id]);

  const handleFollowClick = async () => {
    try {
      if (user?.isFollowed) {
        await NodeInstance.post(
          `/unfollow/${id}`,
          {},
          {
            withCredentials: true,
          }
        ).catch((err) => {
          console.log(err);
        });

        setUser((prev) =>
          prev
            ? {
                ...prev,
                isFollowed: false,
                followersCount: (prev.followersCount ?? 0) - 1,
              }
            : prev
        );
      } else {
        await NodeInstance.post(
          `/follow/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        setUser((prev) =>
          prev
            ? {
                ...prev,
                isFollowed: true,
                followersCount: (prev.followersCount ?? 0) + 1,
              }
            : prev
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-auto flex w-2xl flex-col items-start">
      <div className="flex h-fit w-full">
        <div className="flex flex-col items-center">
          <div className="size-36 rounded-full bg-blue-100">
            <ProfileAvatar
              profilePic={user?.profilePic ?? null}
              camera={true}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="text-lg font-bold">
            {user?.firstname} {user?.lastname}
          </div>
          <div className="text-sm text-neutral-500">{user?.email}</div>
          <div className="flex gap-12">
            <div className="text-sm font-bold">
              {user?.followersCount} Followers
            </div>
            <div className="text-sm font-bold">{user?.postsCount} Posts</div>
          </div>
          <div className="whitespace-pre-line text-neutral-900">
            {user?.bio}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start gap-4">
        <button
          onClick={() => {
            dispatch(pushToChatList(user));
            navigate(`/message/t/${user?._id}/`);
          }}
          className="mx-1 mt-4 w-1/2 cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800"
        >
          message
        </button>
        <button
          onClick={handleFollowClick}
          className="mx-1 mt-4 w-1/2 cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800"
        >
          {user?.isFollowed
            ? 'unfollow'
            : user?.privacy === 'private'
              ? 'Send Request'
              : 'follow'}

          {/* {user?.isFollowed ? 'unfollow' : 'follow'} */}
        </button>
      </div>
      <div className="my-2 w-full border-t-2 border-neutral-200"></div>
    </div>
  );
}

export default UserProfile;
