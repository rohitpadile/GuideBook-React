import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments, addComment, getDiscussionDetails } from '../Services/discussionApiService';
import { getUserEmail } from '../Services/userAccountApiService';
import '../css/DiscussionPageCss.css';

const DiscussionPage = () => {
  const { id: discussionId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [discussionTitle, setDiscussionTitle] = useState('');

  useEffect(() => {
    fetchUserEmail();
    fetchCommentsForDiscussion();
    fetchDiscussionDetails();
  }, [discussionId]);

  const fetchCommentsForDiscussion = async () => {
    try {
      const response = await fetchComments(discussionId);
      setComments(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchDiscussionDetails = async () => {
    try {
      const response = await getDiscussionDetails(discussionId);
      setDiscussionTitle(response.discussionTitle);
    } catch (error) {
      console.error('Error fetching discussion details:', error);
    }
  };

  const fetchUserEmail = async () => {
    try {
      const response = await getUserEmail();
      setUsername(response.userEmail);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await addComment(discussionId, newComment);
      setComments([response, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const renderCommentText = (text) => {
    // Regex to find URLs in the text
    const urlRegex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[-A-Z0-9+&@#\/%=~_|$])/ig;
    
    // Replace URLs with anchor tags
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  return (
    <div className="discussionPage-container">
      <h2 className="discussionPage-title">{discussionTitle}</h2>

      <div className="discussionPage-commentForm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="discussionPage-textarea"
        />
        <button onClick={handleAddComment} className="discussionPage-submitButton">Submit</button>
      </div>

      <div className="discussionPage-commentsSection">
        {comments.map((comment) => (
          <div key={comment.commentId} className="discussionPage-comment">
            <p className="discussionPage-commentUsername"><strong>{comment.userName}</strong></p>
            <p
              className="discussionPage-commentText"
              dangerouslySetInnerHTML={{ __html: renderCommentText(comment.text) }}
            />
            <p className="discussionPage-timestamp">{new Date(comment.createdOn).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionPage;
