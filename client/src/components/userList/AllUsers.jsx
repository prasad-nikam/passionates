import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Button } from '@mui/material';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {

            try {
                const responce = await axios.get("http://localhost:8080/", { withCredentials: true });
                setUsers(responce?.data);
                // console.log(responce);
            } catch (error) {
                navigate('/login');
                // alert(`${error.response?.status}: ${error.response?.data}`)
            }
        }
        fetchData();
    }, [])

    console.log(users)

    return (
        <div>
            <h1>People</h1>
            {users.map(user => (
                <li key={user._id} type="none">
                    <div className='userBox'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpM5Flyq4TAaYlz0F8VcmAqavG9YH9iwhCbg&usqp=CAU" alt="Avatar"/>
                        <div className="details">
                            <p id='name'>Name: {user.firstname} {user.lastname}</p>
                            <p id='email'>Email: {user.email}</p>

                            <p>Interests: {user.interests.join(', ')}</p>
                        </div>
                        <Button variant='outlined' size='small' className='connect'>connect</Button>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default AllUsers