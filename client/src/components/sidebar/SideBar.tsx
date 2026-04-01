import CreatePost from "./CreatePost";
import MyProfile from "./MyProfile";
import NavBar from "./NavBar";

const SideBar = () => {
  return (
    <div className="flex size-full flex-col items-center justify-between">
      <MyProfile />
      <NavBar />
      <CreatePost className="my-auto" />
    </div>
  );
};

export default SideBar;
