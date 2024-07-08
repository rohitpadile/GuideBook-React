import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authUtility from '../Services/authUtility'; // Import your authentication utility

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace with your authentication logic using authUtility or API service
      const loginData = { email, password };
      const response = await authUtility.login(loginData);

      // Handle successful login (redirect or set logged-in state)
      console.log('Login successful:', response);
    } catch (error) {
      setError('Invalid credentials. Please try again.'); // Handle error from backend
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </div>
              </form>
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
