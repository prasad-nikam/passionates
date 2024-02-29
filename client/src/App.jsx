import Login from "./components/login/login"
import Signup from "./components/signup/Signup"
import './App.css'
import { createBrowserRouter, Router, RouterProvider, Routes, } from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";
import AllUsers from "./components/userList/AllUsers"
import Navbar from "./components/navbar/Navbar";


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><AllUsers /></>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <><Navbar /><Signup /></>,
  },
  {
    path: "/login",
    element: <><Navbar /><Login /></>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
