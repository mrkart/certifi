import api from '../services/api';
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

export const getUserProfile = () => { 
  return (dispatch) => {
    apiWithToken.get(`/api/users/profile/self`)
      .then((response) => {
        dispatch({ type: 'GET_USERPROFILE_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERPROFILE_FAILURE', payload: error });
      });
  };
};
