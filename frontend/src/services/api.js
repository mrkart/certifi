import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiAsBlob = axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'blob',
});

export default api;