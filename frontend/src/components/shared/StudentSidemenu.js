import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';


const StudentSidemenu = () => {
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let userName = userprofile.name;
  let userOrg = userprofile.organistaions[0]?.name;
  let userFlowAddress = userprofile && userprofile.flowAddress;
  let show = '';
  console.log(userName);
  console.log(userOrg);
  const [selectType, setSelectType] = "1"
  const onChangeValue = () => { }

  
  return (
    <nav id="sidebarMenu" className='collapse sidebar pt-0 '>      
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-2 mt-3 text-start sidemenupanel">
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
              <p className='mb-0 profilename mt-3'>{userFlowAddress}</p>
            </div>
          </div>
          <div className="accordion accordion-borderless" id="accordionFlushExampleX">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOneX1">
                <div  data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOneX1" aria-expanded="true" aria-controls="flush-collapseOneX1">
                <NavLink to="/dashboard" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                  <div className='sidebaricons'>
                  <img
                    src={require('../../assets/images/icons/airplay.png')}
                    className=''
                  />
                  </div>
                  <span>Dashboard</span>
                </NavLink>
                </div>
              </h2>
              <div id="flush-collapseOneX1" className="accordion-collapse collapse show" aria-labelledby="flush-collapseOneX1" data-mdb-parent="#accordionFlushExampleX"></div>
            </div>



            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOneX">
                <button className="list-group-item list-group-item-action text-uppercase accordion-button" type="button" data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseOneX" aria-expanded="fasle" aria-controls="flush-collapseOneX">                  
                  <div className='sidebaricons'>
                  <img
                    src={require('../../assets/images/icons/user.png')}
                    className=''
                  />
                  </div>
                  <span>Account</span>
                </button>
              </h2>
              <div id="flush-collapseOneX" className="accordion-collapse collapse" aria-labelledby="flush-headingOneX" data-mdb-parent="#accordionFlushExampleX">
                <div className="accordion-body p-0 ps-3">
                  {/* <NavLink to="/claim-flow-account" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <img
                      src={require('../../assets/images/icons/claim.png')}
                      className='sidebaricons me-3'
                    />
                    <span>Claim Flow Account</span>
                  </NavLink> */}
                  <NavLink to="/add-email" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                  <div className='sidebaricons'>
                  <img
                    src={require('../../assets/images/icons/claim.png')}
                    className=''
                  />
                  </div>                   
                    <span>Sync Accounts</span>
                  </NavLink>
                </div>
              </div>
              
            </div>


          </div>
          <NavLink to="/login" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis')}>
            
          <div className='sidebaricons'>
              <img
                src={require('../../assets/images/icons/log-out-outline.png')}
                className=''
              />
            </div>             
            <span>Logout</span>
          </NavLink>


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

export default StudentSidemenu;