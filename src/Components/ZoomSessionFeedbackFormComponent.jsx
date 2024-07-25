import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const ZoomSessionFeedbackFormComponent = () => {
  const [overallFeedback, setOverallFeedback] = useState('');
  const [purposeFulfilled, setPurposeFulfilled] = useState('');
  const [moreFeedbackAboutStudent, setMoreFeedbackAboutStudent] = useState('');
  const [feedbackForCompany, setFeedbackForCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { encryptedId } = useParams();

  useEffect(() => {
    const decryptTransactionId = (encryptedValue) => {
      const key = '1234567890123456';
      const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encryptedValue), key);
      return decrypted.toString(CryptoJS.enc.Utf8);
    };

    try {
      const transactionId = decryptTransactionId(encryptedId);
      // Fetch existing feedback details if needed using transactionId
      // Example: fetchFeedbackDetails(transactionId);
      console.log("transaction id: " + transactionId);
    } catch (error) {
      console.error('Error decrypting transaction ID:', error);
    }
  }, [encryptedId]);

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
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Zoom Session Feedback Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="overallFeedback">Overall Feedback</label>
              <select
                id="overallFeedback"
                className="form-control"
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
            <div className="form-group mt-3">
              <label htmlFor="purposeFulfilled">Was Your Purpose Fulfilled?</label>
              <textarea
                id="purposeFulfilled"
                className="form-control"
                rows="4"
                value={purposeFulfilled}
                onChange={handlePurposeFulfilledChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="moreFeedbackAboutStudent">More Feedback About the Student</label>
              <textarea
                id="moreFeedbackAboutStudent"
                className="form-control"
                rows="4"
                value={moreFeedbackAboutStudent}
                onChange={handleMoreFeedbackAboutStudentChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="feedbackForCompany">Feedback for the Company</label>
              <textarea
                id="feedbackForCompany"
                className="form-control"
                rows="4"
                value={feedbackForCompany}
                onChange={handleFeedbackForCompanyChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            {message && (
              <div className={`alert mt-3 ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ZoomSessionFeedbackFormComponent;
