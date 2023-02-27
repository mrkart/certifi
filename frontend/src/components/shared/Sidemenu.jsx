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
  const [address, setAddress] = useState('')

  const onChangeValue = () => { }
  const walletaddress = useSelector(state => state.demoReducer.walletAddress);

  useEffect(() => {
    if (walletaddress && walletaddress !== null) {
      setAddress(walletaddress)
    }

  }, [walletaddress])


  return (
    <nav id="sidebarMenu" className="collapse sidebar collapse pt-0">
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
          <h6 className='badge badge-primary institle'>INSTITUTION</h6>
          <div className='mobileprofile'>
            <div className='profile-area'>
              <div className='profile-icon'>
                <img className='headerprofilepic' src={require('../../assets/images/photo10.png')} loading="lazy" />
              </div>
              <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
              <p className='mb-0 profilename mt-3'>{address}</p>

            </div>
          </div>
          {/* <div data-mdb-toggle="collapse"
                  data-mdb-target="#sidebarMenu"
                  aria-controls="sidebarMenu"
                  aria-expanded="false"> */}





          <div className="accordion accordion-borderless" id="accordionFlushExampleX">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOneX1">
                <div data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOneX1" aria-expanded="true" aria-controls="flush-collapseOneX1">
                  <NavLink to="/" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
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
              <h2 className="accordion-header" id="flush-headingOneX2">                
                <div data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOneX2" aria-expanded="true" aria-controls="flush-collapseOneX2">
                  {/* <NavLink to="/students" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'>
                      <img
                        src={require('../../assets/images/icons/users.png')}
                        className=''
                      />
                    </div>
                    <span>Users</span>
                  </NavLink> */}

                  <button className="list-group-item list-group-item-action text-uppercase accordion-button" type="button" data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseOneX2" aria-expanded="fasle" aria-controls="flush-collapseOneX2">
                  <div className='sidebaricons'>
                    <img
                      src={require('../../assets/images/icons/users.png')}
                      className=''
                    />
                  </div>
                  <span>Users</span>
                </button>
                </div>
              </h2>
              <div id="flush-collapseOneX2" className="accordion-collapse collapse" aria-labelledby="flush-collapseOneX2" data-mdb-parent="#accordionFlushExampleX">
              <div className="accordion-body p-0 ps-3">    
                 <NavLink to="/students" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/users.png')} className=''/></div> <span>USERS</span>
                  </NavLink>             
                  <NavLink to="/add-student" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/plus.png')} className=''/></div> <span>ADD USER</span>
                  </NavLink>

                  <NavLink to="/students-import" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/import.png')} className=''/></div> <span>IMPORT USERS</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOneX3">
                <div data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOneX3" aria-expanded="true" aria-controls="flush-collapseOneX3">
                  <NavLink to="/mint-certificate" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'>
                      <img
                        src={require('../../assets/images/icons/award.png')}
                        className=''
                      />
                    </div>
                    <span>Mint</span>
                  </NavLink>
                </div>
              </h2>
              <div id="flush-collapseOneX3" className="accordion-collapse collapse show" aria-labelledby="flush-collapseOneX3" data-mdb-parent="#accordionFlushExampleX">
              
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-settings">
                <button className="list-group-item list-group-item-action text-uppercase accordion-button" type="button" data-mdb-toggle="collapse"
                  data-mdb-target="#flush-set" aria-expanded="fasle" aria-controls="flush-set">
                  <div className='sidebaricons'>
                    <img
                      src={require('../../assets/images/icons/settings.png')}
                      className=''
                    />
                  </div>
                  <span>Settings</span>
                </button>
              </h2>
              <div id="flush-set" className="accordion-collapse collapse" aria-labelledby="flush-settings" data-mdb-parent="#accordionFlushExampleX">
                <div className="accordion-body p-0 ps-3">                 
                  <NavLink to="/members" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/users.png')} className=''/></div> <span>Members</span>
                  </NavLink>

                  <NavLink to="/signers" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/edit-3.png')} className=''/></div> <span>Signers</span>
                  </NavLink>

                  <NavLink to="/profile" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/user.png')} className=''/></div> <span>Profile</span>
                  </NavLink>

                  <NavLink to="/security" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/verified.png')} className=''/></div> <span>Security</span>
                  </NavLink>
                </div>
              </div>

            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOneX">
                <button className="list-group-item list-group-item-action text-uppercase accordion-button" type="button" data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseOneX" aria-expanded="fasle" aria-controls="flush-collapseOneX">
                  <div className='sidebaricons'>
                    <img
                      src={require('../../assets/images/icons/code.png')}
                      className=''
                    />
                  </div>
                  <span>Developer</span>
                </button>
              </h2>
              <div id="flush-collapseOneX" className="accordion-collapse collapse" aria-labelledby="flush-headingOneX" data-mdb-parent="#accordionFlushExampleX">
                <div className="accordion-body p-0 ps-3">                 
                  <NavLink to="/domains" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/web.png')} className=''/></div> <span>Domains</span>
                  </NavLink>
                  <NavLink to="/create-token" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/key.png')} className=''/></div> <span>API Keys</span>
                  </NavLink>
                  <NavLink to="https://api.certifi.ly/api-docs/" target="_blank" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img src={require('../../assets/images/icons/document.png')} className=''/></div><span>API DOCS</span>
                  </NavLink>
                  <NavLink to="/smart-contract" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
                    <div className='sidebaricons'><img  src={require('../../assets/images/icons/smart-contracts.png')} className=''/></div> <span>Smart Contract</span>
                  </NavLink>
                 
                </div>
              </div>

            </div>


          </div>


          {/* <NavLink to="/students-import" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
            <img
              src={require('../../assets/images/icons/users-import.png')}
              className='sidebaricons me-3'
            />
            <span>Students Import</span>
          </NavLink> */}
          {/* <NavLink to="/select-template" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
            <img
              src={require('../../assets/images/icons/file-text.png')}
              className='sidebaricons me-3'
            />
            <span>Select Template</span>
          </NavLink>
          <NavLink to="/customize-template" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
            <img
              src={require('../../assets/images/icons/file-edit.png')}
              className='sidebaricons me-3'
            />
            <span>Customize Template</span>
          </NavLink> */}

          {/* <NavLink to="/signer" className={({isActive}) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase')}>
            <img
              src={require('../../assets/images/icons/edit-3.png')}
              className='sidebaricons me-3'
            />
            <span>Signers</span>
          </NavLink> */}


          <NavLink to="/login" className={({ isActive }) => (isActive ? "active list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis" : 'list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis')}>

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
        
        <p className='mt-0 mb-1'>
        <img
              src={require('../../assets/images/flow.png')}
              alt="flow"
              loading="lazy"             
            />
        </p>
        <select className="form-control mb-1" value={selectType} onChange={onChangeValue}>
          <option value="1">Testnet</option>
          <option value="2">Mainnet</option>
        </select>

        <p className=' mb-0 text-uppercase fw-bolder networkstatus text-primary'>Online</p>
      </div>
    </nav>
  );
}

export default Sidemenu;