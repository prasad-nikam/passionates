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
import UserProfile from "./components/UserProfile/UserProfile";

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


  const [rerender, setRerender] = useState(true)

  const handleClick = () => {
    setRerender(!rerender);
    console.log(rerender)
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar rerender={rerender} /><AllUsers /></>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <><Navbar rerender={rerender} /><Signup /></>,
    },
    {
      path: "/login",
      element: <><Navbar rerender={rerender} /><Login onClick={handleClick} /></>,
    },
    {
      path: "/message/:to",
      element: <><Navbar rerender={rerender} /><Message socket={socket} /></>,
    },
    {
      path: "/profile",
      element: <><Navbar rerender={rerender} /><UserProfile /> </>,
    },
    {
      path: "/profile:to",
      element: <><Navbar rerender={rerender} /><UserProfile /> </>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
