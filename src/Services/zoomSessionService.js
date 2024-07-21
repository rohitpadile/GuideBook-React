import axios from 'axios';
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/admin/';
const BASE_URL = 'http://localhost:8080/api/v1/admin/';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async (formData) => {
  try {
    const response = await api.post('/zoomSessionFormSubmit', formData);
    return response.data;
  } catch (error) {
    throw error;
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


export const fetchFormDetails = async (formId) => {
  try {
    const response = await api.get(`/fetchZoomSessionVerifiedFormDetailsSecret/${formId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;