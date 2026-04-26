import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function ProfileAvatar({
  profilePic,
  className,
  camera,
}: {
  profilePic: string | null;
  className?: string;
  camera?: boolean;
}) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative size-full rounded-full bg-linear-to-tr from-blue-400 via-indigo-400 to-purple-400 p-0.75 shadow-lg"
      >
        <div className="flex size-full items-center justify-center overflow-hidden rounded-full bg-white">
          {profilePic ? (
            <img
              src={profilePic}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl font-semibold text-gray-500">{'U'}</span>
          )}
        </div>
      </motion.div>

      {/* Edit Button */}
      {camera && (
        <button
          onClick={() => console.log('Not Implemented yet')}
          className="absolute right-2 bottom-2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
        >
          <Camera className="h-4 w-4 text-gray-700" />
        </button>
      )}
    </div>
  );
}
