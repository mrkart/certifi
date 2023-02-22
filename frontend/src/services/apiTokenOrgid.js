import axios from 'axios';

const apiTokenOrgid = (token,orgID) => axios.create({
  baseURL: 'https://api.certifi.ly/',
  headers: {
    'Content-Type': `application/json`,
    'Authorization': `Bearer ${token}`,
    'cerfi-org-id': orgID,
  },
});

export default apiTokenOrgid;