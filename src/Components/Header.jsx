import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkLoginStatus, logoutUser } from '../Services/userAccountApiService';
import '../css/HeaderCss.css';
import auth from '../auth';

const Header = () => {
  const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const token = auth.getToken();
        if (token) {
          const isLoggedInStatus = await checkLoginStatus(token);
          setIsLoggedIn(isLoggedInStatus);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    fetchLoginStatus();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const token = auth.getToken();
      await logoutUser(token);
      auth.removeToken(); // Remove token and header
      setIsLoggedIn(false); // Update the state immediately after logout
      navigate('/');
      window.location.reload();
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
                <span className="header-link" onClick={() => navigate('/profile')}>Profile</span>
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
            {/* <li className="secondary-navbar-nav-item nav-item"> */}
              <Link to="/colleges" className="secondary-navbar-nav-link nav-link">Search Guide</Link>
            {/* </li> */}
            {/* <li className="secondary-navbar-nav-item nav-item"> */}
              <Link to="/discussions" className="secondary-navbar-nav-link nav-link">Discussions</Link>
            {/* </li> */}
            {/* <li className="secondary-navbar-nav-item nav-item">
              <Link to="/blogs" className="secondary-navbar-nav-link nav-link">Blogs</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
