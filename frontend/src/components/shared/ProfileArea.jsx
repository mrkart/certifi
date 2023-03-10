import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletAddress } from '../../actions/exampleAction';

const ProfileArea = () => {

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

  return (
    <div className='content-header mb-0'>
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