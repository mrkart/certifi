import axios from 'axios';

const apiWithToken = (token) => axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': `application/json`,
    'Authorization': `Bearer ${token}`
  },
});

export default apiWithToken;