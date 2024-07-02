import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/admin'; // Adjust the base URL as per your backend setup

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// College endpoints
export const getAllColleges = () => {
  return api.get('/colleges');
};

export const getFilteredStudentList = async (filters) => {
  try {
    const response = await api.post('/filteredStudentList', filters);
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    throw new Error(`Error fetching filtered student list: ${error.message}`);
  }
};

// Fetch all language names
export const getAllLanguageNames = async () => {
  try {
    const response = await api.get('/languages');
    return response.data.allLanguageNamesList || [];
  } catch (error) {
    console.error('Error fetching language names:', error);
    return [];
  }
};

// Fetch all student class types
export const getAllStudentClassTypes = async () => {
  try {
    const response = await api.get('/studentClassTypes');
    return response.data.allStudentClassTypeNamesList || [];
  } catch (error) {
    console.error('Error fetching student class types:', error);
    return [];
  }
};

// Fetch all branch names
export const getAllBranchNames = async () => {
  try {
    const response = await api.get('/branches');
    return response.data.allBranchNamesList || [];
  } catch (error) {
    console.error('Error fetching branch names:', error);
    return [];
  }
};

export default api;
