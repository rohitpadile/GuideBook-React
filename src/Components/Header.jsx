import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ minWidth: '800px', height: '60px' }}>
      <div className="container">
        <Link className="navbar-brand align-self-start font-weight-bold nav-link" to="/" style={{ fontSize: '20px', borderBottom: '2px solid transparent', padding: '10px' }}>
          GuideBook
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto align-items-center">
            <li
              className="nav-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleMouseEnter}
            >
              <Link className="nav-link" to="/entrance-exams" style={{ borderBottom: '2px solid transparent', padding: '10px' }}>
                Entrance Exams
              </Link>
              {showDropdown && (
                <div
                  className="dropdown-menu show"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <Link className="dropdown-item" to="/entrance-exam-1">Exam 1</Link>
                  <Link className="dropdown-item" to="/entrance-exam-2">Exam 2</Link>
                  <Link className="dropdown-item" to="/entrance-exam-3">Exam 3</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
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
  );
};

export default Header;
