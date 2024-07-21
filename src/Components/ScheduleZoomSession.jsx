import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../css/ScheduleZoomSessionCss.css';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const decryptFormId = (encryptedFormId) => {
  const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Ensure the key is consistent
  const bytes = CryptoJS.AES.decrypt(encryptedFormId, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const originalFormId = bytes.toString(CryptoJS.enc.Utf8);
  return originalFormId;
};

const ScheduleZoomSession = () => {
  const { encryptedFormId } = useParams();
  const formId = decryptFormId(encryptedFormId);

  const [formDetails, setFormDetails] = useState(null);
  const [availability, setAvailability] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/fetchZoomSessionVerifiedFormDetailsSecret/${formId}`);
        setFormDetails(response.data);
        if (response.data.isVerified !== 1) {
          setMessage('The form is not verified. Please discard scheduling the session. If scheduled even after warning, your account will be removed and blocked from the platform.');
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };
    fetchFormDetails();
  }, [formId]);

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handlePreferredTimeChange = (e) => {
    setPreferredTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Your availability has been submitted. Thank you!');
  };

  return (
    <div className="container mt-5">
      <div className="card schedule-zoom-session-card">
        <div className="card-body">
          <h1 className="schedule-zoom-session-card-title text-center">Schedule Your Zoom Session</h1>
          {formDetails ? (
            <>
              <div className="mb-4">
                <p><strong>Client Name:</strong> {formDetails.clientFirstName} {formDetails.clientMiddleName} {formDetails.clientLastName}</p>
                <p><strong>Email:</strong> {formDetails.clientEmail}</p>
                <p><strong>Phone Number:</strong> {formDetails.clientPhoneNumber}</p>
                <p><strong>Age:</strong> {formDetails.clientAge}</p>
                <p><strong>College:</strong> {formDetails.clientCollege}</p>
                <p><strong>Proof Document:</strong> <a href={formDetails.clientProofDocLink} target="_blank" rel="noopener noreferrer">View Document</a></p>
                <p><strong>Verified:</strong> {formDetails.isVerified ? 'Yes' : 'No'}</p>
                <p><strong>Created On:</strong> {new Date(formDetails.createdOn).toLocaleDateString()}</p>
              </div>
              {formDetails.isVerified === 1 ? (
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
              ) : (
                <div className="alert alert-danger">
                  The form is not verified. Please discard scheduling the session. If scheduled even after warning, your account will be removed and blocked from the platform.
                </div>
              )}
              {message && <div className="alert alert-success schedule-zoom-session-alert">{message}</div>}
            </>
          ) : (
            <p>Loading form details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleZoomSession;
