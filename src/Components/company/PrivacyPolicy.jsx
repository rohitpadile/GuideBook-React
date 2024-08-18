import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../../css/company/PrivacyPolicyCss.css'; // Import the CSS file for this component

const PrivacyPolicy = () => {
  return (
    <div className="policy-container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="policy-card card shadow-lg p-4">
            <h1 className="policy-card-title card-title policyName mb-4">Privacy Policy</h1>
            <div className="policy-card-body card-body">
              <p>
                This privacy policy sets out how GuidebookX uses and protects any information that you give GuidebookX when you visit their website and/or agree to purchase from them.
              </p>
              <p>
                GuidebookX is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
              </p>
              <p>
                GuidebookX may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.
              </p>
              <p><strong>We may collect the following information:</strong></p>
              <ul className="no-bullets">
                <li>Name</li>
                <li>Contact information including email address</li>
                <li>Demographic information such as postcode, preferences, and interests, if required</li>
                <li>Other information relevant to customer surveys and/or offers</li>
              </ul>

                <p><strong>What we do with the information we gather:</strong></p>
                <p>
                  We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                </p>
                <ul className="no-bullets">
                  <li>-Internal record keeping.</li>
                  <br/>
                  <li>We may use the information to improve our products and services.</li>
                  <li>
                    We may periodically send promotional emails about new products, special offers, or other information which we think you may find interesting using the email address you have provided.
                  </li>
                  <li>
                    From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax, or mail. We may use the information to customize the website according to your interests.
                  </li>
                </ul>

                <p>
                  We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in suitable measures.
                </p>
                
  <p><strong>How we use cookies:</strong></p>
  <p>
    A cookie is a small file that asks permission to be placed on your computer's hard drive. Once you agree, the file is added, and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes, and dislikes by gathering and remembering information about your preferences.
  </p>
  <p>
    We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes, and then the data is removed from the system.
  </p>
  <p>
    Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
  </p>
  <p>
    You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
  </p>
  <p><strong>Controlling your personal information</strong></p>
  <p>
    You may choose to restrict the collection or use of your personal information in the following ways:
  </p>
  <ul className='no-bullets'>
    <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes.</li>
    <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at.</li>
  </ul>
  <p>
    We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties, which we think you may find interesting, if you tell us that you wish this to happen.
  </p>
  <p>
    If you believe that any information we are holding on you is incorrect or incomplete, please write to COEP Hostel, Shivajinagar, Pune, Maharashtra Pune MAHARASHTRA 411005, or contact us as soon as possible. We will promptly correct any information found to be incorrect.
  </p>
  {/* <p className="text-muted">
    <strong>Disclaimer:</strong> The above content is created at ROHIT AMOL PADILE's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to the merchant’s non-adherence to it.
  </p> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
