import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllColleges } from '../Services/apiServiceAdmin';

const SelectCollegeComponent = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await getAllColleges();
      console.log('Fetched colleges:', response.data.collegeNameList);
      setColleges(response.data.collegeNameList || []);
    } catch (error) {
      console.error('Error fetching colleges:', error);
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
