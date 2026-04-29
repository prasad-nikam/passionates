import ChatList from './ChatList';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../app/features/chatListSlice';
import type { RootState } from '../../app/store';

function Messages() {
  const totalUsers = useSelector(
    (state: RootState) => state.chatList.totalusers
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(setCurrentChat(id));
  }, [totalUsers, dispatch, id]);
  return (
    <div className="flex h-full min-h-0 w-full">
      <ChatList className={cn('w-full md:flex md:w-lg', id ? 'hidden' : ' ')} />
      <Chat className={cn('md:flex', !id ? 'hidden' : ' ')} />
    </div>
  );
}

export default Messages;
