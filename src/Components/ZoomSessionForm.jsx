import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';

const ZoomSessionForm = () => {
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientMiddleName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhoneNumber: '',
    clientAge: '',
    clientCollege: '',
    clientProofDocLink: '',
    otp: '', // New state for OTP
  });

  const [message, setMessage] = useState('');
  const [messageCode, setMessageCode] = useState(null); // State for message code
  const [formId, setFormId] = useState(''); // State for form ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/zoomSessionFormSubmit', formData);
      const { zoomSessionFormMessage, zoomSessionFormMessageCode, zoomSessionFormId } = response.data;
      setMessage(zoomSessionFormMessage || 'OTP sent successfully.');
      setMessageCode(zoomSessionFormMessageCode); // Update message code
      setFormId(zoomSessionFormId); // Set the form ID
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/zoomSessionFormVerifyOTP', {
        clientOTP: formData.otp,
        clientEmail: formData.clientEmail,
        zoomSessionFormId: formId,
      });
      const { zoomSessionFormMessage, zoomSessionFormMessageCode } = response.data;
      setMessage(zoomSessionFormMessage);
      setMessageCode(zoomSessionFormMessageCode);
      if (zoomSessionFormMessageCode === 0) {
        handleRedirect();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    // Handle OTP resend
    console.log('Resend OTP button clicked');
  };

  const handleRedirect = () => {
    // Redirect to student profile page
    console.log('Redirecting to student profile page');
  };

  return (
    <div className="container mt-5">
      <div className="card book-session-card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header book-session-header text-center">
          <h4>Book a 1:1 Zoom Session</h4>
        </div>
        <div className="card-body book-session-body">
          <form>
            <div className="mb-3 row">
              <label htmlFor="clientFirstName" className="col-sm-4 col-form-label">First Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientFirstName"
                  name="clientFirstName"
                  value={formData.clientFirstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientMiddleName" className="col-sm-4 col-form-label">Middle Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientMiddleName"
                  name="clientMiddleName"
                  value={formData.clientMiddleName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientLastName" className="col-sm-4 col-form-label">Last Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientLastName"
                  name="clientLastName"
                  value={formData.clientLastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientEmail" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="clientEmail"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientPhoneNumber" className="col-sm-4 col-form-label">Phone Number</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientPhoneNumber"
                  name="clientPhoneNumber"
                  value={formData.clientPhoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientAge" className="col-sm-4 col-form-label">Age</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="clientAge"
                  name="clientAge"
                  value={formData.clientAge}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientCollege" className="col-sm-4 col-form-label">College</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientCollege"
                  name="clientCollege"
                  value={formData.clientCollege}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientProofDocLink" className="col-sm-4 col-form-label">Proof Document Link</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientProofDocLink"
                  name="clientProofDocLink"
                  value={formData.clientProofDocLink}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {(messageCode === 1 || messageCode === -1) && (
              <div className="mb-3 row">
                <label htmlFor="otp" className="col-sm-4 col-form-label">Enter OTP</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="mb-3 row">
              <div className="col-sm-12 text-center">
                {(messageCode === 1 || messageCode === -1) ? (
                  <>
                    <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                      Verify OTP
                    </button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                )}
              </div>
            </div>
          </form>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ZoomSessionForm;
