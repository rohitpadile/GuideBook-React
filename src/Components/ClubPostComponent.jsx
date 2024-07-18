import React from 'react';

const ClubPostComponent = ({ post }) => {
  return (
    <div className="club-post">
      <div className="post-description">{post.collegeClubPostDescription}</div>
      <div className="post-media">
        {post.collegeClubPostMediaPaths.map((mediaPath, index) => (
          <img key={index} src={`/collegeClubPostsMedia/${mediaPath}`} alt={`Post ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ClubPostComponent;

