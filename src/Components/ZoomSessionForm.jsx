import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Importing Modal and Button from react-bootstrap
import { sendOtp, verifyOtp, resendOtp, bookSession, getClientAccountDetails  } from '../Services/zoomSessionService'; // Importing the API service functions
import {checkLoginStatus} from '../Services/userAccountApiService';
import auth from '../auth';
//TRIM THE INPUT FIELDS BEFORE SETTING TO THE STATES - REMANINING
  
const ZoomSessionForm = () => {
  const navigate = useNavigate();
  // const { studentName } = useParams();
  const location = useLocation();
  const student = location.state?.student || {}; // Retrieve student state

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
  const [formId, setFormId] = useState(''); // State for form UUID
  const [showTermsModal, setShowTermsModal] = useState(false); // State for showing terms modal
  const [acceptTerms, setAcceptTerms] = useState(false); // State for accepting terms
  const [isBooked, setIsBooked] = useState(0);
  const [isDataFilled, setIsDataFilled] = useState(false); // State to manage button disable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };
  

  const handleSendOtp = async () => {
    // Check if all required fields are filled
    try {
      const token = auth.getToken();
      if (token) {
        const isLoggedInStatus = await checkLoginStatus(token);
      } else {
        setMessage('Please Login in.');
        navigate('/login');
      }
    } catch (error) {
      setMessage('Please Login in.');
      navigate('/login');
    }

    if (
      !formData.clientFirstName ||
      !formData.clientLastName ||
      !formData.clientEmail ||
      !formData.clientPhoneNumber ||
      !formData.clientAge ||
      !formData.clientCollege ||
      !formData.clientProofDocLink
    ) {
      setMessage('Please fill all required fields before sending OTP.');
      return; // Stop execution if validation fails
    }
  
    try {
      const data = await sendOtp(formData);
      
      // Ensure that data contains the expected properties
      const { zoomSessionFormMessage, zoomSessionFormMessageCode, zoomSessionFormId } = data;
      
      setMessage(zoomSessionFormMessage || 'OTP sent successfully.');
      setMessageCode(zoomSessionFormMessageCode);
      setFormId(zoomSessionFormId);
    } catch (error) {
      // console.error('Error sending OTP:', error);
      setMessage('Failed to send OTP. Please try again.');
    }
  };
  
  

  const handleVerifyOtp = async () => {
    try {
      const otpData = {
        clientOTP: formData.otp,
        clientEmail: formData.clientEmail,
        zoomSessionFormId: formId,
      };
      const data = await verifyOtp(otpData);
      const { zoomSessionFormMessage, zoomSessionFormMessageCode } = data;
      setMessage(zoomSessionFormMessage);
      setMessageCode(zoomSessionFormMessageCode);
      if (zoomSessionFormMessageCode === 0) {
        handleRedirect();
      }
    } catch (error) {
      // console.error('Error verifying OTP:', error);
      setMessage('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendOtp(formId);
      const { zoomSessionFormMessage, zoomSessionFormMessageCode } = data;
      setMessage(zoomSessionFormMessage);
      setMessageCode(zoomSessionFormMessageCode);
    } catch (error) {
      // console.error('Error resending new OTP:', error);
      setMessage('Failed to resend new OTP. Please try again.');
    }
  };

  const handleRedirect = () => {
    // console.log('Redirecting to student profile page');
    navigate('/studentProfile', { state: { student } });
  };

  const handleBookSession = async () => {
    setIsBooked(1);
    // console.log("Handling Final Book Session button");
    const zoomSessionConfirmationRequest = {
      studentWorkEmail: student.studentWorkEmail,
      zoomSessionFormId: formId,
    };
    try {
      const data = await bookSession(zoomSessionConfirmationRequest);
      // console.log('Booking response:', data);
      navigate('/zoomSessionFormSuccess', { state: { student, formId } });
    } catch (error) {
      console.error('Error booking session:', error);
      
    }
  };

  const handleShowTerms = () => setShowTermsModal(true);
  const handleCloseTerms = () => setShowTermsModal(false);

  const handleAcceptTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const handleFillMyData = async () => {
    try {
      // Retrieve the token using your authentication service
      const token = auth.getToken(); // Replace this with your actual token retrieval logic
  
      // Call the API service to get client account details
      const data = await getClientAccountDetails(token);
      // console.log(data.clientZoomEmail);
      // Update the form data with the response
      setFormData({
        clientFirstName: data.clientFirstName || '',
        clientMiddleName: data.clientMiddleName || '',
        clientLastName: data.clientLastName || '',
        clientEmail: data.clientZoomEmail || '',
        clientPhoneNumber: data.clientPhoneNumber || '',
        clientAge: data.clientAge || '',
        clientCollege: data.clientCollege || '',
        clientProofDocLink: data.clientValidProof || '',
        otp: '',
      });
  
      // Disable the button after filling the data
      setIsDataFilled(true);
    } catch (error) {
      setMessage('Failed to fetch client details. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card book-session-card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header book-session-header text-center">
          <h4>Book a 1:1 Zoom Session</h4>
          <h4>{student.studentName}</h4>
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
                  placeholder='Optional'
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
                <small className="text-muted d-block mt-2">
                  One Time Password will be sent to this email. The same will be verified for Zoom email.
                </small>
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
                  placeholder="Valid Proof Link"
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
{/* FILLING THE DATA FROM ACCOUNT */}
            <div className="mb-3 row">
              {!messageCode ? (
                <div className="col-sm-12 text-center">
                <button type="button" className="btn btn-secondary" onClick={handleFillMyData} disabled={isDataFilled}>
                  Fill My Data
                </button>
              </div>
              ) : <></>}
              
            </div>

            <div className="mb-3 row">
              <div className="col-sm-12 text-center">
                {messageCode === 1 || messageCode === -1 ? (
                  <>
                    <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>
                      Verify OTP
                    </button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  </>
                ) : messageCode === 2 ? (
                  <button type="button" className="btn btn-primary" onClick={handleShowTerms}>
                    Submit Form
                  </button>
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

      <Modal show={showTermsModal} onHide={handleCloseTerms}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add terms and conditions content here */}
          <p>By Booking this session, I accept all the Terms and Conditions of the Company. </p>
          {/* <p>Handle booking session carefully. Multiple clicks on Book Session might get you into block list </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTerms}>
            Close
          </Button>
          {isBooked === 1 ? (
              <></> // Do nothing, render nothing
            ) : (
              <Button variant="primary" onClick={handleBookSession}>
                Book Session
              </Button>
            )}

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ZoomSessionForm;
