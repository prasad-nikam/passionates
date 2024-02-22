import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const Navbar = () => {
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

            </div>
        </div>
    )
}

export default Navbar