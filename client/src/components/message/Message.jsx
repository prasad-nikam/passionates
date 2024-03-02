import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './style.css'

const Message = ({ socket }) => {
    const location = useLocation();

    const [messages, setMessages] = useState([]);
    const [sentmessages, setSentMessages] = useState([]);

    const [from, setFrom] = useState();

    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const user = location?.state?.data;
    // console.log(user)
    // console.log(socket.id)

    useEffect(() => {

        socket.on("welcome", (s) => {
            console.log(s);
        })

        socket.on("receive-message", (data) => {
            if (data?.from == user.email) {
                setMessages((messages) => [...messages, data?.message])
                setFrom(data?.firstname)
            }
        })
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", { message, user });
        console.log(from)
        // setSentMessages((sentmessages) => [...sentmessages, message])

        setMessage("")
    }

    return (

        <div id='main'>
            <h3>{user.email}</h3><br />

            <div className="msgs">
                {
                    messages.map((m, i) => (
                        <li key={i}>{from}: {m}</li>
                    ))
                }
            </div>
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