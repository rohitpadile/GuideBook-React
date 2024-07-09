import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClubPostComponent from './ClubPostComponent';
import { getClubDetails, createClubPost } from '../Services/apiServiceAdmin';
import CreateClubPostComponent from './CreateClubPostComponent';
import { Button } from 'react-bootstrap'; // Assuming you are using React Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';


const ClubPageComponent = () => {
  const [club, setClub] = useState(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
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

  const handleCreatePost = async (postData) => {
    try {
      // Assume createClubPost is a function to send post data to backend
      await createClubPost(clubName, postData);
      setShowCreatePostModal(false);
      // Refresh club details after creating post
      fetchClubDetails();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleShowCreatePostModal = () => {
    setShowCreatePostModal(true);
  };

  const handleCloseCreatePostModal = () => {
    setShowCreatePostModal(false);
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
        <Button variant="primary" onClick={handleShowCreatePostModal} className="mb-3">
          Create Post
        </Button>
        {club.posts && club.posts.length > 0 ? (
          club.posts.map((post) => (
            <ClubPostComponent key={post.collegePostId} post={post} />
          ))
        ) : (
          <p className="no-posts">No posts available.</p>
        )}
      </div>
      <CreateClubPostComponent
        show={showCreatePostModal}
        handleClose={handleCloseCreatePostModal}
        handleCreatePost={handleCreatePost}
      />
    </div>
  );
};

export default ClubPageComponent;
