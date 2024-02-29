import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import User from './user/User';

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

    return (
        <div>
            <h1>People</h1>
            {users.map(user => (
                <li key={user._id} type="none">
                    <User user={user}/>
                </li>
            ))}
        </div>
    )
}

export default AllUsers