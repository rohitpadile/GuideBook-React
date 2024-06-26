// src/services/apiServiceAdmin.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

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

// Add more admin API methods as needed
