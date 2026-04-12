import React, { useState } from 'react';
import type { AxiosError } from 'axios';
import { NodeInstance } from '../../APIs/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../app/features/authSlice';
import FileInput from '../../UI/FileInput';
import type { RootState } from '../../app/store';

interface EditProfileProps {
  setEdit: (value: boolean) => void;
}
function EditProfile({ setEdit }: EditProfileProps) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user.name || '',
    interests: '',
    bio: user.bio || '',
  });

  const uploadProfile = async (fl: File) => {
    const fd = new FormData();
    fd.append('profilePic', fl);
    await NodeInstance.post('/upload-profile', fd, { withCredentials: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (file) {
        uploadProfile(file);
      }
      const response = await NodeInstance.patch('/users', formData, {
        withCredentials: true,
      });
      if (response.status == 200) {
        dispatch(
          setUser({ ...user, interests: formData.interests, bio: formData.bio })
        );
        setEdit(false);
      }
    } catch (error) {
      let err = error as AxiosError;
      console.log(err.message);
    }
    setEdit(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex size-full justify-center pt-4">
      <form
        onSubmit={handleSubmit}
        className="scroll-my-auto flex w-sm flex-col gap-4"
      >
        <div className="mt-6 mb-2 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Edit Profile
          </h2>
          <p className="text-sm text-neutral-500">
            Update your personal information and profile details
          </p>
          <div className="h-px w-full bg-neutral-300" />
        </div>
        <input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full max-w-sm rounded-xl border border-white/40 bg-white/60 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          name="interests"
          value={formData?.interests}
          onChange={handleChange}
          placeholder="Enter Your Interests"
          className="w-full max-w-sm rounded-xl border border-white/40 bg-white/60 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <textarea
          name="bio"
          value={formData?.bio}
          onChange={handleChange}
          placeholder="Enter your bio..."
          rows={4}
          className="w-full max-w-sm resize-y rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <FileInput file={file} setFile={setFile} />

        <button
          className="max-w-sm cursor-pointer rounded-xl bg-black px-4 py-2 text-xl text-white hover:bg-neutral-700"
          type="submit"
        >
          Save
        </button>
        <button
          onClick={() => setEdit(false)}
          className="max-w-sm cursor-pointer rounded-xl border border-black px-4 py-2 text-xl text-black hover:bg-neutral-200"
        >
          cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
