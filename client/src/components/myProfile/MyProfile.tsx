import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useState } from 'react';
import EditProfile from './EditProfile';
import ProfileAvatar from '../../UI/ProfileAvatar';
function MyProfile() {
  const [edit, setEdit] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="mx-auto flex w-2xl flex-col items-start">
      <div className="flex h-fit w-full">
        <div className="flex flex-col items-center">
          <div className="size-36 rounded-full bg-blue-100">
            <ProfileAvatar camera={true} />
          </div>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="mx-1 mt-4 cursor-pointer rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="text-lg font-bold">
            {user.firstname} {user.lastname}
          </div>
          <div className="text-sm text-neutral-500">{user.email}</div>
          <div className="flex gap-12">
            <div className="text-sm font-bold">
              {user.freinds ? user.freinds.length : 0} Freinds
            </div>
            <div className="text-sm font-bold">
              {user.posts ? user.posts.length : 0} Posts
            </div>
          </div>
          <div className="whitespace-pre-line text-neutral-900">{user.bio}</div>
        </div>
      </div>
      <div className="mt-4">{edit ? null : 'Posts'}</div>
      <div className="my-2 w-full border-t-2 border-neutral-200"></div>
      {!edit && <div className="w-full flex-1 bg-red-300"></div>}
      {edit && (
        <div className="w-full flex-1 overflow-y-auto">
          <EditProfile setEdit={setEdit} />
        </div>
      )}
    </div>
  );
}

export default MyProfile;
