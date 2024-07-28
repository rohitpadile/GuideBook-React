import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SecondaryNavbar from './SecondaryNavbarComponent';
import '../css/HeaderCss.css'; // Updated CSS file path

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

  const handleDropdownMouseEnter = () => {
    clearTimeout();
  };

  const handleDropdownMouseLeave = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
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
            GuidebookX
          </Link>
          <div className="header-links">
            <span className="header-link" onClick={handleAboutUs}>About Us</span>
            {/* <span className="header-link" onClick={handleBlogClick}>Blogs</span> */}
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <SecondaryNavbar
        showDropdown={showDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleDropdownMouseEnter={handleDropdownMouseEnter}
        handleDropdownMouseLeave={handleDropdownMouseLeave}
      />
    </>
  );
};

export default Header;
