import axios from 'axios';
import auth from '../auth';
// const BASE_URL = 'https://guidebookx.com/api/v1/admin/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/admin/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/admin/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://localhost:8080/api/v1/admin/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/admin";
// const BASE_URL = "https://api.guidebookx.com/api/v1/admin/";
// const BASE_URL = "https://a.guidebookx.com/api/v1/admin/";
const BASE_URL = "http://13.235.131.222/api/v1/admin/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async (formData, token) => {
  try {
    const token = auth.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.post('/zoomSessionFormSubmit', formData, config);
    return response.data;
  } catch (error) {
    console.log("Error sending OTP:", error);
  }
};


export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post('/zoomSessionFormVerifyOTP', otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (formId) => {
  try {
    const response = await api.post('/zoomSessionFormResendOTP', { zoomSessionFormId: formId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bookSession = async (confirmationRequest) => {
  try {
    const response = await api.post('/zoomSessionFormSuccess', confirmationRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelZoomSession = async (payload) => {
  try {
    const response = await api.post('/cancelZoomSessionFromClient', payload);
    return response.data;
  } catch (error) {
    console.error('Error cancelling session:', error);
    throw error;
  }
};


export const checkCancellationStatus = async (formId) => {
  try {
    const response = await api.post('/cancelZoomSessionCheckStatus', { formId });
    return response.data;
  } catch (error) {
    console.error('Failed to check cancellation status:', error);
    return { status: 0 }; // Default to not cancelled if there's an error
  }
};

export const checkCancellationStatusViaTransactionId = async (transactionId) => {
  try {
    const response = await api.post('/cancelZoomSessionCheckStatusViaTransactionId', { zoomSessionTransactionId: transactionId });
    return response.data;
  } catch (error) {
    console.error('Failed to check cancellation status:', error);
     // Default to not cancelled if there's an error
  }
};


export const fetchFormDetails = async (formId) => {
  try {
    const response = await api.get(`/fetchZoomSessionVerifiedFormDetailsSecret/${formId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionStatusForFeedbackForm = async (transactionId) => {
  try {
    const response = await api.get(`/getSubmittionStatusForFeedbackForm/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching submission status:', error);
    throw error;
  }
};
export const confirmZoomSessionFromStudent = async (data) => {
  try {
    await api.post('/confirmZoomSessionFromStudent', data);
  } catch (error) {
    console.error('Error submitting availability:', error);
    throw error;
  }
};

export const submitZoomSessionFeedbackForm = async (data) => {
  try {
    await api.post('/submitZoomSessionFeedbackForm', data);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const getClientAccountDetails = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post('/getClientAccountDetailsForZoomSessionForm', {}, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching client account details:", error);
    throw new Error('Failed to fetch client account details');
  }
};



export default api;