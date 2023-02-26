import { React, useEffect, useMyCustomStuff, useState } from 'react';
import Sidemenu from '../components/shared/Sidemenu';
import * as eva from 'eva-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { mainRoles,userRoles } from '../components/shared/Roles';
import { getUserAddress } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAddress } from '../actions/exampleAction';

const Admin = ({ subElement }) => {

  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let userName = userprofile && userprofile.name;
  let userOrg = userprofile && userprofile.organistaions[0]?.name;
  let userRole = userprofile && userprofile.roles && userprofile.roles[0]?.name
  const [address,setAddress] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const walletaddress = useSelector(state => state.demoReducer.walletAddress);


  function logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userprofile');
    localStorage.removeItem('certInfo');
    localStorage.removeItem('user_email');
    localStorage.removeItem('selectedStudent');
    navigate("/login");
  }
  
  useEffect(() => {
    if(walletaddress && walletaddress !== null){
      setAddress(walletaddress)
    }
    
  },[walletaddress])
  useEffect(() => {
    dispatch(getWalletAddress())
  },[])
  useEffect(() => { eva.replace() });
  return (
    ((mainRoles.includes(userRole)) ? <div className='container-fluid ptb15 h100vh'>
      <div className='backgroundblur commonbox'>
        <header>
          <Sidemenu />
          <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top navbar-toggler mobile-header">
            <div className='mobnav'>
              <div className='logo'>
                <a className="navbar-brand" href="#">
                  <img
                    src={require('../assets/images/icons/Certifily-icon.png')}
                    alt="certifily Logo"
                    loading="lazy"
                    className='sidebarlogo'
                  />
                </a>
              </div>
              <div className='cmpname'>
                <h5 className='fw-bolder text-uppercase'>{userOrg}</h5>
              </div>
              <div className='navtoggle text-end'>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#sidebarMenu"
                  aria-controls="sidebarMenu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className='bars'></span>
                  <span className='bars'></span>
                  <span className='bars'></span>
                </button>
              </div>
            </div>


          </nav>
        </header>
        <main className="height100per">
          <div className="container-fluid height100per pt-3 ps-4">
            <div className='content-header'>
              <div className='row align-items-center'>
                <div className='col-6 text-start'>
                  
                </div>
                <div className='col-6 text-end'>
                  <div className='profile-area'>
                    <div className='profile-cont'>
                      <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
                      <p className='mb-1 profilename'>{address}</p>
                      <div className='userOrg'>
                        <img src={require('../assets/images/icons/college.png')} loading="lazy" />
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
                      <img className='headerprofilepic' src={require('../assets/images/photo10.png')} loading="lazy" />
                    </div>
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a className="dropdown-item text-primary" href="#"><i data-eva="log-out-outline"></i> Logout</a></li>
                    </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {subElement}
          </div>
        </main>
      </div>
    </div> : userRoles.includes(userRole) ? <Navigate to="/dashboard" /> : <Navigate to="/login" />)
  );
}

export default Admin;