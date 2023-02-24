import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidemenu = () => {
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let userName = userprofile && userprofile.name;
  let userOrg = userprofile && userprofile.organistaions[0]?.name;
  console.log(userName);
  console.log(userOrg);
  const [selectType, setSelectType] = "1"
  const [address,setAddress] = useState('')

  const onChangeValue = () => { }
  const walletaddress = useSelector(state => state.demoReducer.walletAddress);

  useEffect(() => {
    if(walletaddress && walletaddress !== null){
      setAddress(walletaddress)
    }
    
  },[walletaddress])
  return (
    <nav id="sidebarMenu" className="collapse sidebar collapse pt-0 ">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-3 text-start sidemenupanel">
          <a className="navbar-brand" href="/">
            <img
              src={require('../../assets/images/logo.png')}
              alt="certifily Logo"
              loading="lazy"
              className='sidebarlogo mb-3'
            />
          </a>
          <div className='mobileprofile'>
            <div className='profile-area'>
              <div className='profile-icon'>
                <img className='headerprofilepic' src={require('../../assets/images/photo10.png')} loading="lazy" />
              </div>
              <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
              <p className='mb-1 profilename'>{address}</p>

            </div>
          </div>
          {/* <div data-mdb-toggle="collapse"
                  data-mdb-target="#sidebarMenu"
                  aria-controls="sidebarMenu"
                  aria-expanded="false"> */}
          <NavLink to="/" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active"
          >
            <div className='sidebaricons'>
              <img
                src={require('../../assets/images/icons/airplay.png')}
                className=''
              />
            </div>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/students" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
          <div className='sidebaricons'>
              <img
                src={require('../../assets/images/icons/users.png')}
                className=''
              />
            </div>            
            <span>Students</span>
          </NavLink>
          {/* <NavLink to="/students-import" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/users-import.png')}
              className='sidebaricons me-3'
            />
            <span>Students Import</span>
          </NavLink> */}
          {/* <NavLink to="/select-template" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/file-text.png')}
              className='sidebaricons me-3'
            />
            <span>Select Template</span>
          </NavLink>
          <NavLink to="/customize-template" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/file-edit.png')}
              className='sidebaricons me-3'
            />
            <span>Customize Template</span>
          </NavLink> */}
          <NavLink to="/issue-certificate" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">            
          <div className='sidebaricons'>
              <img
                src={require('../../assets/images/icons/award.png')}
                className=''
              />
            </div>                 
            <span>Issue Certificate</span>
          </NavLink>
          {/* <NavLink to="/signer" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/edit-3.png')}
              className='sidebaricons me-3'
            />
            <span>Signers</span>
          </NavLink> */}


          <NavLink to="/login" className="list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis" activeClassName="active">
            
          <div className='sidebaricons'>
              <img
                src={require('../../assets/images/icons/log-out-outline.png')}
                className=''
              />
            </div>             
            <span>Logout</span>
          </NavLink>

          {/* <a href="#" data-mdb-ripple-color="#44c6e3" className="list-group-item list-group-item-action px-3 py-2 ripple text-uppercase">
            <img
              src={require('../../assets/images/icons/settings.png')}
              className='sidebaricons me-3'
            />
            <span>Settings</span>
          </a>
          <a href="#" data-mdb-ripple-color="#44c6e3" className="list-group-item list-group-item-action px-3 py-2 ripple text-uppercase">
            <img
              src={require('../../assets/images/icons/user.png')}
              className='sidebaricons me-3'
            />
            <span>Accounts</span>
          </a> */}
          {/* </div> */}
        </div>
      </div>
      <div className="sidebarbottom light-blur text-center">
        <p className='mt-0 mb-1'> Blockchain network status</p>
        <select className="form-control mb-1" value={selectType} onChange={onChangeValue}>
          <option value="1">Testnet</option>
          <option value="2">Mainnet</option>
        </select>

        <p className=' mb-0 text-uppercase fw-bolder networkstatus text-success'>Online</p>
      </div>
    </nav>
  );
}

export default Sidemenu;