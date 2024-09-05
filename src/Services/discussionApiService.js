import axios from 'axios';
import auth from '../auth';
// const BASE_URL = 'https://guidebookx.com/api/v1/discuss/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/discuss/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/discuss/'; // Ensure the URL has the trailing slash
const BASE_URL = 'http://localhost:8080/api/v1/discuss/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/discuss";
// const BASE_URL = "https://api.guidebookx.com/api/v1/discuss/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Fetch comments for a specific discussion
export const fetchComments = async (discussionId) => {
    try {
      const response = await api.get(`/${discussionId}/comments`);
      return response.data; // Ensure this matches your API response structure
    } catch (error) {
      throw error;
    }
  };
  

// Add a new comment to the discussion
export const addComment = async (discussionId, text) => {
  try {
    const token = auth.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    const response = await api.post(`/addComment?discussionId=${discussionId}`, 
      {
        text
      }, 
      config // Include the token in the request headers
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiscussionDetails = async (discussionId) => {
  try {
    const response = await api.get(`/getDiscussionDetails?discussionId=${discussionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const fetchDiscussionTopics = async () => {
  try {
    const response = await api.get('/getDiscussionList'); // Ensure this endpoint is correct
    return response.data;
  } catch (error) {
    console.error('Error fetching discussion topics:', error);
    throw error;
  }
};
// export const deleteComment = async (commentId) => {
//   try {
//     const response = await fetch(`/deleteComment/${commentId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete comment');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     throw error;
//   }
// };

export default api;