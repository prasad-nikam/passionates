import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { useState, useRef, useEffect, useCallback } from 'react';
import { NodeInstance } from '../../APIs/axiosInstance';
import { socket } from '../../utils/socket';
import { motion } from 'motion/react';
import { ArrowLeft, SendHorizonal } from 'lucide-react';
import { cn } from '../../utils/cn';
import ProfileAvatar from '../../UI/ProfileAvatar';
type Msg = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  createdAt?: any;
};
function Chat({ className }: { className?: string }) {
  // const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.chatList.currentUser);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchMsgs = async () => {
      if (!user?._id) return;
      setIsLoading(true);
      const response = await NodeInstance.get(`/messages/${user?._id}`, {
        withCredentials: true,
      });
      if (!active) return;

      let data = response.data as [];
      let oldmsgs = data.map(
        (m: {
          reciever: string;
          text: string;
          _id: string;
          sender: string;
          createdAt: string;
        }) => {
          const oldmsg: Msg = {
            id: m._id,
            text: m.text,
            sender: m.sender === user?._id ? 'other' : 'me',
            createdAt: m.createdAt,
          };
          return oldmsg;
        }
      );
      setMsgs(oldmsgs);
      setIsLoading(false);
    };
    fetchMsgs();

    return () => {
      active = false;
    };
  }, [user?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [msgs.length]);

  useEffect(() => {
    const handler = (data: any) => {
      if (data.senderId !== user?._id) return;
      const newMsg: Msg = {
        id: crypto.randomUUID(),
        text: data.text,
        sender: 'other',
        createdAt: Date.now(),
      };
      setMsgs((prev) => [...prev, newMsg]);
    };
    socket.on('chat:receive', handler);

    return () => {
      socket.off('chat:receive', handler);
    };
  }, []);

  const sendMsg = useCallback(() => {
    if (!text.trim() || !user?._id) return;
    const newMsg: Msg = {
      id: crypto.randomUUID(),
      text,
      sender: 'me',
      createdAt: Date.now(),
    };
    let receiverId = user?._id;
    socket.emit('chat:sent', { text, receiverId });
    setMsgs((msg) => [...msg, newMsg]);
    setText('');
  }, [text, user?._id]);

  if (!user)
    return (
      <div
        className={cn('flex size-full items-center justify-center', className)}
      >
        {' '}
        Your Chats will appear here
      </div>
    );

  if (isLoading)
    return (
      <div
        className={cn('flex size-full items-center justify-center', className)}
      >
        {' '}
        Loading...
      </div>
    );

  return (
    <div
      className={cn(
        'flex size-full min-h-0 flex-col',
        'md:border-l md:border-neutral-200',
        className
      )}
    >
      <div className="flex h-16 w-full items-center justify-between border-b border-neutral-200 px-2">
        <div className="flex gap-2">
          <ArrowLeft onClick={() => navigate('/message')} />
          <div>
            {/* <ProfileAvatar profilePic={user?.profilePic} className='size-5'/> */}
            {user?.firstname} {user?.lastname}
          </div>
        </div>
      </div>
      <div className="flex size-full min-h-0 flex-col gap-1 overflow-y-auto px-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {msgs.map((msg) => {
          const isMe = msg.sender === 'me';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow ${
                  isMe
                    ? 'rounded-br-md bg-neutral-900 text-white'
                    : 'rounded-bl-md bg-neutral-200 text-black'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-1 p-2 px-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
          placeholder="Type a message..."
          className="h-full flex-1 rounded-l-md border border-black/40 bg-white/40 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:border-2 focus:border-black focus:outline-none"
        />

        <button
          onClick={sendMsg}
          className="rounded-r-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
        >
          <SendHorizonal className="active:scale-90" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
