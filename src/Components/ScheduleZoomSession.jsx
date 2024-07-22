import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../css/ScheduleZoomSessionCss.css';
import CryptoJS from 'crypto-js';
import { fetchFormDetails } from '../Services/zoomSessionService';
import axios from 'axios';

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
  
  let formId, studentWorkEmail;
  try {
    const decryptedData = decryptData(encryptedFormIdAndStudentWorkEmail);
    formId = decryptedData.decryptedFormId;
    studentWorkEmail = decryptedData.decryptedStudentWorkEmail;
    console.log("Decrypted Form ID:", formId);
    console.log("Decrypted Student Work Email:", studentWorkEmail);
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

  useEffect(() => {
    if (formId) {
      const fetchDetails = async () => {
        try {
          const data = await fetchFormDetails(formId);
          setFormDetails(data);
          if (data.isVerified !== 1) {
            setMessage('The form is not verified. Please discard scheduling the session. If scheduled even after warning, your account will be removed and blocked from the platform.');
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

    let messageToSend = studentMessageToClient;
    if (availability === 'no' && !studentMessageToClient) {
      messageToSend = `Student did not leave a message behind. He/She must be very busy in their schedule. We are sorry you couldn't connect with ${formDetails.clientFirstName} ${formDetails.clientLastName}. Keep knocking, maybe one day someone will open the door.`;
    }

    const confirmZoomSessionRequestFromStudent = {
      studentWorkEmail: studentWorkEmail, // fetched from formDetails
      ZoomSessionFormId: formId,
      isAvailable: availability === 'yes' ? 1 : 0,
      zoomSessionTime: availability === 'yes' ? preferredTime : undefined,
      zoomSessionMeetingId: availability === 'yes' ? meetingId : undefined,
      zoomSessionPasscode: availability === 'yes' ? passcode : undefined,
      zoomSessionMeetingLink: availability === 'yes' ? meetingLink : undefined,
      studentMessageToClient: messageToSend
    };

    try {
      await axios.post('http://localhost:8080/api/v1/admin/confirmZoomSessionFromStudent', confirmZoomSessionRequestFromStudent);
      setMessage('Your availability has been submitted. Thank you!');
    } catch (error) {
      console.error('Error submitting availability:', error);
      setMessage('There was an error submitting your availability. Please try again.');
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
                        />
                      </div>
                    </>
                  )}
                  {availability === 'no' && (
                    <div className="form-group schedule-zoom-session-form-group">
                      <label htmlFor="studentMessageToClient">Leave a message for the client</label>
                      <textarea 
                        id="studentMessageToClient" 
                        className="form-control" 
                        value={studentMessageToClient} 
                        onChange={handleStudentMessageToClientChange}
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
