import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../css/TermsAndConditionsCss.css'; // Import the CSS file for this component

const TermsAndConditions = () => {
  return (
    <div className="terms-container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="terms-card card p-4">
            <h1 className="terms-card-title card-title text-center mb-3">Terms and Conditions</h1>
            <div className="terms-card-body card-body">
              <h3 className="terms-heading">Introduction</h3>
              <p className="terms-paragraph">
                Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
              <h3 className="terms-heading">Intellectual Property Rights</h3>
              <p className="terms-paragraph">
                Other than the content you own, under these Terms, we own all rights to the intellectual property and materials contained in this Website.
              </p>
              <h3 className="terms-heading">Restrictions</h3>
              <p className="terms-paragraph">
                You are specifically restricted from all of the following: publishing any Website material in any other media, selling, sublicensing and/or otherwise commercializing any Website material, using this Website in any way that is or may be damaging to this Website.
              </p>
              <h3 className="terms-heading">Your Content</h3>
              <p className="terms-paragraph">
                In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website.
              </p>
              <h3 className="terms-heading">Limitation of Liability</h3>
              <p className="terms-paragraph">
                In no event shall we, nor any of our officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
              </p>
              <h3 className="terms-heading">Governing Law & Jurisdiction</h3>
              <p className="terms-paragraph">
                These Terms will be governed by and interpreted in accordance with the laws of the state/country in which our company is located, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that state/country for the resolution of any disputes.
              </p>
              <p className="terms-paragraph">
                If you have any questions about these Terms, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
