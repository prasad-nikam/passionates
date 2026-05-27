import { useEffect, useState } from 'react';
import UserProfleCard from '../../UI/UserProfleCard';
import { NodeInstance } from '../../APIs/axiosInstance';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/user';

function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
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

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        if (!query.trim()) {
          // setUsers([]);
          return;
        }
        const response = await NodeInstance.get(`/users/search?q=${query}`, {
          withCredentials: true,
        });
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);
  return (
    <div className="size-3xl mx-auto flex flex-col items-center gap-4 rounded-2xl">
      <div className="flex h-12 items-center justify-center bg-white/40">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Type to search profiles"
          className="h-full w-2xl rounded-l-full border-2 border-r-0 border-black/40 bg-white/40 px-4 py-2 pr-10 text-black placeholder-neutral-500 backdrop-blur-md focus:border-2 focus:border-r-0 focus:border-black focus:outline-none"
        />
        <button className="h-full cursor-pointer rounded-r-full border-2 border-l-0 border-black bg-black px-4 text-lg text-white hover:bg-neutral-800">
          Search
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col gap-2">
        {users.map((user) => (
          <UserProfleCard
            user={user}
            key={user._id}
            onClickHandler={() => {
              navigate(`/profile/${user._id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
