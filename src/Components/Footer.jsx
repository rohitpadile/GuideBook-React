import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <span className="text-muted">Copyright © 2024, GuidebookX</span>
          <br />
          {/* <span>Founded by COEP Student</span> */}
        </div>
        <div className="small-links">
          <Link to="/termsAndConditions" className="text-decoration-none">
            Terms and Conditions
          </Link>
          <Link to="/helpDesk" className="text-decoration-none mx-3">
            HelpDesk
          </Link>
          <Link to="/feedback" className="text-decoration-none">
            Feedback
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
