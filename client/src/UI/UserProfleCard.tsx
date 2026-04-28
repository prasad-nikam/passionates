import { motion } from 'motion/react';
import ProfileAvatar from './ProfileAvatar';
import { EllipsisVertical } from 'lucide-react';
import type { User } from '../types/user';
import { cn } from '../utils/cn';

function UserProfleCard({
  user,
  onClickHandler,
  className,
}: {
  user: User;
  className?: string;
  onClickHandler?: () => void;
}) {
  return (
    <motion.div
      onClick={onClickHandler}
      className={cn(
        `flex w-full cursor-pointer items-center gap-2 rounded-xl bg-neutral-200 p-4 text-black`,
        className
      )}
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
