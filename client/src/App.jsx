import Login from "./components/login/login"
import Signup from "./components/signup/Signup"
import './App.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from "./components/errorPage/ErrorPage";
import AllUsers from "./components/userList/AllUsers"
import Navbar from "./components/navbar/Navbar";
import { useState, useMemo, useEffect } from "react";
import { io } from 'socket.io-client'
import Message from "./components/message/Message";
import { socketURL } from "../APIs/axiosInstance";

function App() {

  const [socketID, setSocketID] = useState();
  const [messages, setMessages] = useState([]);
  const socket = useMemo(() => io(socketURL, { withCredentials: true }), []);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("connected", socket.id);

    });

    socket.on("welcome", (s) => {
      console.log(s);
    })

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data])
      // console.log(data);
    })
  }, [socket])


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
    {
      path: "/message/:to",
      element: <><Navbar /><Message socket={socket} /></>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
