import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/OtherPageCss.css';
const Footer = () => {
  return (
    <footer className="footer footer-shaded mt-auto py-3">
      <div className="container d-flex justify-content-between align-items-start">
        <div className="footer-left">
          <span className="text-muted">An Initiative by COEP Students</span>
        </div>
        <div className="footer-right">
          <Link to="/helpDesk" className="text-decoration-none footer-link mx-3">
            Helpdesk
          </Link>
          <Link to="/feedback" className="text-decoration-none footer-link footer-link">
            Feedback
          </Link>
          <Link to="/otherLinks" className="text-decoration-none footer-link mx-3">
            Other
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
