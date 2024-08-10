import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/HeaderCss.css'; // Updated CSS file path

const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleAboutUs = () => {
    navigate('/aboutUs');
  };

  const handleExamClick = () => {
    navigate('/entrance-exams');
  };

  const handleBlogClick = () => {
    navigate('/blogs');
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
            {/* <span className="header-link" onClick={handleAboutUs}>About Us</span> */}
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Signup</Link>
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className="secondary-navbar navbar-expand-lg">
        <div className="container">
          <ul className="secondary-navbar-nav navbar-nav mr-auto">
            <li
              className="secondary-navbar-nav-item nav-item"
              onClick={handleExamClick}
            >
              <span className="secondary-navbar-nav-link nav-link">
                Entrance Exams
              </span>
            </li>
            <li
              className="secondary-navbar-nav-item nav-item"
              onClick={handleBlogClick}
            >
              <span className="secondary-navbar-nav-link nav-link">
                Blogs
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;