import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import './style.css'
import { NodeInstance } from '../../../APIs/axiosInstance';
import { useNavigate } from 'react-router-dom';

const LoginData = (rerender) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NodeInstance.get('/isLoggedin', { withCredentials: true });
                setUser(response?.data);
            } catch (error) {
                console.log(error?.response?.data);
            }
        };

        fetchData();
        return () => { };
    }, [rerender]);

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
                height: "1.5rem",
                width: "1.5rem",
                fontSize: "0.7rem"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <div onClick={() => { navigate("/profile") }} className='logindata'>


            <Avatar {...stringAvatar(`${user?.firstname.toUpperCase()} ${user?.lastname.toUpperCase()}`)} />

            {`${user?.firstname} ${user?.lastname}`}


        </div>
    )
}

export default LoginData