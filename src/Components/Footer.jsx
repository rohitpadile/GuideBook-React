import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  return (
    // <footer className="footer mt-auto py-3 bg-light">
    <footer className="footer mt-auto py-3">
      <div className="container d-flex justify-content-between align-items-start">
        <div className="footer-left">
          <span className="text-muted">Startup by COEP Students</span>
          <br />
          <Link to="/aboutUs" className="text-decoration-none about-link">
            About us
          </Link>
        </div>
        <div className="footer-right">
          <Link to="/termsAndConditions" className="text-decoration-none footer-link mx-3">
            Terms and Conditions
          </Link>
          
          <Link to="/helpDesk" className="text-decoration-none footer-link">
            HelpDesk
          </Link>
          <br/>
          <Link to="/feedback" className="text-decoration-none footer-link mx-3">
            Feedback
          </Link>
          
          <Link to="/subscription" className="text-decoration-none footer-link">
            Subscription Plans
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
