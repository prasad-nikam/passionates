import React from 'react'
import { Button } from '@mui/material'
import './style.css'
import './style.css'

const User = (props) => {
    return (
        <div className='userBox'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpM5Flyq4TAaYlz0F8VcmAqavG9YH9iwhCbg&usqp=CAU" alt="Avatar" />
            <div className="details">
                <p id='name'>Name: {props?.user.firstname} {props?.user.lastname}</p>
                <p id='email'>Email: {props?.user.email}</p>

                <p>Interests:</p>
            </div>
            <Button variant='outlined' size='small' className='connect'>connect</Button>
        </div>
    )
}

export default User