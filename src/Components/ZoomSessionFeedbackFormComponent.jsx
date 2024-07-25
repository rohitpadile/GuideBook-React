import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { decodeTransactionId } from '../Services/encryptionForFeedbackForm'; // Adjust the path as necessary
import '../css/FeedbackFormCss.css';

const ZoomSessionFeedbackFormComponent = () => {
  const [overallFeedback, setOverallFeedback] = useState('');
  const [purposeFulfilled, setPurposeFulfilled] = useState('');
  const [moreFeedbackAboutStudent, setMoreFeedbackAboutStudent] = useState('');
  const [feedbackForCompany, setFeedbackForCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { encryptedTransactionId } = useParams();
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (encryptedTransactionId) {
      try {
        const decryptedId = decodeTransactionId(decodeURIComponent(encryptedTransactionId));
        console.log('Decoded transaction ID:', decryptedId);
        setTransactionId(decryptedId);
      } catch (error) {
        console.error('Error decoding transaction ID:', error);
      }
    }
  }, [encryptedTransactionId]);

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

    const feedbackData = {
      overallFeedback,
      purposeFulfilled,
      moreFeedbackAboutStudent,
      feedbackForCompany,
    };

    try {
      // Send feedback data to the server
      // await axios.post('http://your-api-endpoint/feedback', feedbackData);
      setMessage('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="zoom-feedback-form-container">
      <div className="zoom-feedback-form-card">
        <h2 className="zoom-feedback-form-title">Zoom Session Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="zoom-feedback-form-group">
            <label htmlFor="overallFeedback">Overall Feedback</label>
            <select
              id="overallFeedback"
              className="zoom-feedback-form-control"
              value={overallFeedback}
              onChange={handleOverallFeedbackChange}
              required
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
            />
          </div>
          <button type="submit" className="zoom-feedback-form-btn" disabled={isSubmitting}>
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
