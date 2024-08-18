import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  return (
    <footer className="footer footer-shaded mt-auto py-3">
      <div className="container d-flex justify-content-between align-items-start">
        <div className="footer-left">
          <span className="text-muted">An Initiative by COEP Students</span>
          <br />
          <Link to="/aboutUs" className="text-decoration-none about-link">
            About us
          </Link>
        </div>
        <div className="footer-right ">
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
          <br/>
          <Link to="/privacyPolicy" className="text-decoration-none footer-link mx-3">
            Privacy Policy
          </Link>
          <Link to="/cancellationRefundPolicy" className="text-decoration-none footer-link">
            Cancellation/Refund Policy
          </Link>
          <br />
          <Link to="/shippingAndDeliveryPolicy" className="text-decoration-none footer-link mx-3">
            Shipping and Delivery
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
