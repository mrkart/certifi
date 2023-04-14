import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAddress } from '../../actions/exampleAction';
import { getAuth, signOut } from 'firebase/auth';
import {auth} from '../../firebase-config';
import { getOrgName, getUsername, logoutUser } from '../../helpers/authData';

const ProfileArea = () => {

  let userName = getUsername()
  let userOrg = getOrgName();
  const [address, setAddress] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const walletaddress = useSelector(state => state.demoReducer.walletAddress);
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  var timeout;
  useEffect(() => {
    if (errorMessage && errorMessage !== '') {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setErrorMessage(false)
      }, 4000)
    }
  }, [errorMessage])
  useEffect(() => {
    if (successMessage && successMessage !== '') {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setSuccessMessage(false)
      }, 4000)
    }
  }, [successMessage])
  function logout() {
    signOut(getAuth()).then(() => {
      logoutUser()
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });



  }

  useEffect(() => {
    if (walletaddress && walletaddress !== null) {
      setAddress(walletaddress)
    }

  }, [walletaddress])
  useEffect(() => {
    dispatch(getWalletAddress())
  }, [])

  return (

    <div className='content-header mb-0'>
      {successMessage ? <div class="alert alert-success cf-alert text-center py-3 fade show fadein alert-top" role="alert">{successMessage}</div> : ''}
      {errorMessage ? <div class="alert alert-danger cf-alert text-center py-3 fade show fadein alert-top" role="alert">{errorMessage}</div> : ''}
      <div className='profile-area'>
        <div className='profile-cont'>
          <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
          <p className='mb-1 profilename'>{address}</p>
          <div className='userOrg'>
            <img src={require('../../assets/images/icons/college.png')} loading="lazy" />
            <h5 className='fw-bolder text-uppercase'>{userOrg}</h5>
          </div>
          {/* {address ? <p>{address}</p> : ''} */}
          {/* <p className='lastlogin mb-0'>Last Login: Jul-17-2022 | 10:00</p> */}
          {/* <p className='lastlogin mb-0'><button className="btn btn-light btn-sm text-primary" onClick={logout} ><i data-eva="log-out-outline"></i> Logout</button></p> */}
        </div>
        <div className="dropdown">
          <span
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <div className='profile-icon'>
              <img className='headerprofilepic' src={require('../../assets/images/photo10.png')} loading="lazy" />
            </div>
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item text-primary" href="#" onClick={logout}><i data-eva="log-out-outline"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </div>


  );
}

export default ProfileArea;
