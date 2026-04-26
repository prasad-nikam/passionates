import './App.css';
import Login from './components/login/Login';
import SideBar from './components/sidebar/SideBar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import Home from './components/home/Home';
import MyProfile from './components/myProfile/MyProfile';
import Search from './components/search/Search';
import UserProfile from './components/userProfile/UserProfile';

function AppRouts() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<div>msg</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/me" element={<MyProfile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:id" element={<UserProfile />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full flex-col-reverse gap-2 p-2 md:flex-row md:gap-4 md:p-4">
        <div className="h-16 md:h-full md:w-80">
          <SideBar />
        </div>
        <div className="fle flex flex-1 gap-2 bg-neutral-100 p-2 md:gap-4">
          <AppRouts />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
