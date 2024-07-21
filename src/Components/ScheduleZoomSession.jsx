import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../css/ScheduleZoomSessionCss.css'; // Updated path if needed
import CryptoJS from 'crypto-js';

const decryptFormId = (encryptedFormId) => {
  const bytes = CryptoJS.AES.decrypt(encryptedFormId, '1234567890123456');
  const originalFormId = bytes.toString(CryptoJS.enc.Utf8);
  return originalFormId;
};

const ScheduleZoomSession = () => {
  const { encryptedFormId } = useParams();
  const formId = decryptFormId(encryptedFormId);

  const [availability, setAvailability] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handlePreferredTimeChange = (e) => {
    setPreferredTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setMessage('Your availability has been submitted. Thank you!');
  };

  return (
    <div className="container mt-5">
      <div className="card schedule-zoom-session-card">
        <div className="card-body">
          <h1 className="schedule-zoom-session-card-title text-center">Schedule Your Zoom Session</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group schedule-zoom-session-form-group">
              <label htmlFor="availability">Are you available?</label>
              <select 
                id="availability" 
                className="form-control" 
                value={availability} 
                onChange={handleAvailabilityChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {availability === 'yes' && (
              <div className="form-group schedule-zoom-session-form-group">
                <label htmlFor="preferredTime">Preferred Time for Session</label>
                <input 
                  type="datetime-local" 
                  id="preferredTime" 
                  className="form-control" 
                  value={preferredTime} 
                  onChange={handlePreferredTimeChange}
                  required 
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary schedule-zoom-session-btn">Submit</button>
          </form>
          {message && <div className="alert alert-success schedule-zoom-session-alert">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ScheduleZoomSession;
