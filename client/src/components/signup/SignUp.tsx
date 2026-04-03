import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { NodeInstance } from '../../APIs/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/features/authSlice';
import FileInput from '../../UI/FileInput';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.password != formData.confirmPassword) {
        alert('Comferm Password did not matched to password');
        return;
      } else {
        const response = await NodeInstance.post('/auth/signup', formData, {
          withCredentials: true,
        });
        if (response.status == 201) {
          dispatch(setUser(response.data.user));
          navigate('/');
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError?.response?.data as { message?: string };
      console.log(errorData?.message);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex h-full w-full justify-center pt-20">
      <div className="flex h-fit w-sm flex-col items-center justify-center gap-2 rounded-2xl bg-blue-100 p-4">
        <h2 className="pt-4 text-2xl">Signup</h2>
        <div className="h-0 w-full border-t border-neutral-300 pb-2"></div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            type="text"
            name="firstname"
            value={formData?.firstname}
            onChange={handleChange}
            placeholder="Firstname"
            required
            className="w-full max-w-sm rounded-xl border border-white/40 bg-white/40 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="lastname"
            value={formData?.lastname}
            onChange={handleChange}
            placeholder="Lastname"
            required
            className="w-full max-w-sm rounded-xl border border-white/40 bg-white/40 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full max-w-sm rounded-xl border border-white/40 bg-white/40 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="relative w-full max-w-sm">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-xl border border-white/40 bg-white/40 px-4 py-2 pr-10 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative w-full max-w-sm">
            <input
              type={show ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full rounded-xl border border-white/40 bg-white/40 px-4 py-2 pr-10 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <FileInput file={file} setFile={setFile} />

          {/* <input
            type="file"
            name="profilePic"
            value={file}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            placeholder="Profile Picture"
            className="w-full max-w-sm rounded-xl border border-white/40 bg-white/40 px-4 py-2 text-black placeholder-neutral-500 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          /> */}

          <button
            className="w-full cursor-pointer rounded-xl bg-black px-4 py-2 text-xl text-white hover:bg-neutral-800"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="pb-2 text-neutral-600">
          Already have an account?{' '}
          <Link className="font-semibold text-blue-500" to="/login">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
