import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollegeClubsForCollege } from '../Services/apiServiceAdmin';
import '../App.css'; // Import your custom CSS for styling

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
    navigate(`/clubpage/${clubName}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clubs at {collegeName}</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {clubs.map((clubName, index) => (
            <div
              key={index}
              className="card mb-3 club-card"
              onClick={() => handleClubClick(clubName)}
            >
              <div className="card-body">
                <h4 className="card-title">{clubName}</h4>
                {/* <p className="card-text">COEP</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeClubsListComponent;
