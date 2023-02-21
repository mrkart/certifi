import axios from 'axios';

const apiWithToken = axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  },
});

export default apiWithToken;