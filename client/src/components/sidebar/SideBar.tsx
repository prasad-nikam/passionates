import CreatePost from './CreatePost';
import MyProfile from './MyProfile';
import NavBar from './NavBar';

const SideBar = () => {
  return (
    <div className="flex size-full flex-row-reverse items-center lg:flex-col">
      {/* <MyProfile /> */}
      <NavBar />
      {/* <CreatePost className="my-auto" /> */}
    </div>
  );
};

export default SideBar;
