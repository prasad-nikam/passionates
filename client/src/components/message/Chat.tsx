import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SendHorizonal } from 'lucide-react';
import { socket } from '../../utils/socket';
import type { User } from '../../types/user';
import { NodeInstance } from '../../APIs/axiosInstance';
import { useParams } from 'react-router-dom';

type Msg = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  createdAt: string;
};

export default function Chat({ user }: { user?: User }) {
  const { id } = useParams();

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMsgs = async () => {
      const response = await NodeInstance.get(`/messages/${id}`, {
        withCredentials: true,
      });
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
    };
    fetchMsgs();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    const handler = (data: any) => {
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

  const sendMsg = () => {
    if (!text.trim()) return;
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
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b py-3 text-lg font-semibold">Chat</div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
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
                    ? 'rounded-br-md bg-black text-white'
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

      <div className="flex items-center gap-1 p-3">
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
