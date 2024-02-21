import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate();


    return (
        <div className='main'>
            <Button variant="outlined"
                onClick={() => {
                    navigate('/login');
                }}
            >login</Button>
            <Button variant="outlined"
                onClick={() => {
                    navigate('/signup');
                }}
            >signup</Button>

            <Button
                variant="outlined"
                onClick={async() => {
                    const cookies = await axios.get('http://localhost:8080/getcookies',{withCredentials:true});

                    if (cookies) {
                        console.log(cookies);
                    } else {
                        console.log('Token cookie not found');
                    }
                }}
            >
                Log Cookies
            </Button>
        </div>
    )
}

export default Home