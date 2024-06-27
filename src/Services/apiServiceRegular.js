// src/services/apiServiceRegular.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getColleges = () => {
    return api.get('/colleges');
};

// Add more regular user API methods as needed