import { React } from 'react';
import { NavLink } from 'react-router-dom';

const StudentSidemenu = () => {
  const [selectType,setSelectType] = "1"
  const onChangeValue = () => {}
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
          <NavLink to="/student-dashboard" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/airplay.png')}
              className='sidebaricons me-3'
            />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/claim-flow-account" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/edit-3.png')}
              className='sidebaricons me-3'
            />
            <span>Claim Flow Account</span>
          </NavLink>
          <NavLink to="/add-email" className="list-group-item list-group-item-action px-3 py-2 text-uppercase" activeClassName="active">
            <img
              src={require('../../assets/images/icons/users-import.png')}
              className='sidebaricons me-3'
            />
            <span>Add Email Accounts</span>
          </NavLink>
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