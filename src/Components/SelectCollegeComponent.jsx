import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollegesForExam, getAllEntranceExams } from '../Services/apiServiceAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SelectCollegeComponentCss.css';
import { S3_COLLEGE_PHOTO_BASE_URL } from '../constants/s3url';
// Base URL for S3
// const S3_COLLEGE_PHOTO_BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/collegePhotos/';

const SelectCollegeComponent = () => {
  const [colleges, setColleges] = useState([]);
  const [entranceExams, setEntranceExams] = useState([]);
  const navigate = useNavigate();
  const { examName } = useParams(); // Assuming you're using React Router for params

  useEffect(() => {
    fetchColleges();
    fetchEntranceExams();
  }, [examName]); // Fetch colleges and entrance exams whenever examName changes

  const fetchColleges = async () => {
    try {
      const response = await getCollegesForExam(examName);
      console.log('Fetched colleges for exam:', response);
      setColleges(response);
    } catch (error) {
      console.error('Error fetching colleges IN COMPONENT:', error);
    }
  };

  const fetchEntranceExams = async () => {
    try {
      const exams = await getAllEntranceExams();
      // Include "ALL" in the entrance exams list
      setEntranceExams(['ALL', ...exams]);
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

  const handleCollegeClick = (collegeName) => {
    navigate(`/selectStudent/${encodeURIComponent(collegeName)}`);
  };

  // Function to generate S3 URL for college photos
  const getCollegePhotoUrl = (collegeName) => {
    const formattedName = collegeName.toLowerCase().replace(/\s/g, '');
    return `${S3_COLLEGE_PHOTO_BASE_URL}${formattedName}.jpg`;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="sc-card">
            <h5 className="sc-card-header">Select Entrance Exam</h5>
            <ul className="sc-list-group">
              {entranceExams.map(examName => (
                <li
                  key={examName}
                  className="sc-list-group-item"
                  onClick={() => handleExamClick(examName)}
                >
                  {examName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="college-photos-container">
            {colleges.map(collegeName => (
              <div key={collegeName} className="college-card">
                <div className="card h-100 border-primary shadow-sm" onClick={() => handleCollegeClick(collegeName)} style={{ cursor: 'pointer' }}>
                  {/* <img
                    src={`/collegePhotos/${collegeName.toLowerCase().replace(/\s/g, '')}.jpg`}
                    className="card-img-top"
                    alt={collegeName}
                  /> */}
                  <img
                    src={getCollegePhotoUrl(collegeName)} // Use the S3 URL
                    className="card-img-top"
                    alt={collegeName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{collegeName}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCollegeComponent;
