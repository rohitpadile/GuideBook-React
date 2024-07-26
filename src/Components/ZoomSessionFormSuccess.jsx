import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ZoomSessionFormSuccessCss.css'; // Import the new CSS file

const ZoomSessionFormSuccess = () => {
  const location = useLocation();
  const student = location.state?.student || {};

  return (
    <div className="zoom-session-success-container">
      <div className="card zoom-session-success-card">
        <div className="card-body zoom-session-success-card-body">
          <h1 className="card-title zoom-session-success-card-title">
            🎉 Congratulations on coming this far! 🎉
          </h1>
          <p className="card-text zoom-session-success-card-text">
            We will right away contact {student.studentName} for availability and scheduling the session. Hold tight!
          </p>
          <p className="card-text zoom-session-success-card-text">
            You will be notified about the session details via given email. Keep an eye on it.
          </p>
          {/* <div className="celebration-gif-container">
            <img src="/celebration.gif" alt="Celebration" className="celebration-gif" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ZoomSessionFormSuccess;
