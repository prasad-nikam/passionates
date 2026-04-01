import React from 'react'
import { Button } from '@mui/material'
import './style.css'
import './style.css'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';


const User = (props) => {
    const navigate = useNavigate();
    const handleMsgClick = () => {
        navigate(`/message/${props?.user?.email}`, { state: { data: props?.user } })
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: "5rem",
                width: "5rem",
                fontSize: "3rem",
                cursor: "pointer",
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <div className='userBox'>

            <Avatar onClick={handleClick} {...stringAvatar(`${props?.user?.firstname.toUpperCase()} ${props?.user?.lastname.toUpperCase()}`)} />


            <div className="details" onClick={handleClick} >
                <p id='name'>Name: {props?.user.firstname} {props?.user.lastname}</p>
                <p id='email'>Email: {props?.user.email}</p>

                <ul style={{ listStyleType: "none", padding: "0px" }} > Interests : {
                    props?.user?.interests.map((item, index) => (
                        <li key={index} style={{ float: "right" }}>{item} , </li>
                    ))}

                </ul>
            </div>
            <Button variant='outlined' size='small' className='msg' onClick={handleMsgClick} >message</Button>
        </div>
    )
}

export default User