import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SecondaryNavbarComponentCss.css'; // Import your updated CSS file

const SecondaryNavbarComponent = ({ handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();

  const handleExamClick = () => {
    navigate('/entrance-exams');
  };
  const handleBlogClick = () => {
    navigate('/blogs');
  };

  return (
    <nav className="secondary-navbar-navbar navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="secondary-navbar-navbar-collapse collapse navbar-collapse">
          <ul className="secondary-navbar-navbar-nav navbar-nav mr-auto">
            <li
              className="secondary-navbar-nav-item nav-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleExamClick}
            >
              <span className="secondary-navbar-nav-link nav-link">
                Entrance Exams
              </span>
            </li>
            <li
              className="secondary-navbar-nav-item nav-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleBlogClick}
            >
              <span className="secondary-navbar-nav-link nav-link">
                Blogs
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavbarComponent;
