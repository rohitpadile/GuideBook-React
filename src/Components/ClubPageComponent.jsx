import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClubPostComponent from './ClubPostComponent';
import { getClubDetails } from '../Services/apiServiceAdmin';

const ClubPageComponent = () => {
  const [club, setClub] = useState(null);
  const { clubName } = useParams();

  useEffect(() => {
    fetchClubDetails();
  }, [clubName]);

  const fetchClubDetails = async () => {
    try {
      const response = await getClubDetails(clubName);
      setClub(response); // Assuming response structure matches expected club details
    } catch (error) {
      console.error('Error fetching club details:', error);
    }
  };

  if (!club) {
    return <div className="loading-container">Loading...</div>; // Placeholder for loading state
  }

  // Construct the path for the club banner photo based on naming convention
  const clubBannerPath = `/collegeClubBanners/${clubName.toLowerCase().replace(/\s+/g, '')}.jpg`;

  return (
    <div className="container mt-4 club-page">
      <div className="club-banner">
        <img src={clubBannerPath} alt={club.collegeClubName} className="club-banner-img" />
      </div>
      <div className="club-details card p-4">
        <h1 className="club-name">{club.collegeClubName}</h1>
        <p className="club-description">{club.collegeClubDescription}</p>
        <p className="club-college mb-4">College: {club.collegeClubCollegeName}</p>
        <hr />
        <h2 className="club-posts-heading mt-4">Posts</h2>
        {club.posts && club.posts.length > 0 ? (
          club.posts.map((post) => (
            <ClubPostComponent key={post.collegePostId} post={post} />
          ))
        ) : (
          <p className="no-posts">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ClubPageComponent;
