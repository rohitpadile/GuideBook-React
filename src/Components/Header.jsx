import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SecondaryNavbar from './SecondaryNavbarComponent';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding dropdown to allow moving into the dropdown
    setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust delay as needed

    // Clear any existing timeout
    clearTimeout();
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(); // Clear any existing timeout to prevent premature hiding
  };

  const handleDropdownMouseLeave = () => {
    // Delay hiding dropdown to allow moving out of the dropdown
    setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust delay as needed
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '50px' }}>
        <div className="container">
          <Link className="navbar-brand align-self-start font-weight-bold nav-link" to="/" style={{ fontSize: '20px', borderBottom: '2px solid transparent', padding: '10px' }}>
            GuideBook
          </Link>
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ fontSize: '16px', borderBottom: '2px solid transparent', padding: '10px' }}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" style={{ fontSize: '16px', borderBottom: '2px solid transparent', padding: '10px' }}>
                Signup
              </Link>
            </li>
          </ul>
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
