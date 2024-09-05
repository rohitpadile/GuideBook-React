import React, { useState, useEffect } from 'react';
import { fetchDiscussionTopics } from '../Services/discussionApiService';
import '../css/DiscussionListPageCss.css'; // Ensure this CSS file exists for styling

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

  if (loading) return <p className="discussionListPage-loading">Loading...</p>;
  if (error) return <p className="discussionListPage-error">{error}</p>;

  return (
    <div className="discussionListPage-container">
      <h1 className="discussionListPage-title">Discussion Topics</h1>
      <ul className="discussionListPage-list">
        {discussions.map(discussion => (
          <li key={discussion.discussionId} className="discussionListPage-listItem">
            <a href={`/discussion/${discussion.discussionId}`} className="discussionListPage-link">
              {discussion.discussionTitle}
            </a>
            <p>Creator: {discussion.discussionOwner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionListPage;
