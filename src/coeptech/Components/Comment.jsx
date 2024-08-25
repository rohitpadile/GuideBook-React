// import React, { useState } from 'react';
// import '../css/CommentCss.css'
// const Comment = ({ comment, addReply }) => {
//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [replyText, setReplyText] = useState('');

//   const handleReply = () => {
//     addReply(comment.id, replyText);
//     setReplyText('');
//     setShowReplyBox(false);
//   };

//   return (
//     <div style={{ marginLeft: `${comment.depth * 20}px`, marginBottom: '15px' }}>
//       <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
//         <p>{comment.text}</p>
//         <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
//       </div>
//       {showReplyBox && (
//         <div style={{ marginTop: '10px', marginLeft: '20px' }}>
//           <textarea
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Write your reply..."
//           />
//           <br />
//           <button onClick={handleReply}>Submit Reply</button>
//         </div>
//       )}
//       {comment.replies.map((reply) => (
//         <Comment key={reply.id} comment={reply} addReply={addReply} />
//       ))}
//     </div>
//   );
// };

// export default Comment;
