// userAccountApiService.js
import axios from 'axios';
// const BASE_URL = 'https://guidebookx.com/api/v1/user/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/user/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/user/'; // Ensure the URL has the trailing slash
const BASE_URL = 'http://localhost:8080/api/v1/user/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/user";
// const BASE_URL = "https://api.guidebookx.com/api/v1/user/";
// https://chatgpt.com/c/5d78c49f-e2be-44f4-8334-b033d2e06b60
// const BASE_URL = process.env.REACT_APP_BASE_URL; // for production purpose
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const createOrder = async (subscriptionOrder, token) => {
  try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post('createOrder', subscriptionOrder, config);
      return response.data;
  } catch (error) {
      console.error("Error creating order", error);
      throw error;
  }
};
export const getSubscriptionAmount = async (subscriptionPlan) => {
  try {
      const response = await api.post('getSubscriptionAmount', subscriptionPlan);
      return response.data; // Return the entire response data
  } catch (error) {
      console.error("Error getting subscription amount", error);
      throw error;
  }
};

export const activateSubscription = async (paymentDetails, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post('activateSubscription', paymentDetails, config);
    return response.data;
  } catch (error) {
    console.error("Error sending payment success", error);
    throw error;
  }
};


export const getAccountTypeAndProfileData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const accountTypeResponse = await api.post('checkUserEmailAccountType', {}, config);
      const { accountType } = accountTypeResponse.data;
  
      if (accountType === 1) {
        const studentResponse = await api.post('getStudentMentorProfileAccountDetails', {}, config);
        return { accountType: 'student', profileData: studentResponse.data };
      } else if (accountType === 2) {
        const clientResponse = await api.post('getClientProfileAccountDetails', {}, config);
        return { accountType: 'client', profileData: clientResponse.data };
      } else {
        return { accountType: 'none', profileData: null };
      }
    } catch (error) {
      console.error('Error fetching account type and profile data:', error);
      throw error;
    }
  };
  
  export const editProfileData = async (token, accountType, editData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const endpoint =
        accountType === 'student'
          ? 'editStudentMentorAccountDetails'
          : 'editClientAccountDetails';
  
      const response = await api.post(endpoint, editData, config);
  
      return response.status === 202;
    } catch (error) {
      console.error('Error editing profile data:', error);
      throw error;
    }
  };
  
  export const checkLoginStatus = async (token) => {
    try {
      const response = await api.get('check-login', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return response.status === 200;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  };
  
  export const logoutUser = async (token) => {
    try {
      await api.post('logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  export const loginUser = async (username, password) => {
    try {
      const response = await api.post('login', {
        username: username,
        password: password,
      });
  
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  export const sendOtpToSignupEmail = async (userEmail) => {
    try {
      const response = await api.post('sendOtpToSignupEmail', {
        userEmail: userEmail,
      });
      return response;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };
  
  export const verifySignupOtp = async (userEmail, signupOtp) => {
    try {
      const response = await api.post('verifySignupOtp', {
        userEmail: userEmail,
        signupOtp: signupOtp,
      });
      return response;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };
  
  export const signupUser = async (userEmail, password) => {
    try {
      const response = await api.post('signup', {
        username: userEmail,
        password: password,
      });
      return response;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  

  export default api;
