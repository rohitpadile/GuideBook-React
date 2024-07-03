import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

const BookSessionComponent = () => {
  const location = useLocation();
  const { student } = location.state || {};

  return (
    <div className="container mt-5">
      <div className="card book-session-card">
        <div className="card-header book-session-header">
          <h4>Book Session</h4>
        </div>
        <div className="card-body book-session-body">
          <h5>{student.studentName}</h5>
          <div className="list-group mt-4">
            <button className="list-group-item list-group-item-action">
              Book 1:1 Zoom Session
            </button>
            <button className="list-group-item list-group-item-action">
              Book 1:1 Offline Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionComponent;
