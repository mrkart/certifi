import { React, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserList } from '../actions/exampleAction';
import { useDispatch, useSelector } from 'react-redux';

const Students = () => {
  
  const dispatch = useDispatch();
  let userprfile = JSON.parse(localStorage.getItem('userprfile'));
  let orgID = userprfile.organistaions[0]?.id;

  useEffect(() => {
    dispatch(getUserList(orgID));
  },[]);

  return (
    <div className='scrolldiv'>
      <div className='row '>
        <div className='col-md-12 text-start'>                  
          <div className=''>
          <div className='row mb-3 align-items-center'>
            <div className='col-md-6'><h4 className="fw-bolder text-black text-uppercase mb-0">Students</h4></div>
              <div className='col-md-6 text-end'>
                <div className='btngrouprht'>
                  <NavLink to="/add-student" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</NavLink>
                  <NavLink to="/students-import" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</NavLink>
                  {/* <a href='/add-student' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</a> 
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</a>
                  */}
                </div>
              </div>
            </div>
            <div className='tableblur mt-4'>                    
              <div className='searchform'>
                <div className='fields'>Search & Filters</div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Name'/></div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year'/></div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email'/></div>
                <div className='fields'>
                  <select className="form-control"> 
                      <option selected>Import slot</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                  </select>
                  
                </div>
              </div>
              <div className='table-responsive'>
              <table className="table align-middle mb-0 custable table-hover" >
                <thead className="">
                  <tr>
                    <th>
                    <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck1" /><label className="form-check-label" for="exampleCheck1"></label></div>
                    </th>
                    <th>Student ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>Status</th>                            
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" for="exampleCheck2"></label></div></td>
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
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                      <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                    </div>
                    </td>
                    
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck3" /><label className="form-check-label" for="exampleCheck3"></label></div></td>
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
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck4" /><label className="form-check-label" for="exampleCheck4"></label></div></td>
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
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck5" /><label className="form-check-label" for="exampleCheck5"></label></div></td>
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
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck6" /><label className="form-check-label" for="exampleCheck6"></label></div></td>
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
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='col-md-2'>
          <div className="card light-blur h-100">
            <p className="card-text mb-1 ccondi mt-4">Sample</p>
            <p className=" cpartitle">Sample text</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Students;