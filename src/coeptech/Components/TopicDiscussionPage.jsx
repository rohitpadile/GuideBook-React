import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import '../../css/coeptech/TopicDiscussionPageCss.css';

const TopicDiscussionPage = () => {
    const { topicId } = useParams(); // Extract topicId from URL params
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (topicId) {
            loadComments();
        }
    }, [topicId, page]);

    const loadComments = async () => {
        if (!topicId) {
            console.error("topicId is undefined");
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/coeptech/discussion/${topicId}/comments`, {
                params: { page }
            });
            setComments(prevComments => [...prevComments, ...response.data]);
        } catch (error) {
            console.error("Error fetching comments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewComment = async () => {
        if (!topicId || !newComment.trim()) {
            console.error("topicId is undefined or comment text is empty");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/coeptech/discussion/${topicId}/comments`, { text: newComment });
            setComments([response.data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    const handleReply = async (commentId, replyText, parentReplyId = null) => {
        if (!topicId || !replyText.trim()) {
            console.error("topicId is undefined or reply text is empty");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/coeptech/discussion/${topicId}/comments/${commentId}/replies`, {
                text: replyText,
                parentReplyId
            });

            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            replies: addReply(comment.replies, response.data, parentReplyId)
                        }
                        : comment
                )
            );
        } catch (error) {
            console.error("Error posting reply", error);
        }
    };

    const addReply = (replies, newReply, parentReplyId) => {
        if (parentReplyId === null) {
            return [...replies, newReply];
        }

        return replies.map(reply =>
            reply.id === parentReplyId
                ? {
                    ...reply,
                    replies: [...(reply.replies || []), newReply]
                }
                : {
                    ...reply,
                    replies: reply.replies ? addReply(reply.replies, newReply, parentReplyId) : []
                }
        );
    };

    return (
        <div className="discussion-container">
            <h1>Discussion on Topic {topicId}</h1>
            <div className="comment-box">
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleNewComment}>Post Comment</button>
            </div>
            <div className="comments-section">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                        <div>
                            {renderReplies(comment.replies, comment.id)}
                        </div>
                        <input
                            type="text"
                            placeholder="Reply..."
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleReply(comment.id, e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
            {loading && <p className="loading-more">Loading more comments...</p>}
            <button className="load-more-btn" onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
    );

    function renderReplies(replies = [], commentId) {
        return replies.map(reply => (
            <div key={reply.id} className="reply">
                <p>↳ {reply.text}</p>
                {reply.replies && renderReplies(reply.replies, commentId)}
                <input
                    type="text"
                    placeholder="Reply..."
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleReply(commentId, e.target.value, reply.id);
                            e.target.value = '';
                        }
                    }}
                />
            </div>
        ));
    }
};

export default TopicDiscussionPage;
