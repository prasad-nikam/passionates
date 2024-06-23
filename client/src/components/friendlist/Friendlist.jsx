import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NodeInstance } from '../../../APIs/axiosInstance';
import User from '../userList/user/User';

const Friendlist = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {

            try {
                const responce = await NodeInstance.get("/getfriends", { withCredentials: true });
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
            <center>

                <div
                    className="userList"
                >
                    <h2>Friends</h2>
                    {users.map(user => (
                        <li key={user._id} type="none">
                            <User user={user} />
                        </li>
                    ))}
                </div>
            </center>
        </div>
    )
}

export default Friendlist