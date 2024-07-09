import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollegesForExam } from '../Services/apiServiceAdmin';

const SelectCollegeComponent = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();
  const { examName } = useParams(); // Assuming you're using React Router for params

  useEffect(() => {
    fetchColleges();
  }, [examName]); // Fetch colleges whenever examName changes

  const fetchColleges = async () => {
    try {
      const response = await getCollegesForExam(examName);
      console.log('Fetched colleges for exam:', response);
      setColleges(response);
    } catch (error) {
      console.error('Error fetching colleges IN COMPONENT:', error);
    }
  };

  const handleCollegeClick = (collegeName) => {
    navigate(`/selectStudent/${encodeURIComponent(collegeName)}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Select College</h1>
      <div className="row">
        {colleges.map(collegeName => (
          <div key={collegeName} className="col-md-4 mb-4">
            <div className="card h-100 border-primary shadow-sm" onClick={() => handleCollegeClick(collegeName)} style={{ cursor: 'pointer' }}>
              <img src={`/collegePhotos/${collegeName.toLowerCase().replace(/\s/g, '')}.jpg`} className="card-img-top" alt={collegeName} style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
              <div className="card-body">
                <h5 className="card-title">{collegeName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCollegeComponent;
