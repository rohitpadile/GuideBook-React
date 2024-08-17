import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BookSessionComponentCss.css'; // Use the new CSS file

const BookSessionComponent = ({ student, onClose }) => {
  const navigate = useNavigate();

  const handleBookZoomSession = () => {
    navigate('/bookZoomSessionForm', { state: { student } });
  };

  return (
    <div className="book-session-popup">
      <div className="card book-session-card mx-auto">
        <div className="card-header book-session-header d-flex justify-content-between align-items-center">
          <h4 className="text-center">Book Session</h4>
          <button className="btn-close" onClick={onClose}>X</button> {/* Close button */}
        </div>
        <div className="card-body book-session-body text-center">
          <h5 className='text-center'>{student.studentName}</h5>
          <div className="list-group mt-4">
            <button
              className="list-group-item list-group-item-action btn btn-primary mb-2 text-center"
              onClick={handleBookZoomSession}
            >
              Book 1:1 Zoom Session
            </button>
            <button className="list-group-item list-group-item-action btn btn-secondary text-center">
              Book 1:1 Offline Session (Currently Unavailable)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionComponent;
