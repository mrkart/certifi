import { React, useEffect, useMyCustomStuff } from 'react';
import * as eva from 'eva-icons';
import StudentSidemenu from '../components/shared/StudentSidemenu';
import { Navigate } from 'react-router-dom';
import { mainRoles,userRoles } from '../components/shared/Roles';

const StudentLayout = ({ subElement }) => {

    let userprfile = JSON.parse(localStorage.getItem('userprfile'));
    let userName = userprfile.name;
    let userOrg = userprfile.organistaions[0]?.name;
    let userRole = userprfile.roles && userprfile.roles[0]?.name
    console.log(userName);
    console.log(userOrg);

    useEffect(() => { eva.replace() });
    return (
        (userRoles.includes(userRole) ? <div className='container-fluid ptb15 h100vh'>
            <div className='backgroundblur commonbox'>
                <header>
                    <StudentSidemenu />
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
                            {/* <div className='cmpname'>
                                <h5 className='fw-bolder text-uppercase'>{userOrg}</h5>
                            </div> */}
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
                                    {/* <h5 className='fw-bolder text-uppercase'>{userOrg}</h5> */}
                                </div>
                                <div className='col-6 text-end'>
                                    <div className='profile-area'>
                                        <div className='profile-cont'>
                                            <p className='mb-1 profilename'>Welcome <span className='username'>{userName}</span></p>
                                            <p className='lastlogin mb-0'><a class="btn btn-light btn-sm text-primary" href="#"><i data-eva="log-out-outline"></i> Logout</a></p>
                                        </div>

                                        <div className='profile-icon'>
                                            <img className='headerprofilepic' src={require('../assets/images/photo4.png')} loading="lazy" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        {subElement}
                    </div>
                </main>
            </div>
        </div> : (mainRoles.includes(userRole)) ? <Navigate to="/"/> : <Navigate to="/login" />)
    );
}

export default StudentLayout;