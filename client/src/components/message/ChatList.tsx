import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NodeInstance } from '../../APIs/axiosInstance';
import type { User } from '../../types/user';
import UserProfleCard from '../../UI/UserProfleCard';
import { useDispatch } from 'react-redux';
import { setChatList, setCurrentChat } from '../../app/features/chatListSlice';
import { cn } from '../../utils/cn';

function ChatList({ className }: { className?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUsers() {
      const response = await NodeInstance.get('/users', {
        withCredentials: true,
      });
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    dispatch(setChatList(users));
  }, [users]);

  const userClickHandler = (u: User) => {
    navigate(`/message/t/${u?._id}/`);
    dispatch(setCurrentChat(u._id));
  };
  return (
    <div className={cn(`flex h-full w-xl flex-col border-r px-2`, className)}>
      {users.map((u) => (
        <UserProfleCard
          key={u._id}
          user={u}
          onClickHandler={() => {
            userClickHandler(u);
          }}
        />
      ))}
    </div>
  );
}

export default ChatList;
