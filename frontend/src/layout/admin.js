import { React, useEffect, useMyCustomStuff, useState } from 'react';
import Sidemenu from '../components/shared/Sidemenu';
import * as eva from 'eva-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { mainRoles,userRoles } from '../components/shared/Roles';
import { getUserAddress } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
// import { getWalletAddress } from '../actions/exampleAction';
import ProfileArea from '../components/shared/ProfileArea';

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
  
  // useEffect(() => {
  //   if(walletaddress && walletaddress !== null){
  //     setAddress(walletaddress)
  //   }
  // },[walletaddress])

  useEffect(() => {
    // dispatch(getWalletAddress())
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
          {/* <ProfileArea/>           */}
            {subElement}
          </div>
        </main>
      </div>
    </div> : userRoles.includes(userRole) ? <Navigate to="/dashboard" /> : <Navigate to="/login" />)
  );
}

export default Admin;