import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CompanyFeedbackFormCss.css';
import { addCompanyFeedback } from '../Services/apiServiceAdmin';

const CompanyFeedbackFormComponent = () => {
  const [feedback, setFeedback] = useState({
    companyFeedbackUserName: '',
    companyFeedbackUserEmail: '',
    companyFeedbackTextBoxContent: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCompanyFeedback(feedback);
      if (response.status === 202) {
        setMessage('Feedback submitted successfully!');
      }
    } catch (error) {
      setMessage('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="feedback-card card p-4">
            <h1 className="feedback-card-title card-title text-center mb-4">Feedback</h1>
            <h4 className="feedback-card-subtitle card-title text-center mb-4">What can we bring to the table?</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="companyFeedbackUserName" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyFeedbackUserName"
                  name="companyFeedbackUserName"
                  value={feedback.companyFeedbackUserName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyFeedbackUserEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="companyFeedbackUserEmail"
                  name="companyFeedbackUserEmail"
                  value={feedback.companyFeedbackUserEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyFeedbackTextBoxContent" className="form-label">Feedback</label>
                <textarea
                  className="form-control"
                  id="companyFeedbackTextBoxContent"
                  name="companyFeedbackTextBoxContent"
                  value={feedback.companyFeedbackTextBoxContent}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyFeedbackFormComponent;
