import axios from 'axios';
// const BASE_URL = 'https://guidebookx.com/api/v1/teamRecruiter/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/teamRecruiter/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/teamRecruiter/'; // Ensure the URL has the trailing slash
const BASE_URL = 'http://localhost:8080/api/v1/teamRecruiter/'; // Ensure the URL has the trailing slash
// const BASE_URL = "https://www.guidebookx.com/api/v1/teamRecruiter";
// const BASE_URL = "https://api.guidebookx.com/api/v1/teamRecruiter/";
// https://chatgpt.com/c/5d78c49f-e2be-44f4-8334-b033d2e06b60
// const BASE_URL = process.env.REACT_APP_BASE_URL; // for production purpose

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addStudent = async (studentDetails) => {
    try {
      const response = await api.post('/addStudent', studentDetails);
      return response.data; // Assuming response.data contains any required data
    } catch (error) {
      throw new Error(`Error adding student: ${error.message}`);
    }
  };
  
  export const getAllBranches = async () => {
    try {
      const response = await api.get('/getAllBranches');
      return response.data.allBranches;
    } catch (error) {
      throw new Error(`Error fetching branches: ${error.message}`);
    }
  };
  
  export const getAllColleges = async () => {
    try {
      const response = await api.get('/getAllColleges');
      return response.data.allCollegeNames;
    } catch (error) {
      throw new Error(`Error fetching colleges: ${error.message}`);
    }
  };
  
  export const getAllLanguages = async () => {
    try {
      const response = await api.get('/getAllLanguages');
      return response.data.allLanguageNamesList;
    } catch (error) {
      throw new Error(`Error fetching languages: ${error.message}`);
    }
  };
  
  export const getAllStudentCategories = async () => {
    try {
      const response = await api.get('/getAllStudentCategory');
      return response.data.allStudentCategoryNamesList;
    } catch (error) {
      throw new Error(`Error fetching student categories: ${error.message}`);
    }
  };
  
  export const getAllStudentClassTypes = async () => {
    try {
      const response = await api.get('/getAllStudentClassTypes');
      return response.data.allStudentClassTypeNamesList;
    } catch (error) {
      throw new Error(`Error fetching student class types: ${error.message}`);
    }
  };

export const getStudentBasicDetails = async (workEmail) => {
  try {
    const response = await api.get(`/studentBasicDetails/${workEmail}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (studentDetails) => {
  try {
    const response = await api.post('/updateStudent', studentDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
  

  export const deactivateStudent = async (studentDetails) => {
    try {
      const response = await api.post('/deactivateStudent', studentDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const activateStudent = async (studentDetails) => {
    try {
      const response = await api.post('/activateStudent', studentDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const trLogin = async (loginRequest) => {
    try {
      const response = await api.post('/loginTRUser', loginRequest);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  export default api; 