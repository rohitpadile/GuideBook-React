import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HelpdeskCss.css';

const HelpdeskComponent = () => {
  return (
    <div className="helpdesk-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="helpdesk-card card p-4">
            <h1 className="helpdesk-card-title card-title text-center mb-4">Helpdesk</h1>
            <h4 className="helpdesk-card-subtitle card-title text-center mb-4">Need Assistance?</h4>
            <p className="helpdesk-info text-center">
              Send an email to <a href="mailto:helpguidebookx@gmail.com">helpguidebookx@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskComponent;
