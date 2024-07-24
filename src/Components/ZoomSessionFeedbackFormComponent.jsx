import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZoomSessionFeedbackFormComponent = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(''); // For example: 1 to 5
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleAdditionalCommentsChange = (e) => {
    setAdditionalComments(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct request object here
    const feedbackData = {
      feedback,
      rating,
      additionalComments,
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
              <label htmlFor="feedback">Overall Feedback</label>
              <select
                id="feedback"
                className="form-control"
                value={feedback}
                onChange={handleFeedbackChange}
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
              <label htmlFor="rating">Rating (1 to 5)</label>
              <input
                type="number"
                id="rating"
                className="form-control"
                min="1"
                max="5"
                value={rating}
                onChange={handleRatingChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="additionalComments">Additional Comments</label>
              <textarea
                id="additionalComments"
                className="form-control"
                rows="4"
                value={additionalComments}
                onChange={handleAdditionalCommentsChange}
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
