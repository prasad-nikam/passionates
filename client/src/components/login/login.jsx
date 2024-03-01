// Login.js
import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
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
		try {
			const response = await axios.post('http://localhost:8080/login', formData, { withCredentials: true });
			if (response) {
				window.open('/')
			}
		} catch (error) {
			alert(`${error.response?.status}: ${error.response?.data}`)
			// console.log('Error signing up:', error);
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="email"
					required
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
			</form>
			Don't have acoount? <Link to='/signup'>Signup</Link>
		</div>
	);
};

export default Login;
