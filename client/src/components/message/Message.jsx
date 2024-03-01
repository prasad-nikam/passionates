import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Message = ({ socket }) => {
    const location = useLocation();

    const [messages, setMessages] = useState([]);
    const [from, setFrom] = useState();

    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const user = location?.state?.data;
    console.log(user)
    console.log(socket.id)

    useEffect(() => {

        socket.on("welcome", (s) => {
            console.log(s);
        })

        socket.on("receive-message", (data) => {
            if (data?.from == user.email) {
                setMessages((messages) => [...messages, data?.message])
                setFrom(data?.from)
                console.log(data);
            }
        })
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", { message, user });
        console.log(from)
        //setMessages((messages) => [...messages, message])

        setMessage("")
    }

    return (

        <div id='main'>

            <form onSubmit={handleSubmit}>
                <h3>{user.email}</h3><br />
                <label htmlFor="msg">Message : </label>
                <input type="text" name='msg' value={message} onChange={(e) => {
                    setMessage(e.target.value);
                }} /><br /><br />

                <label htmlFor="to">send to : </label>
                <input type="text" name='to' value={room} onChange={(e) => {
                    setRoom(e.target.value);
                }} /><br /><br />

                <button type="submit">Send</button>
            </form>
            <div className="msgs">
                {
                    messages.map((m, i) => (
                        <li key={i}>{from}: {m}</li>
                    ))
                }
            </div>

        </div>
    )
}

export default Message