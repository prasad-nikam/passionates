import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './style.css'
import { NodeInstance } from '../../../APIs/axiosInstance'
import MsgBox from './msgBox/MsgBox'
const Message = ({ socket }) => {
    const location = useLocation();
    const user = location?.state?.data;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useMemo(async () => {
        try {
            const response = await NodeInstance.post(
                '/getMessages',
                { reciever: user?.email },
                { withCredentials: true }
            );

            console.log("requested")

            response.data.forEach(element => {

                setMessages((messages) => [...messages, { message: element.content, from: (element.sender !== user.email) ? "you" : element.sender }])

            });
        } catch (error) {
            console.log(error?.response?.data);
        }
    }, []);

    useEffect(() => {

        socket.on("receive-message", (data) => {
            console.log(data)
            if (data?.from == user.email) {
                setMessages((messages) => [...messages, data])
            }
        })
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== "") {
            socket.emit("message", { message, user });
            setMessages((messages) => [...messages, { message: message, from: "you" }])
            setMessage("")
        }
    }

    return (

        <div id='main'>

            <h3>{user.email}</h3><br />

            <MsgBox messages={messages} />


            <form onSubmit={handleSubmit}>

                <label htmlFor="msg">Message : </label>

                <input type="text" name='msg' value={message} onChange={(e) => {
                    setMessage(e.target.value);
                }} />

                <button type="submit">Send</button>

            </form>

        </div>
    )
}

export default Message