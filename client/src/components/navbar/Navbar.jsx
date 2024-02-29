import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import LoginData from '../loginData/LoginData'
const Navbar = (props) => {

    const [shouldRenderLoginData, setShouldRenderLoginData] = useState(false);

    const toggleLoginData = () => {
        setShouldRenderLoginData(prevState => !prevState);
    };

    console.log(props);
    return (
        <div className='main'>
            <div className="left">
                <h2>Passionates</h2>
            </div>
            <div className="right">
                <Link to="/">
                    <Button variant="outlined">Home</Button>
                </Link>

                <Link to="/signup">
                    <Button variant="outlined">signup</Button>
                </Link>


                <Link to="/login">
                    <Button variant="outlined">login</Button>
                </Link>
                <LoginData shouldRender={shouldRenderLoginData} />

            </div>
        </div>
    )
}

export default Navbar