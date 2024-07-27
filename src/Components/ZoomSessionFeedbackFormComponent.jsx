import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { decodeTransactionId } from '../Services/encryptionForFeedbackForm'; // Adjust the path as necessary
import '../css/FeedbackFormCss.css';
import { getSubmissionStatusForFeedbackForm, submitZoomSessionFeedbackForm } from '../Services/zoomSessionService';

const ZoomSessionFeedbackFormComponent = () => {
  const [overallFeedback, setOverallFeedback] = useState('');
  const [purposeFulfilled, setPurposeFulfilled] = useState('');
  const [moreFeedbackAboutStudent, setMoreFeedbackAboutStudent] = useState('');
  const [feedbackForCompany, setFeedbackForCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [studentName, setStudentName] = useState(''); // State for student name

  const { encryptedTransactionId } = useParams();
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (encryptedTransactionId) {
      try {
        const { uuid, studentName } = decodeTransactionId(decodeURIComponent(encryptedTransactionId));
        setTransactionId(uuid);
        setStudentName(studentName.replace(/\+/g, ' ')); // Replace '+' with space
      } catch (error) {
        console.error('Error decoding transaction ID:', error);
      }
    }
  }, [encryptedTransactionId]);

  useEffect(() => {
    const fetchSubmissionStatus = async () => {
      if (transactionId && isSubmitted === null) {
        try {
          const data = await getSubmissionStatusForFeedbackForm(transactionId);
          setIsSubmitted(data.isSubmitted);
          console.log("Submission status: " + data.isSubmitted);
        } catch (error) {
          console.error('Error fetching submission status:', error);
        }
      }
    };

    fetchSubmissionStatus();
  }, [transactionId, isSubmitted]);

  const handleOverallFeedbackChange = (e) => {
    setOverallFeedback(e.target.value);
  };

  const handlePurposeFulfilledChange = (e) => {
    setPurposeFulfilled(e.target.value);
  };

  const handleMoreFeedbackAboutStudentChange = (e) => {
    setMoreFeedbackAboutStudent(e.target.value);
  };

  const handleFeedbackForCompanyChange = (e) => {
    setFeedbackForCompany(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(1);

    const feedbackData = {
      zoomSessionTransactionId: transactionId,
      overallFeedback,
      purposeFulfilled,
      moreFeedbackAboutStudent,
      feedbackForCompany,
    };

    try {
      await submitZoomSessionFeedbackForm(feedbackData);
      setMessage('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('There was an error submitting your feedback. Please try again.');
      setIsSubmitted(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="zoom-feedback-form-container">
      <div className="zoom-feedback-form-card">
        <h2 className="zoom-feedback-form-title">Zoom Session Feedback Form</h2>
        {studentName && <p className="zoom-feedback-form-student-name">Student: {studentName}</p>}
        <form onSubmit={handleSubmit}>
          <div className="zoom-feedback-form-group">
            <label htmlFor="overallFeedback">Overall Feedback</label>
            <select
              id="overallFeedback"
              className="zoom-feedback-form-control"
              value={overallFeedback}
              onChange={handleOverallFeedbackChange}
              required
              disabled={isSubmitted === 1}
            >
              <option value="">Select Feedback</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div className="zoom-feedback-form-group">
            <label htmlFor="purposeFulfilled">Was Your Purpose Fulfilled?</label>
            <textarea
              id="purposeFulfilled"
              className="zoom-feedback-form-control"
              rows="4"
              value={purposeFulfilled}
              onChange={handlePurposeFulfilledChange}
              required
              disabled={isSubmitted === 1}
            />
          </div>
          <div className="zoom-feedback-form-group">
            <label htmlFor="moreFeedbackAboutStudent">More Feedback About the Student</label>
            <textarea
              id="moreFeedbackAboutStudent"
              className="zoom-feedback-form-control"
              rows="4"
              value={moreFeedbackAboutStudent}
              onChange={handleMoreFeedbackAboutStudentChange}
              disabled={isSubmitted === 1}
            />
          </div>
          <div className="zoom-feedback-form-group">
            <label htmlFor="feedbackForCompany">Feedback for the Company</label>
            <textarea
              id="feedbackForCompany"
              className="zoom-feedback-form-control"
              rows="4"
              value={feedbackForCompany}
              onChange={handleFeedbackForCompanyChange}
              disabled={isSubmitted === 1}
            />
          </div>
          <button type="submit" className="zoom-feedback-form-btn" disabled={isSubmitting || isSubmitted === 1}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          {message && (
            <div className={`zoom-feedback-form-alert ${message.includes('successfully') ? 'zoom-feedback-form-alert-success' : 'zoom-feedback-form-alert-danger'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ZoomSessionFeedbackFormComponent;
