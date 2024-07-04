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
    return response.data; // Assuming response.data directly contains the list of FilteredStudentDetails
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

// Fetch all student category names
export const getAllStudentCategories = async () => {
  try {
    const response = await api.get('/studentCategory');
    return response.data.allStudentCategoryNamesList || [];
  } catch (error) {
    console.error('Error fetching student categories:', error);
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

// Fetch branches for a specific college
export const getBranchesForCollege = async (collegeName) => {
    try {
      const response = await api.post('/filteredBranches', { collegeName });
      return response.data.allBranchNamesForCollegeList || [];
    } catch (error) {
      console.error('Error fetching branch names for college:', error);
      return [];
    }
  };

// Fetch student profile by MIS number
export const getStudentProfile = async (studentMIS) => {
  try {
    const response = await api.get(`/studentProfile/${studentMIS}`);
    return response.data; // Assuming response.data contains the student profile object
  } catch (error) {
    console.error(`Error fetching student profile for MIS ${studentMIS}:`, error);
    return null;
  }
};


export default api;
