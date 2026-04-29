import { useNavigate, useParams } from 'react-router-dom';
import Chat from './xChat';
import { useEffect, useState } from 'react';
import { NodeInstance } from '../../APIs/axiosInstance';
import UserProfleCard from '../../UI/UserProfleCard';
import type { User } from '../../types/user';

function MessagePage() {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const response = await NodeInstance.get('/users', {
        withCredentials: true,
      });
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen w-full gap-4 bg-blue-200">
      <div className="flex h-full min-h-0 w-1/3 flex-col border-r-2 border-neutral-300 pr-2">
        <div className="py-2 text-xl font-semibold">Messages</div>
        <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto rounded-xl">
          {users.map((user) => (
            <UserProfleCard
              user={user}
              key={user._id}
              onClickHandler={() => navigate(`/message/t/${user?._id}/`)}
              className="rounded-none"
            />
          ))}
        </div>
      </div>
      {id && <Chat user={users.find((u) => u._id === id)} />}
    </div>
  );
}

export default MessagePage;
