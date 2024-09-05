import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiscussion } from '../Services/discussionApiService'; // Assuming this service handles API calls

const AddDiscussion = () => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addDiscussionRequest = { discussionTitle };
      await createDiscussion(addDiscussionRequest); // Call API service to add discussion
      navigate('/profile'); // Redirect back to the profile or wherever you want
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  return (
    <div className="add-discussion-container">
      <h2>Add New Discussion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="discussionTitle">Discussion Title</label>
          <input
            type="text"
            id="discussionTitle"
            value={discussionTitle}
            onChange={(e) => setDiscussionTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Discussion
        </button>
      </form>
    </div>
  );
};

export default AddDiscussion;
