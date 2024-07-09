import React from 'react';

const ClubPostComponent = ({ post }) => {
  return (
    <div className="club-post">
      <div className="post-description">{post.collegePostDescription}</div>
      <div className="post-media">
        {post.collegePostMediaPaths.map((mediaPath, index) => (
          <img key={index} src={`/collegePostPhotos/${mediaPath}`} alt={`Post ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ClubPostComponent;
