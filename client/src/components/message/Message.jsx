import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './style.css'
import { NodeInstance } from '../../../APIs/axiosInstance'
import MsgBox from './msgBox/MsgBox'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


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



            response.data.forEach(element => {

                setMessages((messages) => [...messages,
                {
                    message: element?.content,
                    from: (element.sender !== user.email) ? "you" : element.sender,
                    time: element?.time
                }
                ])

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
            setMessages((messages) => [...messages,
            {
                message: message,
                from: "you",
                time: Date.now()
            }
            ])
            setMessage("")
        }
    }

    return (

        <div id='main' style={{ border: "1px solid black", padding: "15px" }} >

            <h3>{user?.firstname} {user?.lastname} </h3>

            <MsgBox messages={messages} user={user} />


            <form onSubmit={handleSubmit}>

                <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    fullWidth
                    sx={{ m: 1, width: '90%' }}
                    maxRows={16}
                    name='msg'
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />

                <div className='sendbtn'>
                    <Button
                    type='submit'
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{ margin: "5px", height: "60px" }}
                    >
                        Send
                    </Button>
                </div>

            </form>

        </div>
    )
}

export default Message