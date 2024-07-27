import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const TermsAndConditions = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4">
            <h1 className="card-title text-center mb-4">Terms and Conditions</h1>
            <div className="card-body">
              <h3>Introduction</h3>
              <p>
                Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
              <h3>Intellectual Property Rights</h3>
              <p>
                Other than the content you own, under these Terms, we own all rights to the intellectual property and materials contained in this Website.
              </p>
              <h3>Restrictions</h3>
              <p>
                You are specifically restricted from all of the following: publishing any Website material in any other media, selling, sublicensing and/or otherwise commercializing any Website material, using this Website in any way that is or may be damaging to this Website.
              </p>
              <h3>Your Content</h3>
              <p>
                In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website.
              </p>
              <h3>Limitation of Liability</h3>
              <p>
                In no event shall we, nor any of our officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
              </p>
              <h3>Governing Law & Jurisdiction</h3>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of the state/country in which our company is located, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that state/country for the resolution of any disputes.
              </p>
              <p>
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
