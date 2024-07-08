import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/admin'; // Adjust the base URL as per your backend setup

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch colleges for a specific exam
export const getCollegesForExam = async (examName) => {
  try {
    const response = await api.get(`/collegesForExam/${examName}`);
    return response.data.collegeNameList || [];
  } catch (error) {
    console.error(`Error fetching colleges for exam ${examName}:`, error);
    return [];
  }
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

// // Fetch student profile by MIS number
// export const getStudentProfile = async (studentMIS) => {
//   try {
//     const response = await api.get(`/studentProfile/${studentMIS}`);
//     return response.data; // Assuming response.data contains the student profile object
//   } catch (error) {
//     console.error(`Error fetching student profile for MIS ${studentMIS}:`, error);
//     return null;
//   }
// };

// //Fetch student basic details
// export const getStudentBasicDetails = async (studentMis) => {
//   try{
//     const response = await api.get(`/studentBasicDetails/${studentMis}`);
//     return response.data;
//   }catch(error){
//     console.error(`Error fetching student basic details for MIS ${studentMis}:`, error);
//     return null;
//   }
// }
// Fetch student profile by Work Email
export const getStudentProfile = async (studentWorkEmail) => {
  try {
    const response = await api.get(`/studentProfile/${studentWorkEmail}`);
    return response.data; // Assuming response.data contains the student profile object
  } catch (error) {
    console.error(`Error fetching student profile for Work Email ${studentWorkEmail}:`, error);
    return null;
  }
};

// Fetch student basic details by Work Email
export const getStudentBasicDetails = async (studentWorkEmail) => {
  try {
    const response = await api.get(`/studentBasicDetails/${studentWorkEmail}`);
    return response.data; // Assuming response.data contains the student basic details object
  } catch (error) {
    console.error(`Error fetching student basic details for Work Email ${studentWorkEmail}:`, error);
    return null;
  }
};


// Fetch entrance exams
export const getAllEntranceExams = async () => {
  try {
    const response = await api.get('/entranceExams');
    return response.data.entranceExamNameSet || [];
  } catch (error) {
    console.error('Error fetching entrance exams:', error);
    return [];
  }
};

export const signup = async (formData) => {
  try {
    const response = await api.post('/signup', formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error signing up: ${error.message}`);
  }
};

//TO FETCH THE DATA OF THE CURRENT LOGGED IN PROFILE - SAMPLE.

// - YOU NEED TO CHANGE CODE AFTER INTEGRATING SPRING SECURITY
//DONT KNOW WHAT DTO I AM GOING TO BE FETCHING, BUT IT WILL BE EASIER TO EDIT IT LATER

// Add this new method to fetch the profile data
// export const fetchCurrentProfile = async () => {
//   // Using a fake endpoint for now
//   const response = await axios.get(`${API_BASE_URL}/user/profile`);
//   return response.data;
// };
export default api;
