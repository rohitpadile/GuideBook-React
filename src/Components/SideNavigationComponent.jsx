import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SideNavigationComponentCss.css'; // Import the CSS file for side navigation

const SideNavComponent = () => {
  return (
    <nav className="side-nav">
      <ul className="side-nav-list">
        <li className="side-nav-item">
          <Link to="/entrance-exams" className="side-nav-link">Entrance Exams</Link>
        </li>
        <li className="side-nav-item">
          <Link to="/blogs" className="side-nav-link">Blogs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavComponent;
