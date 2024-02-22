import Login from "./components/login/login"
import Signup from "./components/signup/Signup"
import './App.css'
import { createBrowserRouter, Router, RouterProvider, Routes, } from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";
import Home from "./components/home/Home";
import AllUsers from "./components/userList/AllUsers"
import Navbar from "./components/navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";

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

  useEffect(() => {
    const isLoggedin = async () => {
      try {
        const status = await axios.get("http://localhost:8080/isLoggedin", { withCredentials: true })
        console.log(status)
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
    isLoggedin();
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
