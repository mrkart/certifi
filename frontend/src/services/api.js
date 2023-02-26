import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;