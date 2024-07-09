import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClubPostComponent from './ClubPostComponent';
import { getClubDetails } from '../Services/apiServiceAdmin'; // Assuming a service function to fetch club details

const ClubPageComponent = () => {
  const [club, setClub] = useState(null);
  const { clubName } = useParams();

  useEffect(() => {
    fetchClubDetails();
  }, [clubName]);

  const fetchClubDetails = async () => {
    try {
      const response = await getClubDetails(clubName); // Implement this function to fetch club details
      setClub(response);
    } catch (error) {
      console.error('Error fetching club details:', error);
    }
  };

  return (
    <div className="container mt-4">
      {club && (
        <>
          <div className="club-banner">
            <img src={`/collegeClubPhotos/${club.collegeClubBannerPath}`} alt={club.collegeClubName} />
          </div>
          <div className="club-details">
            <h1 className="club-name">{club.collegeClubName}</h1>
            <p className="club-description">{club.collegeClubDescription}</p>
            <p className="club-followers">Followers: {club.collegeClubFollowers}</p>
            <p className="club-college">College: {club.collegeClubCollege.collegeName}</p>
          </div>
          <div className="club-posts">
            <h2>Posts</h2>
            {club.posts.map((post) => (
              <ClubPostComponent key={post.collegePostId} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClubPageComponent;
