// src/services/apiServiceAdmin.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

// College endpoints
export const addCollege = (college) => {
    return api.post('/addCollege', college);
};

export const updateCollege = (collegeId, collegeDetails) => {
    return api.put(`/updateCollege/${collegeId}`, collegeDetails);
};

export const deleteCollege = (collegeId) => {
    return api.delete(`/deleteCollege/${collegeId}`);
};

export const getAllColleges = () => {
    return api.get('/colleges');
};

export const getCollegeById = (collegeId) => {
    return api.get(`/colleges/${collegeId}`);
};

// Branch endpoints
export const getAllBranches = () => {
    return api.get('/branches');
};

export const addBranch = (branch) => {
    return api.post('/addBranch', branch);
};

export const updateBranch = (branchId, branchDetails) => {
    return api.put(`/updateBranch/${branchId}`, branchDetails);
};

export const deleteBranch = (branchId) => {
    return api.delete(`/deleteBranch/${branchId}`);
};

// Language endpoints
export const getAllLanguages = () => {
    return api.get('/languages');
};

export const addLanguage = (language) => {
    return api.post('/addLanguage', language);
};

export const updateLanguageById = (id, language) => {
    return api.put(`/updateLanguage/${id}`, language);
};

export const deleteLanguageById = (id) => {
    return api.delete(`/deleteLanguage/${id}`);
};

// Student endpoints
export const getAllStudents = () => {
    return api.get('/students');
};

export const getStudentById = (id) => {
    return api.get(`/students/${id}`);
};

export const addStudent = (student) => {
    return api.post('/addStudent', student);
};

export const updateStudent = (id, student) => {
    return api.put(`/updateStudent/${id}`, student);
};

export const deleteStudentById = (id) => {
    return api.delete(`/deleteStudent/${id}`);
};

// Add more admin API methods as needed
