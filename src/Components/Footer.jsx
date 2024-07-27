import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <span className="text-muted">Copyright © 2024, GuidebookX</span>
          <br />
          <span>Founded by COEP Student</span>
        </div>
        <div>
          <Link to="/termsAndConditions" className="text-decoration-none">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
