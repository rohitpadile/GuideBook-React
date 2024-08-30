import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/coeptech/TopicDiscussionPageCss.css';

const TopicDiscussionPage = () => {
    const { topicId } = useParams(); // Extract topicId from URL params
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const loadComments = useCallback(async () => {
        const parsedTopicId = parseInt(topicId, 10); // Ensure topicId is treated as a number
        if (isNaN(parsedTopicId)) {
            console.error("Invalid topicId");
            return;
        }
        console.log("topic id: " + topicId);

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/coeptech/discussion/${parsedTopicId}/comments`, {
                params: { page }
            });
            setComments(prevComments => [...prevComments, ...response.data.content]);
        } catch (error) {
            console.error("Error fetching comments", error);
        } finally {
            setLoading(false);
        }
    }, [topicId, page]);

    useEffect(() => {
        loadComments();
    }, [topicId, page, loadComments]);

    const handleNewComment = async () => {
        const parsedTopicId = parseInt(topicId, 10);
        if (isNaN(parsedTopicId) || !newComment.trim()) {
            console.error("Invalid topicId or comment text is empty");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/coeptech/discussion/${parsedTopicId}/comments`, { text: newComment });
            setComments([response.data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    const handleReply = async (commentId, replyText, parentReplyId = null) => {
        const parsedTopicId = parseInt(topicId, 10);
        if (isNaN(parsedTopicId) || !replyText.trim()) {
            console.error("Invalid topicId or reply text is empty");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/coeptech/discussion/${parsedTopicId}/comments/${commentId}/replies`, {
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
        <div className="topic-discussion-container">
            <h1>Discussion on Topic {topicId}</h1>
            <div className="topic-discussion-comment-box">
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button className="topic-discussion-post-btn" onClick={handleNewComment}>Post Comment</button>
            </div>
            <div className="topic-discussion-comments-section">
                {comments.map(comment => (
                    <div key={comment.id} className="topic-discussion-comment">
                        <p>{comment.text}</p>
                        <div>
                            {renderReplies(comment.replies, comment.id)}
                        </div>
                        <div className="topic-discussion-reply-box">
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
                            <button className="topic-discussion-reply-btn" onClick={() => handleReply(comment.id, newComment)}>Save Reply</button>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <p className="topic-discussion-loading-more">Loading more comments...</p>}
            <button className="topic-discussion-load-more-btn" onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
    );

    function renderReplies(replies = [], commentId) {
        return replies.map(reply => (
            <div key={reply.id} className="topic-discussion-reply">
                <p>↳ {reply.text}</p>
                {reply.replies && renderReplies(reply.replies, commentId)}
                <div className="topic-discussion-reply-box">
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
                    <button className="topic-discussion-reply-btn" onClick={() => handleReply(commentId, newComment, reply.id)}>Save Reply</button>
                </div>
            </div>
        ));
    }
};

export default TopicDiscussionPage;
