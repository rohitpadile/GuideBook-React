import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollegesForClubs } from '../Services/apiServiceAdmin';

const SelectCollegeForClubsComponent = () => {
    const [colleges, setColleges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColleges = async () => {
          try {
            const response = await getCollegesForClubs();
            console.log('Fetched colleges for clubs:', response);
            setColleges(response);
          } catch (error) {
            console.error('Error fetching colleges in component:', error);
          }
        };
      
        fetchColleges(); // Call fetchColleges directly here
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); // Empty dependency array means it runs only once, like componentDidMount
      

  const handleCollegeClick = (collegeName) => {
    navigate(`/clubs/${encodeURIComponent(collegeName)}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Welcome to College ClubsX</h1>
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

export default SelectCollegeForClubsComponent;
