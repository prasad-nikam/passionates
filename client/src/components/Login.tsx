import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NodeInstance } from '../APIs/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/features/authSlice';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await NodeInstance.post('/auth/login', formData, {
        withCredentials: true,
      });
      if (response) {
        console.log(response);
        dispatch(setUser(response.data.user));

        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full justify-center pt-20">
      <div className="flex h-fit w-sm flex-col items-center justify-center gap-2 rounded-2xl bg-blue-200 p-4">
        <h2 className="pt-4 text-2xl">Login</h2>
        <div className="h-0 w-full border-t border-neutral-400 pb-2"></div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
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

          <button
            className="w-full cursor-pointer rounded-xl bg-black px-4 py-2 text-xl text-white hover:bg-neutral-800"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="pb-2 text-neutral-600">
          Don't have acoount?{' '}
          <Link className="font-semibold text-blue-500" to="/signup">
            Signup
          </Link>
        </div>
        {/* <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="peer w-full rounded-xl border border-gray-300 px-4 pt-5 pb-2 text-sm focus:ring-2 focus:ring-lime-500 focus:outline-n6ne"
            placeholder=" "
          />
          <label className="absolute top-2 left-4 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-lime-500">
            Username
          </label>
        </div> */}
      </div>
    </div>
  );
};
export default Login;
