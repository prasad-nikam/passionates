import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NodeInstance } from '../../APIs/axiosInstance';
import type { AxiosError } from 'axios';
import ProfileAvatar from '../../UI/ProfileAvatar';

interface UserProfile {
  _id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  freinds: unknown[];
  posts: unknown[];
  bio: string | null;
  profilePic: string | null;
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const fetched = useRef(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function getProfileDetails() {
      if (fetched.current || !id) return;
      try {
        const response = await NodeInstance.get<UserProfile>(`/users/${id}`, {
          withCredentials: true,
        });
        setUser(response.data);
        fetched.current = true;
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorData = axiosError?.response?.data as { message?: string };
        console.log(errorData?.message);
      }
    }
    if (!user?._id) getProfileDetails();
  }, [id, user?._id]);

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
              {user?.freinds ? user?.freinds.length : 0} Freinds
            </div>
            <div className="text-sm font-bold">
              {user?.posts ? user?.posts.length : 0} Posts
            </div>
          </div>
          <div className="whitespace-pre-line text-neutral-900">
            {user?.bio}
          </div>
        </div>
      </div>
      <div className="mt-4">{edit ? null : 'Posts'}</div>
      <div className="my-2 w-full border-t-2 border-neutral-200"></div>
    </div>
  );
}

export default UserProfile;
