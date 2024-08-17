import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ZoomSessionFormSuccessCss.css'; // Import the new CSS file

const ZoomSessionFormSuccess = () => {
  const location = useLocation();
  const student = location.state?.student || {};

  return (
    <div className="zoom-session-success-container">
      <div className="zoom-session-success-card">
        <div className="zoom-session-success-card-body">
          <h1 className="zoom-session-success-card-title">
            🎉 Congratulations on coming this far! 🎉
          </h1>
          <p className="zoom-session-success-card-text">
            We will right away contact {student.studentName} for availability and scheduling the session.</p>
          <p className="zoom-session-success-card-text">
            You will be notified about the session details via the provided email.
          </p>
          <div className="celebration-gif-container">
            {/* <img src="/celebration.gif" alt="Celebration" className="celebration-gif" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomSessionFormSuccess;
