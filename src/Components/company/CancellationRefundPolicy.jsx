import React from 'react';
import '../../css/company/CancellationRefundPolicyCss.css'; // Import the CSS file for styling
const CancellationRefundPolicy = () => {
  return (
    <div className="cancellation-refund-container">
      <h1 className="text-center mt-5">Cancellation and Refund Policy</h1>
      <div className="cancellation-refund-card">
        <p>
          GuidebookX believes in helping its customers as far as possible and has therefore a liberal cancellation policy. Under this policy:
        </p>
        <ul>
          <li>Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
          <li>GuidebookX does not accept cancellation requests for perishable items like flowers, eatables, etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
          <li>In case of receipt of damaged or defective items, please report the same to our Customer Service team within 7 days of receipt of the products. The request will be entertained once the merchant has checked and determined the same at their end.</li>
          <li>If the product received is not as shown on the site or as per your expectations, you must notify our customer service within 7 days of receiving the product. The Customer Service Team will take an appropriate decision after reviewing your complaint.</li>
          <li>For products with a warranty from manufacturers, please refer the issue directly to them.</li>
          <li>If any refunds are approved by GuidebookX, it will take 16-30 days for the refund to be processed to the end customer.</li>
        </ul>
        <p className="text-muted">
          <strong>Disclaimer:</strong> The above content is created at ROHIT AMOL PADILE's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to the merchant’s non-adherence to it.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
