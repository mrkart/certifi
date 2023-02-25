import api from '../services/api';
import apiTokenOrgid, { apiTokenWithBlob } from '../services/apiTokenOrgid';
import apiWithToken from '../services/apiWithToken';
import { getUserAddress } from '../utils/utils';

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
        dispatch({ type: 'POST_LOGIN_FAILURE', payload: error && error.message && error.response.data.message });
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
        dispatch({ type: 'GET_USERPROFILE_FAILURE', payload: error && error.message && error.response.data.message });
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
        dispatch({ type: 'POST_CREATESTUDENT_FAILURE', payload: error && error.message && error.response.data.message });
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

// Get all certificate issued to user
export const getUserCertList = (orgID,userID) => { 
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).get(`/api/users/${userID}/certificate`)
      .then((response) => {
        dispatch({ type: 'GET_USERCERTLIST_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'GET_USERCERTLIST_FAILURE', payload: error });
      });
  };
};

export const resetLoginInfo = () => {
   return dispatch => {
      dispatch({type : 'POST_LOGIN_SUCCESS',payload : []})
}}
export const resetUserbyid = () => {
  return dispatch => {
     dispatch({type : 'GET_USERBYID_SUCCESS',payload : []})
}}
export const resetEdituser = () => {
  return dispatch => {
     dispatch({type : 'PUT_EDITUSERDETAILS_SUCCESS',payload : []})
}}
export const resetUserProfile = () => {
  return dispatch => {
     dispatch({type : 'GET_USERPROFILE_SUCCESS',payload : []})
}}
export const resetUserProfileFailed = () => {
  return dispatch => {
     dispatch({type : 'GET_USERPROFILE_FAILURE',payload : ''})
}}
export const resetLoginInfoFailed = () => {
  return dispatch => {
     dispatch({type : 'POST_LOGIN_FAILURE',payload : ''})
}}
export const resetAddStudent = () => {
  return dispatch => {
     dispatch({type : 'POST_CREATESTUDENT_SUCCESS',payload : []})
  }
}
export const resetAddStudentFailed = () => {
  return dispatch => {
     dispatch({type : 'POST_CREATESTUDENT_FAILURE',payload : ''})
  }
}

export const showInfoModal = () => {
  return dispatch => {
     dispatch({type : 'SHOW_MODAL',payload : true})
}}
export const closeInfoModal = () => {
  return dispatch => {
     dispatch({type : 'CLOSE_MODAL',payload : false})
}}
export const getWalletAddress = () => {

  return dispatch => {
      getUserAddress().then(res => {
          if(res && res !== null){
              dispatch({type : 'GET_WALLET_ADDRESS',payload : res})
          }else{
              dispatch({type : 'GET_WALLET_ADDRESS_FAILURE',payload : null})
          }
      },error => {
          dispatch({typs : 'GET_WALLET_ADDRESS_FAILURE',payload : error})
      })

     
  }
}
export const mintCertificate = (orgID, userID, data) => {
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).post(`/api/users/${userID}/mint`, data)
      .then((response) => {
        dispatch({ type: 'MINT_CERTIFICATE', payload: response.data  });
      })
      .catch((error) => {
        dispatch({ type: 'MINT_CERTIFICATE_FAILURE', payload: error && error.message });
      });
  };
}
export const resetMintCertificate = () => {
  return dispatch => {
     dispatch({type : 'MINT_CERTIFICATE',payload : []})
}}
export const resetMintCertificateFailed = () => {
  return dispatch => {
     dispatch({type : 'MINT_CERTIFICATE_FAILURE',payload : []})
}}
export const resetGenerateCertificate = () => {
  return dispatch => {
     dispatch({type : 'GENERATE_CERTIFICATE_SUCCESS',payload : []})
}}

// Recent certificate
export const getRecentCertificate = (orgID) => {
  return (dispatch) => {
    apiTokenOrgid(localStorage.getItem('accessToken'),orgID).get(`/api/certificates/recent`)
      .then((response) => {
        dispatch({ type: 'POST_RECENTCERTIFICATE_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'POST_RECENTCERTIFICATE_FAILURE', payload: error && error.message && error.response.data.message });
      });
  };
};