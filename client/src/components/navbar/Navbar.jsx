import React, { useState, useEffect } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import LoginData from '../loginData/LoginData'
import { NodeInstance } from '../../../APIs/axiosInstance';
import Invitations from '../invitations/Invitations'

const Navbar = ({ rerender }) => {

    const navigate = useNavigate()
    console.log(rerender)

    const [logBtn, setLogBtn] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NodeInstance.get('/isLoggedin', { withCredentials: true });
                if (response.status == 200) {
                    setLogBtn("Logout")
                } else {
                    setLogBtn("Login")
                }
            } catch (error) {
                setLogBtn("Login")
                console.log(error?.response?.data);
            }
        };

        fetchData();
        return () => { };
    }, [rerender]);

    const logHandleClick = async () => {
        if (logBtn == "Logout") {
            const responce = await NodeInstance.get('/logout', { withCredentials: true })
            setLogBtn("login")
            navigate("/login")

        } else {
            navigate("/login")
        }
    }

    return (
        <div className='main'>
            <div className="left">
                <h2>Passionates</h2>
            </div>
            <div className="right">
                <Link to="/search">
                    <Button variant="outlined">Search</Button>
                </Link>
                <Link to="/">
                    <Button variant="outlined">Home</Button>
                </Link>

                <Link to="/signup">
                    <Button variant="outlined">signup</Button>
                </Link>

                <Link onClick={logHandleClick}>
                    <Button variant="outlined">{logBtn}</Button>
                </Link>
                <Invitations/>

                <LoginData rerender={rerender} />

            </div>
        </div>
    )
}

export default Navbar