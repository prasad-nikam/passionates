import { motion } from 'motion/react';
import ProfileAvatar from './ProfileAvatar';
import { useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePic: string;
}

function UserProfleCard({ user }: { user: User }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/profile/${user._id}`)}
      className={`flex w-full cursor-pointer items-center gap-2 rounded-xl bg-neutral-200 p-4 text-black`}
    >
      <div className="size-12 overflow-hidden rounded-full bg-pink-200">
        <ProfileAvatar profilePic={user.profilePic} />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <div className="font-semibold">
            {user.firstname} {user.lastname}
          </div>
          <div className="text-sm text-neutral-500">@{user.email}</div>
        </div>
        <div className="relative p-1 text-neutral-500 hover:text-neutral-800">
          <EllipsisVertical className="size-5 w-fit" />
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfleCard;
