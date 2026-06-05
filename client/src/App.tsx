import './App.css';
import Login from './components/login/Login';
import SideBar from './components/sidebar/SideBar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import Home from './components/home/Home';
import MyProfile from './components/myProfile/MyProfile';
import Search from './components/search/Search';
import UserProfile from './components/userProfile/UserProfile';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSocket } from './app/features/authSlice';
import { socket } from './utils/socket';
import Size from './UI/Size';
import Messages from './components/message/Messages';
function AppRouts() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConnect = () => {
      dispatch(setSocket(socket.id));
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [dispatch]);
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/message/t/:id" element={<Messages />} />
      <Route path="/message" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/me" element={<MyProfile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/notifications" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-380">
        <div className="flex h-screen w-full flex-col-reverse gap-2 p-4 lg:flex-row lg:gap-4">
          <div className="h-16 lg:h-full lg:w-70 xl:w-80">
            <SideBar />
          </div>
          <div className="flex min-h-0 flex-1 gap-2 md:gap-4">
            <AppRouts />
          </div>
          <Size />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
