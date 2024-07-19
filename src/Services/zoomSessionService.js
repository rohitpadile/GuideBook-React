import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/admin/'; // Ensure the URL has the trailing slash

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Send OTP to the client's email and phone number
export const sendOtp = async (otpData) => {
  try {
    const response = await api.post('/zoomSessionFormSubmit', otpData);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Verify the OTP entered by the client
export const verifyOtp = async (otpVerifyData) => {
  try {
    const response = await api.post('/zoomSessionFormVerifyOTP', otpVerifyData);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Resend OTP to the client's email and phone number
export const resendOtp = async (otpData) => {
  try {
    const response = await api.post('/zoomSessionFormResendOTP', otpData);
    return response.data;
  } catch (error) {
    console.error('Error resending OTP:', error);
    throw error;
  }
};

// Submit the Zoom session booking form
export const submitZoomSessionForm = async (formData) => {
  try {
    const response = await api.post('/zoomSessionFormSubmit', formData);  
    return response.data;
  } catch (error) {
    console.error('Error submitting the Zoom session form:', error);
    throw error;
  }
};

