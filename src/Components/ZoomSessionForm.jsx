import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, resendOtp, submitZoomSessionForm } from '../Services/zoomSessionService';

const ZoomSessionForm = () => {
  const { studentName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientMiddleName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhoneNumber: '',
    clientAge: '',
    clientCollege: '',
    clientProofDocLink: '',
    clientOTP: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendOtp = async () => {
    try {
      const otpData = {
        clientEmail: formData.clientEmail,
        clientPhoneNumber: formData.clientPhoneNumber,
      };
      await sendOtp(otpData);
      setOtpSent(true);
      setMessage('OTP sent to your email and phone number.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpVerifyData = {
        clientOTP: Number(formData.clientOTP), // Convert to number
        clientEmail: formData.clientEmail,
      };
      const response = await verifyOtp(otpVerifyData);
      setMessage(response.zoomSessionFormMessage);

      if (response.zoomSessionFormMessage === 'OTP has been verified') {
        setOtpVerified(true);
      } else if (
        response.zoomSessionFormMessage.includes('3 wrong attempts') ||
        response.zoomSessionFormMessage.includes('Out of OTP time') ||
        response.zoomSessionFormMessage.includes('No form found')
      ) {
        navigate('/studentProfile');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreeTerms) {
      try {
        await submitZoomSessionForm(formData);
        setMessage('Your form has been submitted and sent to the Student for review and confirmation.');
        setShowConfirmation(true);
        setShowTermsModal(false);
      } catch (error) {
        console.error('Error submitting the form:', error);
        setMessage('Failed to submit the form. Please try again.');
      }
    } else {
      setShowTermsModal(true);
    }
  };

  const handleResendOtp = async () => {
    try {
      const otpData = {
        clientEmail: formData.clientEmail,
        clientPhoneNumber: formData.clientPhoneNumber,
      };
      await resendOtp(otpData);
      setMessage('OTP resent to your email and phone number.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setMessage('Failed to resend OTP. Please try again.');
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    setShowTermsModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="card book-session-card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header book-session-header text-center">
          <h4>Book a 1:1 Zoom Session</h4>
          <h4>{studentName}</h4>
        </div>
        <div className="card-body book-session-body">
          <form onSubmit={otpVerified ? handleSubmit : (e) => e.preventDefault()}>
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

            {otpSent && (
              <div className="mb-3 row">
                <label htmlFor="clientOTP" className="col-sm-4 col-form-label">Enter OTP</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="clientOTP"
                    name="clientOTP"
                    value={formData.clientOTP}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-3 row">
              <div className="col-sm-12 text-center">
                {!otpSent ? (
                  <button type="button" className="btn btn-primary" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                ) : !otpVerified ? (
                  <>
                    <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                      Verify OTP
                    </button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  </>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
              </div>
            </div>

            {message && (
              <div className="mb-3 row">
                <div className="col-sm-12 text-center">
                  <p className="text-danger">{message}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmationModalLabel">Confirmation</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                Your session has been successfully booked. Thank you!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="termsModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="termsModalLabel">Terms and Conditions</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <p>Please read and agree to the terms and conditions before submitting.</p>
                <textarea className="form-control mb-3" rows="5" readOnly>
                  Terms and Conditions content goes here.
                </textarea>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />
                  <label className="form-check-label" htmlFor="agreeTerms">I agree to the terms and conditions</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomSessionForm;
