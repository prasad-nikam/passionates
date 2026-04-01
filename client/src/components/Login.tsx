import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NodeInstance } from "../APIs/axiosInstance";

const Login = (props: { onClick: () => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await NodeInstance.post("/auth/login", formData, {
        withCredentials: true,
      });
      if (response) {
        props.onClick();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      Don't have acoount? <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Login;
