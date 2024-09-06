import axios from 'axios';
import auth from '../auth';
// const BASE_URL = 'https://guidebookx.com/api/v1/meethost/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/meethost/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/meethost/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://localhost:8080/api/v1/meethost/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/meethost";
const BASE_URL = "https://api.guidebookx.com/api/v1/meethost/";
// const BASE_URL = "https://a.guidebookx.com/api/v1/meethost/";
// const BASE_URL = "https://13.235.131.222/api/v1/meethost/";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Fetch active events for the home page
export const fetchHomePageEvents = async () => {
    try {
      const response = await api.get('/getHomePageEventList');
      return response.data.activeEventCodeList; // Adjust based on your response structure
    } catch (error) {
      throw error;
    }
  };

  export const fetchEventDetails = async (eventCode) => {
    try {
      const response = await api.get(`/getEventDetails/${eventCode}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const checkIfEventBookedByUser = async (eventCode, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await api.get(`/checkIfEventBookedByUser/${eventCode}`, config);
      return response.data.isBooked;
    } catch (error) {
      throw error;
    }
  };

  export const getUserBookedTickets = async () => {
    try {
        const token = auth.getToken();
        const response = await api.get('/getUserBookedTickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching open tickets:', error);
        return [];
    }
};
  

export default api;

