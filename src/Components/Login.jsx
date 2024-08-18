import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../Services/userAccountApiService";
import auth from "../auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/LoginCss.css"; // Import the CSS file
import Swal from "sweetalert2";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/home"); // Default redirect to /home
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get location state

  useEffect(() => {
    // Destructure the object passed through location.state
    const { redirectUrl: passedUrl } = location.state || {}; // Get redirectUrl from the object passed
    if (passedUrl) {
      setRedirectUrl(passedUrl); // Set the redirectUrl if it's passed
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      auth.setToken(response.data);
      auth.setAuthHeader();
      Swal.fire('Success', 'Login successful! Redirecting...', 'success');
      setTimeout(() => {
        if(redirectUrl){
          navigate(redirectUrl); // Redirect to the URL set in state
        } else {
          navigate("/home");
        }
        
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("There was an error logging in!", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Login
          </button>
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-link" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
