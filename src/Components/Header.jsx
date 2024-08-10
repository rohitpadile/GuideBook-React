import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HeaderCss.css';
import auth from '../auth';

const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/v1/user/check-login', { credentials: 'include' });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the backend to handle any server-side logout logic if needed
      await fetch('http://localhost:8080/api/v1/user/logout', { method: 'POST', credentials: 'include' });
      
      // Remove token and authorization header on the client side
      auth.removeToken();
      
      // Redirect to the home page or login page
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
    <>
      {/* Main Navbar */}
      <nav className="header-navbar navbar-expand-lg">
        <div className="container">
          <Link className="header-navbar-brand" to="/">
            <img src={`${BASE_URL}logo white.jpg`} alt="GuidebookX" className="header-logo" />
            <div className="header-logo-text">GuidebookX</div>
          </Link>
          <div className="header-links">
            {isLoggedIn ? (
              <div>
                <span className="header-link" onClick={() => navigate('/account')}>Account</span>
                <span className="header-link" onClick={handleLogout}>Logout</span>
              </div>
            ) : (
              <>
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/signup" className="header-link">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="secondary-navbar navbar-expand-lg">
        <div className="container">
          <ul className="secondary-navbar-nav navbar-nav mr-auto">
            <li className="secondary-navbar-nav-item nav-item" onClick={() => navigate('/entrance-exams')}>
              <span className="secondary-navbar-nav-link nav-link">Entrance Exams</span>
            </li>
            <li className="secondary-navbar-nav-item nav-item" onClick={() => navigate('/blogs')}>
              <span className="secondary-navbar-nav-link nav-link">Blogs</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
