import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryNavbarComponent from './SecondaryNavbarComponent';
import '../css/HeaderCss.css'; // Updated CSS file path

const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
    clearTimeout();
  };

  const handleAboutUs = () => {
    navigate('/aboutUs');
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="header-navbar navbar-expand-lg">
        <div className="container">
          <Link className="header-navbar-brand" to="/">
            <img src={`${BASE_URL}logo white.jpg`} alt="GuidebookX" className="header-logo" />
            <div className='header-logo'>GuidebookX</div>
          </Link>
          {/* <div className="header-links">
            <span className="header-link" onClick={handleAboutUs}>About Us</span>
          </div> */}
          
        </div>
      </nav>

      {/* Secondary Navbar */}
      <SecondaryNavbarComponent
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default Header;
