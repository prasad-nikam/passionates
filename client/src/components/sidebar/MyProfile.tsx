import { useEffect, useState } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";
import type { AxiosError } from "axios";

interface UserProfile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  interests: string[];
  ProfilePicture?: string;
  userId?: string;
}

const MyProfile = () => {
  const [data, setResponse] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function getProfileDetails() {
      try {
        const response = await NodeInstance("/auth/me", {
          withCredentials: true,
        });
        setResponse(response?.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorData = axiosError?.response?.data as { message?: string };
        console.log(errorData?.message);
      }
    }
    getProfileDetails();
  }, []);

  if (!data)
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center gap-1 rounded-xl bg-orange-100">
        <div className="size-24 overflow-hidden rounded-full bg-pink-200">
          <img
            src={`https://plus.unsplash.com/premium_vector-1721131162397-943dc390c744?w=352&dpr=1&h=367&auto=format&fit=crop&q=60&ixlib=rb-4.1.0`}
            alt=""
          />
        </div>
        <div className="mt-1 text-lg font-semibold">You are not Logged in</div>
        <div className="text-neutral-500">Please log in</div>
      </div>
    );

  return (
    <div className="flex h-60 w-full flex-col items-center justify-center gap-1 rounded-xl bg-orange-100">
      <div className="size-24 overflow-hidden rounded-full bg-pink-200">
        <img src={data.ProfilePicture} alt="" />
      </div>
      <div className="mt-1 text-lg font-semibold">
        {data.firstname} {data.lastname}
      </div>
      <div className="text-neutral-500">@{data.userId}</div>
    </div>
  );
};

export default MyProfile;
