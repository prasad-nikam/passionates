import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
// import { Link } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { NodeInstance } from '../../../APIs/axiosInstance';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await NodeInstance.post('/signup', formData);
      console.log('result :', response.data);
      navigate('/')
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container"> {/* Add the class to style the container */}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname"> firstname</label><br />
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <label htmlFor="lastname"> lastname</label><br />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <label htmlFor="email"> Email</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label htmlFor="password"> password</label><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <label htmlFor="confermPassword"> Conferm Password</label><br />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      have account already? <Link to='/login'>Login</Link>
    </div>
  );
};

export default Signup;
