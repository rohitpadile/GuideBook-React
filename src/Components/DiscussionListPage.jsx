import React, { useState, useEffect } from 'react';
import { fetchDiscussionTopics } from '../Services/discussionApiService';
import '../css/DiscussionListPageCss.css'; // Importing the updated CSS

const DiscussionListPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDiscussionTopics = async () => {
      try {
        const response = await fetchDiscussionTopics();
        setDiscussions(response);
      } catch (error) {
        setError('Failed to load discussions');
      } finally {
        setLoading(false);
      }
    };

    getDiscussionTopics();
  }, []);

  if (loading) return <p className="discussionListPage-loading">Loading discussions...</p>;
  if (error) return <p className="discussionListPage-error">{error}</p>;

  return (
    <div className="discussionListPage-container">
      <h1 className="discussionListPage-title">Discussion Hub</h1>
      <button className="discussionListPage-button" onClick={() => window.location.href='/addDiscussion'}>
        Start a New Discussion
      </button>
      <ul className="discussionListPage-list">
        {discussions.map(discussion => (
          <li key={discussion.discussionId} className="discussionListPage-listItem">
            <div>
              <a href={`/discussion/${discussion.discussionId}`} className="discussionListPage-link">
                {discussion.discussionTitle}
              </a>
              <p className="discussionListPage-creator">Created by: {discussion.discussionOwner}</p>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default DiscussionListPage;
