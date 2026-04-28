import { useNavigate, useParams } from 'react-router-dom';
import Chat from './Chat';
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

  // useEffect(() => {
  //   if (id) {
  //     const user = users.filter((u) => u._id == id);
  //   }
  // }, [id]);

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-1/3 flex-col border-r-2 border-neutral-300 pr-2">
        <div className="py-2 text-xl font-semibold">Messages</div>
        <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden rounded-xl">
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
