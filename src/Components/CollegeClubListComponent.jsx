import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollegeClubsForCollege } from '../Services/apiServiceAdmin';

const CollegeClubsListComponent = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const { collegeName } = useParams(); // Assuming collegeName is obtained from React Router params

  useEffect(() => {
    fetchCollegeClubs();
  }, [collegeName]); // Fetch clubs whenever collegeName changes

  const fetchCollegeClubs = async () => {
    try {
      const response = await getCollegeClubsForCollege(collegeName);
      console.log('Fetched clubs:', response);
      setClubs(response);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleClubClick = (clubName) => {
    // Handle navigation to club details or other actions
    // navigate(`/clubs/${encodeURIComponent(clubName)}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clubs at {collegeName}</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="list-group">
            {clubs.map((clubName, index) => (
              <button
                key={index}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => handleClubClick(clubName)}
              >
                {clubName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeClubsListComponent;
