import Login from "./components/login/login"
import Signup from "./components/signup/Signup"
import './App.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";
import Home from "./components/home/Home";
import AllUsers from "./components/userList/AllUsers"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllUsers/>,
    errorElement : <ErrorPage/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {

  return (
    <>
      <div className="main">
      <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
