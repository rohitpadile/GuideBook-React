import axios from 'axios';
// const BASE_URL = 'https://guidebookx.com/api/v1/teamRecruiter/';
// const BASE_URL = 'https://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/teamRecruiter/'; // Ensure the URL has the trailing slash
// const BASE_URL = 'http://guidebookX-alb-1586257955.ap-south-1.elb.amazonaws.com/api/v1/teamRecruiter/'; // Ensure the URL has the trailing slash
const BASE_URL = 'http://localhost:8080/api/v1/user/'; // Ensure the URL has the trailing slash
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

  export default api; 