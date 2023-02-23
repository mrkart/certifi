import { React } from 'react';
import { NavLink } from 'react-router-dom';

const StudentSidemenu = () => {
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let userName = userprofile.name;
  let userOrg = userprofile.organistaions[0]?.name;
  console.log(userName);
  console.log(userOrg);
  const [selectType, setSelectType] = "1"
  const onChangeValue = () => { }
  return (
    <nav id="sidebarMenu" className="collapse sidebar collapse pt-0 ">
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
                <img className='headerprofilepic' src={require('../../assets/images/photo4.png')} loading="lazy" />
              </div>
              <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
            </div>
          </div>
          <div class="accordion accordion-borderless" id="accordionFlushExampleX">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOneX1">
                <div  data-mdb-toggle="collapse" data-mdb-target="#flush-collapseOneX1" aria-expanded="true" aria-controls="flush-collapseOneX1">
                <NavLink to="/student-dashboard" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active"                
                >
                  <img
                    src={require('../../assets/images/icons/airplay.png')}
                    className='sidebaricons me-3'
                  />
                  <span>Dashboard</span>
                </NavLink>
                </div>
              </h2>
              <div id="flush-collapseOneX1" class="accordion-collapse collapse show" aria-labelledby="flush-collapseOneX1" data-mdb-parent="#accordionFlushExampleX"></div>
            </div>



            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOneX">
                <button class="list-group-item list-group-item-action px-3 py-2 text-uppercase accordion-button" type="button" data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseOneX" aria-expanded="fasle" aria-controls="flush-collapseOneX">
                  <img
                    src={require('../../assets/images/icons/user.png')}
                    className='sidebaricons me-3'
                  />
                  <span>Account</span>
                </button>
              </h2>
              <div id="flush-collapseOneX" class="accordion-collapse collapse" aria-labelledby="flush-headingOneX" data-mdb-parent="#accordionFlushExampleX">
                <div class="accordion-body p-0 ps-3">
                  <NavLink to="/claim-flow-account" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
                    <img
                      src={require('../../assets/images/icons/claim.png')}
                      className='sidebaricons me-3'
                    />
                    <span>Claim Flow Account</span>
                  </NavLink>
                  <NavLink to="/add-email" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
                    <img
                      src={require('../../assets/images/icons/add-email.png')}
                      className='sidebaricons me-3'
                    />
                    <span>Add Email Accounts</span>
                  </NavLink>
                </div>
              </div>
            </div>


          </div>






          <NavLink to="/login" className="list-group-item list-group-item-action px-3 py-2 text-uppercase mobvis" activeClassName="active">
            <img
              src={require('../../assets/images/icons/log-out-outline.png')}
              className='sidebaricons me-3'
            />
            <span>Logout</span>
          </NavLink>


        </div>
      </div>
      <div className="sidebarbottom light-blur text-center">
        <p className='mt-0 mb-1'> Blockchain network status</p>
        <select class="form-control mb-1" value={selectType} onChange={onChangeValue}>
          <option value="1">Testnet</option>
          <option value="2">Mainnet</option>
        </select>
        <p className=' mb-0 text-uppercase fw-bolder networkstatus text-success'>Online</p>
      </div>
    </nav>
  );
}

export default StudentSidemenu;