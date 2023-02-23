import api from '../services/api';
import apiTokenOrgid, { apiTokenWithBlob } from '../services/apiTokenOrgid';
import apiWithToken from '../services/apiWithToken';

export const getSampleAPI = () => {
  return (dispatch) => {
    api.get(`/`)
      .then((response) => {
        dispatch({ type: 'GET_SAMPLEAPI_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_SAMPLEAPI_FAILURE', payload: error });
      });
  };
};

// Sign in
export const postSignIn = (data) => {
  return (dispatch) => {
    api.post('/api/users/auth/sign-in', data)
      .then((response) => {
        localStorage.setItem('accessToken',response.data.data.accessToken);
        dispatch({ type: 'POST_LOGIN_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'POST_LOGIN_FAILURE', payload: error });
      });
  };
};

// Get user profile
export const getUserProfile = () => { 
  return (dispatch) => {
    apiWithToken(localStorage.getItem('accessToken')).get(`/api/users/profile/self`)
      .then((response) => {
        dispatch({ type: 'GET_USERPROFILE_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERPROFILE_FAILURE', payload: error });
      });
  };
};

// Create user
export const postCreateStudent = (data,orgID) => { 
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).post(`/api/users`, data)
      .then((response) => {
        dispatch({ type: 'POST_CREATESTUDENT_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'POST_CREATESTUDENT_FAILURE', payload: error });
      });
  };
};

// Get all user
export const getUserList = (orgID) => { 
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).get(`/api/users`)
      .then((response) => {
        dispatch({ type: 'GET_USERLIST_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERLIST_FAILURE', payload: error });
      });
  };
};

// Get user by id
export const getUserByID = (orgID,userID) => { 
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).get(`/api/users/${userID}`)
      .then((response) => {
        dispatch({ type: 'GET_USERBYID_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERBYID_FAILURE', payload: error });
      });
  };
};

// Edit user by id
export const putUserDetails = (data,orgID,userID) => { 
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).put(`/api/users/${userID}`,data)
      .then((response) => {
        dispatch({ type: 'PUT_EDITUSERDETAILS_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'PUT_EDITUSERDETAILS_FAILURE', payload: error });
      });
  };
};

export const generateCertificate = (orgID, userID, data) => {
  return (dispatch) => {
    apiTokenWithBlob(localStorage.getItem('accessToken'),orgID).post(`/api/users/${userID}/certificate`, data)
      .then((response) => {
        dispatch({ type: 'GENERATE_CERTIFICATE_SUCCESS', payload: response });
      })
      .catch((error) => {
        dispatch({ type: 'GENERATE_CERTIFICATE_FAILED', payload: error });
      });
  };
}