import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import auth from "../auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", {
        username: username,
        password: password,
      });

      auth.setToken(response.data); // Assuming the JWT is returned in the response body
      console.log(response.data);
      auth.setAuthHeader();
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
