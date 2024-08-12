import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../css/ScheduleZoomSessionCss.css';
import CryptoJS from 'crypto-js';
import { fetchFormDetails, confirmZoomSessionFromStudent } from '../Services/zoomSessionService';

const decryptData = (encryptedData) => {
  const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Ensure the key is consistent
  const [encryptedFormId, encryptedStudentWorkEmail] = encryptedData.split('.');

  const decryptedFormIdBytes = CryptoJS.AES.decrypt(encryptedFormId, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedFormId = decryptedFormIdBytes.toString(CryptoJS.enc.Utf8);

  const decryptedStudentWorkEmailBytes = CryptoJS.AES.decrypt(encryptedStudentWorkEmail, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStudentWorkEmail = decryptedStudentWorkEmailBytes.toString(CryptoJS.enc.Utf8);

  return { decryptedFormId, decryptedStudentWorkEmail };
};

const ScheduleZoomSession = () => {
  const { encryptedFormIdAndStudentWorkEmail } = useParams();
  const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
  let formId, studentWorkEmail;
  try {
    const decryptedData = decryptData(encryptedFormIdAndStudentWorkEmail);
    formId = decryptedData.decryptedFormId;
    studentWorkEmail = decryptedData.decryptedStudentWorkEmail;
    // console.log("Decrypted Form ID:", formId);
    // console.log("Decrypted Student Work Email:", studentWorkEmail);
  } catch (error) {
    console.error("Error decrypting data:", error);
    formId = null;
    studentWorkEmail = null;
  }

  const [formDetails, setFormDetails] = useState(null);
  const [availability, setAvailability] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [message, setMessage] = useState('');
  const [studentMessageToClient, setStudentMessageToClient] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookStatus, setBookStatus] = useState('');

  useEffect(() => {
    if (formId) {
      const fetchDetails = async () => {
        try {
          const data = await fetchFormDetails(formId);
          setFormDetails(data);
          setBookStatus(data.bookStatus);
          if (data.isVerified !== 1) {
            setMessage('The form is not verified by OTP. For Security purposes, we do not allow to schedule this session.');
          }
        } catch (error) {
          console.error('Error fetching form details:', error);
        }
      };
      fetchDetails();
    }
  }, [formId]);

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
    if (e.target.value === 'no') {
      setStudentMessageToClient(''); // Clear the message when availability is set to 'no'
    }
  };

  const handlePreferredTimeChange = (e) => {
    setPreferredTime(e.target.value);
  };

  const handleMeetingIdChange = (e) => {
    setMeetingId(e.target.value);
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleMeetingLinkChange = (e) => {
    setMeetingLink(e.target.value);
  };

  const handleStudentMessageToClientChange = (e) => {
    setStudentMessageToClient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the submit button
///////////////////////////
    // Check if the preferred time is before the current time
    const currentDateTime = new Date();
    const preferredDateTime = new Date(preferredTime);
    if (availability === 'yes' && preferredDateTime < currentDateTime) {
      setMessage('The preferred time cannot be before the current time.');
      setIsSubmitting(false); // Re-enable the submit button
      return; // Exit the function
    }
    //////////////////////////////////////
    let confirmZoomSessionRequestFromStudent;

    if (availability === 'yes') {
      confirmZoomSessionRequestFromStudent = {
        studentWorkEmail: studentWorkEmail, // fetched from formDetails
        ZoomSessionFormId: formId,
        isAvailable: 1,
        zoomSessionTime: preferredTime,
        zoomSessionMeetingId: meetingId,
        zoomSessionPasscode: passcode,
        zoomSessionMeetingLink: meetingLink,
      };
    } else if (availability === 'no') {
      const messageToSend = studentMessageToClient || `Student did not leave a message behind. He/She must be very busy in their schedule. We are sorry you couldn't connect with ${formDetails.clientFirstName} ${formDetails.clientLastName}. Keep knocking, maybe one day someone will open the door.`;

      confirmZoomSessionRequestFromStudent = {
        studentWorkEmail: studentWorkEmail, // fetched from formDetails
        ZoomSessionFormId: formId,
        isAvailable: 0,
        studentMessageToClient: messageToSend
      };
    } else {
      setMessage('Please select your availability status.');
      setIsSubmitting(false); // Re-enable the submit button
      return; // Exit the function
    }

    try {
      await confirmZoomSessionFromStudent(confirmZoomSessionRequestFromStudent);
      setMessage('Your availability has been submitted. Thank you!');
    } catch (error) {
      console.error('Error submitting availability:', error);
      setMessage('There was an error submitting your availability. Check console. Please try again.');
      setIsSubmitting(false); // Re-enable the submit button
    } finally {
      setIsSubmitting(true); // Ensure the submit button is re-enabled in case of success as well
    }
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
                <p><strong>Verified by OTP:</strong> {formDetails.isVerified ? 'Yes' : 'No'}</p>
                <p><strong>Created On:</strong> {new Date(formDetails.createdOn).toLocaleDateString()}</p>
                <p><strong>Book Status:</strong> {bookStatus}</p>
              </div>
              {formDetails.isVerified === 1 ? ( // Form is verified
                <form onSubmit={handleSubmit}>
                  <div className="form-group schedule-zoom-session-form-group">
                    <label htmlFor="availability">Are you available?</label>
                    <select 
                      id="availability" 
                      className="form-control" 
                      value={availability} 
                      onChange={handleAvailabilityChange}
                      required
                      disabled={bookStatus !== 'PENDING' || isSubmitting}
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {availability === 'yes' && (
                    <>
                      <div className="form-group schedule-zoom-session-form-group">
                        <label htmlFor="preferredTime">Preferred Time for Session</label>
                        <input 
                          type="datetime-local" 
                          id="preferredTime" 
                          className="form-control" 
                          value={preferredTime} 
                          onChange={handlePreferredTimeChange}
                          required 
                          disabled={bookStatus !== 'PENDING' || isSubmitting}
                        />
                      </div>
                      <div className="form-group schedule-zoom-session-form-group">
                        <label htmlFor="meetingId">Meeting ID</label>
                        <input 
                          type="text" 
                          id="meetingId" 
                          className="form-control" 
                          value={meetingId} 
                          onChange={handleMeetingIdChange}
                          required 
                          disabled={bookStatus !== 'PENDING' || isSubmitting}
                        />
                      </div>
                      <div className="form-group schedule-zoom-session-form-group">
                        <label htmlFor="passcode">Passcode</label>
                        <input 
                          type="text" 
                          id="passcode" 
                          className="form-control" 
                          value={passcode} 
                          onChange={handlePasscodeChange}
                          required 
                          disabled={bookStatus !== 'PENDING' || isSubmitting}
                        />
                      </div>
                      <div className="form-group schedule-zoom-session-form-group">
                        <label htmlFor="meetingLink">Meeting Link</label>
                        <input 
                          type="text" 
                          id="meetingLink" 
                          className="form-control" 
                          value={meetingLink} 
                          onChange={handleMeetingLinkChange}
                          required 
                          disabled={bookStatus !== 'PENDING' || isSubmitting}
                        />
                      </div>
                    </>
                  )}
                  {availability === 'no' && (
                    <div className="form-group schedule-zoom-session-form-group">
                      <label htmlFor="studentMessageToClient">Message to Client (Optional)</label>
                      <textarea
                        id="studentMessageToClient"
                        className="form-control"
                        value={studentMessageToClient}
                        onChange={handleStudentMessageToClientChange}
                        rows="3"
                        disabled={bookStatus !== 'PENDING' || isSubmitting}
                      ></textarea>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting || bookStatus !== 'PENDING'}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              ) : (
                <p className="alert alert-danger">The form is not verified by OTP. For security purposes, we do not allow scheduling this session.</p>
              )}
            </>
          ) : (
              <img src={`${BASE_URL}logoblack.jpg`} alt="GuidebookX" className="loading-logo" />
          )}
          {message && <div className="mt-4 alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default ScheduleZoomSession;
