import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NodeInstance } from '../../APIs/axiosInstance';
import UserProfleCard from '../../UI/UserProfleCard';
import { useDispatch, useSelector } from 'react-redux';
import { setChatList } from '../../app/features/chatListSlice';
import { cn } from '../../utils/cn';
import type { RootState } from '../../app/store';

function ChatList({ className }: { className?: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state: RootState) => state.chatList);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        if (users.totalusers.length > 0) {
          return;
        }

        setIsLoading(true);
        const { data } = await NodeInstance.get('/chatusers', {
          withCredentials: true,
        });

        if (isMounted) dispatch(setChatList(data));
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [users.totalusers.length, dispatch]);

  const userClickHandler = useCallback(
    (id: string) => {
      navigate(`/message/t/${id}/`);
    },
    [navigate]
  );

  if (isLoading)
    return (
      <div className={cn('flex size-full justify-center pt-4', className)}>
        {' '}
        Loading...
      </div>
    );

  return (
    <div
      className={cn(
        'flex h-full w-xl flex-col gap-1 px-2',
        'lg:border-l lg:border-neutral-200',
        'overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {users.totalusers.map((u) => (
        <UserProfleCard
          className={cn(
            'bg-neutral-50',
            users.currentUser?._id === u._id ? 'bg-neutral-200' : null
          )}
          key={u._id}
          user={u}
          onClickHandler={() => userClickHandler(u._id)}
        />
      ))}
    </div>
  );
}

export default ChatList;
