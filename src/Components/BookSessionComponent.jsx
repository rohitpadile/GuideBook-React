import React from 'react';
import '../App.css';

const BookSessionComponent = ({ student, onClose }) => {
  return (
    <div className="container mt-5">
      <div className="card book-session-card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-header book-session-header">
          <h4>Book Session</h4>
          <button className="btn-close" onClick={onClose}>X</button> {/* Close button */}
        </div>
        <div className="card-body book-session-body">
          <h5>{student.studentName}</h5>
          <div className="list-group mt-4">
            <button className="list-group-item list-group-item-action btn btn-primary mb-2">
              Book 1:1 Zoom Session
            </button>
            <button className="list-group-item list-group-item-action btn btn-secondary">
              Book 1:1 Offline Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionComponent;
