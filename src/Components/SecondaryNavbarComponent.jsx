import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEntranceExams } from '../Services/apiServiceAdmin'; // Adjust import as per your actual service

const SecondaryNavbarComponent = ({ showDropdown, handleMouseEnter, handleMouseLeave, handleDropdownMouseEnter, handleDropdownMouseLeave }) => {
  const [entranceExams, setEntranceExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntranceExams();
  }, []);

  const fetchEntranceExams = async () => {
    try {
      const exams = await getAllEntranceExams();
      setEntranceExams(exams);
    } catch (error) {
      console.error('Error fetching entrance exams:', error);
    }
  };

  const handleExamClick = async (examName) => {
    try {
      navigate(`/colleges/${encodeURIComponent(examName)}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{ height: '30px', padding: '5px 0' }}>
      <div className="container">
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto align-items-center">
            <li
              className="nav-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleMouseEnter}
            >
              <a className="nav-link" href="/entrance-exams" style={{ borderBottom: '2px solid transparent', padding: '5px', color: '#ffffff', fontSize: '0.9rem' }}>
                Entrance Exams
              </a>
              {showDropdown && (
                <div
                  className="dropdown-menu show"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {entranceExams.map(exam => (
                    <a key={exam} className="dropdown-item" onClick={() => handleExamClick(exam)} style={{ cursor: 'pointer' }}>{exam}</a>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SecondaryNavbarComponent;
