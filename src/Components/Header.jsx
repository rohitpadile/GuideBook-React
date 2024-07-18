import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SecondaryNavbar from './SecondaryNavbarComponent';
import '../App.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '50px' }}>
        <div className="container">
          <Link className="navbar-brand align-self-start font-weight-bold nav-link" to="/" style={{ fontSize: '30px', borderBottom: '2px solid transparent', padding: '10px' }}>
            GuideBookX
          </Link>
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
