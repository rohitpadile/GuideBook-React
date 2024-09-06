import axios from 'axios';
// const BASE_URL = 'https://guidebookx.com/api/v1/user/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/user/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/user/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://localhost:8080/api/v1/user/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/user";
// const BASE_URL = "https://api.guidebookx.com/api/v1/user/";
// const BASE_URL = "https://a.guidebookx.com/api/v1/user/";
const BASE_URL = "http://13.235.131.222/api/v1/user/";
// https://chatgpt.com/c/5d78c49f-e2be-44f4-8334-b033d2e06b60
// const BASE_URL = process.env.REACT_APP_BASE_URL; // for production purpose

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const paymentSuccessForZoomSession = async (paymentDetails, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post('paymentSuccessForZoomSession', paymentDetails, config);
    return response.data;
  } catch (error) {
    // console.error("Error sending payment success", error);
    throw error;
  }
};

export const createPaymentOrderZoomSession = async (sessionBooking, token) => {
  try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post('/createPaymentOrderZoomSession', sessionBooking, config);
      return response.data;
  } catch (error) {
      // console.error("Error creating order", error);
      throw error;
  }
};

export const verifyUserWithTransaction = async (transactionId, token) => {
  try {
    const response = await api.get(`/verifyUserWithTransaction/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Return the data from the response
      return response.data;  // This should include zoomSessionDurationInMin, zoomSessionBookStatus, and studentMentorName
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error verifying user with transaction:', error);
    return null;
  }
};

export const verifyUserWithZoomSessionFormId = async (zoomSessionFormId, token) => {
  try {
    const response = await api.get(`/verifyUserWithZoomSessionFormId/${zoomSessionFormId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
      return response.status === 200;
      
  } catch (error) {
    console.error('Error verifying user with zoomSessionFormId:', error);
    return null;
  }
};


export const paymentSuccessForEventBooking = async (paymentDetails, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post('/paymentSuccessForEventBooking', paymentDetails, config);
    return response.data;
  } catch (error) {
    // console.error("Error sending payment success", error);
    throw error;
  }
};

export const createPaymentOrderEventBooking = async (eventCode, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.get(`/createPaymentOrderEventBooking/${eventCode}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};


  export default api; 