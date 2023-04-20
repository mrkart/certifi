import { React, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserList, resetUserlist, resetUserlistfailed } from '../actions/exampleAction';
import { useDispatch, useSelector } from 'react-redux';
import TableLoader from './shared/TableLoader';
import * as eva from 'eva-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltipb from 'react-bootstrap/Tooltip';

const Students = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fulluserlist = useSelector(state => state.demoReducer.userlist);
  const faileduserlist = useSelector(state => state.demoReducer.userListFailed);

  const [userlist, setUserlist] = useState([]);

  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    dispatch(getUserList());
  }, []);
  useEffect(() => {
    eva.replace();
  });

  useEffect(() => {
    if (fulluserlist.statusCode == 200 && fulluserlist.data.orgUsers) {
      let data = fulluserlist.data.orgUsers;
      setTimeout(() => {
        dispatch(resetUserlist());
        setUserlist(data);
        setFetched(true)
      }, 1000);
    }
  }, [fulluserlist]);
  useEffect(() => {
    if (faileduserlist && faileduserlist !== '' && faileduserlist !== undefined) {
      dispatch(resetUserlistfailed())
      setFetched(true)
      if(faileduserlist.statusCode === 403){
        navigate('/login')
      }
      
    }
  }, [faileduserlist]);

  return (
  
          <div className=''>
           

            {(userlist.length == 0 && !fetched) ? (
              <TableLoader />
            ) : (userlist.length == 0 && fetched) ?
            <div className='tableblur mt-4 fadein'>
                <div className='row align-items-center'>
                  <div className='col-12 text-center'>
                    <span className='text'>User not found</span>
                  </div>
                </div>
              </div> : (
              <div className='tableblur mt-4 fadein'>
                <div className='searchform pt-0'>
                  <div className='fields'>Search & Filters</div>
                  <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                  <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                  <div className='fields'><input type={'text'} className="form-control" placeholder='User ID/Email' /></div>
                  <div className='fields'>
                    <select className="form-control">
                      <option defaultValue>Import slot</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>

                  </div>
                </div>
                <div className='table-scroller'>
                  <div className='table-responsive'>
                    <table className="table align-middle mb-0 custable table-hover" >
                      <thead className="">
                        <tr>
                          {/* <th>
                    <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck1" /><label className="form-check-label" htmlFor="exampleCheck1"></label></div>
                    </th> */}
                          <th>User ID</th>
                          <th>Email</th>
                          <th>Name</th>
                          <th>Batch</th>
                          <th>Status</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userlist.map((user, index) => (
                          <tr key={index}>
                            {/* <td>
                        <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div>
                        </td> */}
                            <td>
                              <div className="d-flex align-items-center">
                                {user.uid}
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">{user.email}</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">{(user && user.name) ? user.name : '-'}</p>
                            </td>
                            <td> {(user && user.slot && user.slot[0])? user.slot[0].name : '-'} </td>
                            <td>
                              <span className="text-success">Approved</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                              <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}>
                                <NavLink className='btn btn-outline-primary text-primary btn-sm btn-action' to={"/edit-user/" + user.uid}>
                                  < i data-eva-animation="flip" data-eva="edit-outline"></i>
                                </NavLink>
                              </OverlayTrigger>
                              <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        ))}
                        
                      
                        {/* 
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        1
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">anderson@gmail.com</span>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Anderson</p>
                    </td>
                    <td> 2022 </td>
                    <td>
                      <span className="text-success">Approved</span>
                    </td>
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <NavLink className='btn btn-outline-primary text-primary btn-sm btn-action' to={"/edit-student/21"}>
                        < i data-eva-animation="flip" data-eva="edit-outline"></i>
                      </NavLink>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                    
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck3" /><label className="form-check-label" htmlFor="exampleCheck3"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        2
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">adam@gmail.com</span>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Adam</p>
                    </td>
                    <td> 2021 </td>
                    <td>
                      <span className="text-success">Approved</span>
                    </td>
                    <td className='text-center'>
                      <div className='btngrouprht'>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck4" /><label className="form-check-label" htmlFor="exampleCheck4"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        3
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">sean@gmail.com</span>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Sean</p>
                    </td>
                    <td> 2020 </td>
                    <td>
                      <span className="text-success">Approved</span>
                    </td>
                    <td className='text-center'>
                      <div className='btngrouprht'>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck5" /><label className="form-check-label" htmlFor="exampleCheck5"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        4
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">taylor@gmail.com</span>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Taylor</p>
                    </td>
                    <td> 2019 </td>
                    <td>
                      <span className="text-success">Approved</span>
                    </td>
                    <td className='text-center'>
                      <div className='btngrouprht'>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck6" /><label className="form-check-label" htmlFor="exampleCheck6"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        5
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">anderson@gmail.com</span>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">Anderson</p>
                    </td>
                    <td> 2022 </td>
                    <td>
                      <span className="text-danger">Decline</span>
                    </td>
                    <td className='text-center'>
                      <div className='btngrouprht'>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                  </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
       
  );
}

export default Students;