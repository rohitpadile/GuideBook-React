// import React, { useState } from 'react';
// import Comment from './Comment'; // Import Comment Component
// import '../css/DiscussionPageCss.css';
// const DiscussionPage = () => {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       text: 'This is the first comment!',
//       replies: [],
//       depth: 0,
//     },
//   ]);
//   const [newCommentText, setNewCommentText] = useState('');

//   const addComment = () => {
//     setComments([
//       ...comments,
//       {
//         id: comments.length + 1,
//         text: newCommentText,
//         replies: [],
//         depth: 0,
//       },
//     ]);
//     setNewCommentText('');
//   };

//   const addReply = (parentId, replyText) => {
//     const addReplyRecursive = (commentsList) =>
//       commentsList.map((comment) => {
//         if (comment.id === parentId) {
//           return {
//             ...comment,
//             replies: [
//               ...comment.replies,
//               {
//                 id: comments.length + Math.random(),
//                 text: replyText,
//                 replies: [],
//                 depth: comment.depth + 1,
//               },
//             ],
//           };
//         } else if (comment.replies.length > 0) {
//           return {
//             ...comment,
//             replies: addReplyRecursive(comment.replies),
//           };
//         } else {
//           return comment;
//         }
//       });

//     setComments(addReplyRecursive(comments));
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//       <h1>Discussion Page - [Subject Title]</h1>
//       <div>
//         <textarea
//           value={newCommentText}
//           onChange={(e) => setNewCommentText(e.target.value)}
//           placeholder="Write your comment..."
//         />
//         <br />
//         <button onClick={addComment}>Submit Comment</button>
//       </div>
//       <div>
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} addReply={addReply} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiscussionPage;
