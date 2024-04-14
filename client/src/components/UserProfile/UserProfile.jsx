import React, { useState, useEffect } from 'react'
import { NodeInstance } from '../../../APIs/axiosInstance';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material'



import './style.css'
const UserProfile = () => {

    const [user, setUser] = useState();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NodeInstance.get('/isLoggedin', { withCredentials: true });
                setUser(response?.data);
                console.log(response.data)
            } catch (error) {
                console.log(error?.response?.data);
            }
        };

        fetchData();
        return () => { };
    }, [edit]);

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
                height: "7rem",
                width: "7rem",
                fontSize: "3rem"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const [formData, setFormData] = useState({
        interests: [],
        bio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await NodeInstance.put("/updateprofile", formData, { withCredentials: true });
            console.log(response);
            setEdit(false)
        } catch (err) {
            console(err)
        }
    }


    return (
        <>
            <div className='profile-main'>
                <div className="pfp">
                    <Avatar {...stringAvatar(`${user?.firstname} ${user?.lastname}`)} />

                </div>
                <form onSubmit={handleSubmit} >

                    <div className="info">
                        <p> User Name : {user?.firstname} {user?.lastname} <br /></p>
                        <p>Email : {user?.email} <br /></p>
                        {!edit && <>
                            <p>User Bio : {user?.bio} <br /></p>
                            <p>Interests : {user?.interests.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))} <br /></p>
                        </>
                        }

                        {edit &&
                            <>
                                <div className='bio' >
                                    <label htmlFor="bio"> User Bio: </label>
                                    <textarea type="text" name="bio" onChange={handleChange} rows="6" cols="20" /> <br />
                                </div>

                                <div>
                                    <label htmlFor="interests">Interests: </label>
                                    <input type="text" name="interests" onChange={handleChange} /> <br />
                                    <i style={{ fontSize: "18px", color: "gray" }} >type comma separatd words in interests </i>
                                </div>

                                <button type="submit">

                                    <Button

                                        variant="contained" color="success"
                                        sx={{ margin: "10px" }}
                                        size='large'
                                        onClick={() => { setEdit(!edit) }}
                                    >
                                        Apply Changes

                                    </Button>
                                </button>

                            </>
                        }
                    </div>

                </form>

            </div>

            <Button
                sx={{ margin: "10px" }}
                size='small'
                variant='outlined'
                onClick={() => { setEdit(!edit) }}
            >
                {edit ? "Cancel" : "Edit Profile"}

            </Button>
        </>
    )
}

export default UserProfile