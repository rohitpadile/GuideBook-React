import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
 // Ensure this CSS file exists for styling

const OtherFooterLinks = () => {
  return (
    <div className="otherPage-container">
      <h1 className="otherPage-title">Other Links</h1>
      <ul className="otherPage-list">
        <li className="otherPage-listItem">
          <Link to="/subscription" className="otherPage-link">
            Subscription Plans
          </Link>
        </li>
        <li className="otherPage-listItem">
          <Link to="/privacyPolicy" className="otherPage-link">
            Privacy Policy
          </Link>
        </li>
        <li className="otherPage-listItem">
          <Link to="/cancellationRefundPolicy" className="otherPage-link">
            Cancellation/Refund Policy
          </Link>
        </li>
        <li className="otherPage-listItem">
          <Link to="/shippingAndDeliveryPolicy" className="otherPage-link">
            Shipping and Delivery
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OtherFooterLinks;
