import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCollegesForExam } from '../Services/apiServiceAdmin';

const SecondaryNavbarComponent = ({ showDropdown, handleMouseEnter, handleMouseLeave, handleDropdownMouseEnter, handleDropdownMouseLeave }) => {
  const [entranceExams, setEntranceExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntranceExams();
  }, []);

  const fetchEntranceExams = async () => {
    try {
      // Mock data or fetch from API
      const entranceExamsData = {
        entranceExamNameSet: [
          "MHT-CET", // Replace with actual API call
          "Other Exam 1",
          "Other Exam 2"
        ]
      };
      setEntranceExams(entranceExamsData.entranceExamNameSet);
    } catch (error) {
      console.error('Error fetching entrance exams:', error);
    }
  };

  const handleExamClick = async (examName) => {
    try {
      const colleges = await getCollegesForExam(examName);
      console.log('Fetched colleges for exam:', colleges);
      navigate(`/colleges/${encodeURIComponent(examName)}`);
    } catch (error) {
      console.error('Error fetching colleges for exam:', error);
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
              <a className="nav-link" href="/entrance-exams" style={{ borderBottom: '2px solid transparent', padding: '5px', color: '#ffffff' }}>
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
