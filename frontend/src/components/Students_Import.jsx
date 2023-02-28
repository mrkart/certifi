import { React, useEffect, useMyCustomStuff } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import { NavLink } from 'react-router-dom';
import * as eva from 'eva-icons';
import ProfileArea from '../components/shared/ProfileArea';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltipb from 'react-bootstrap/Tooltip';

const StudentsImport = () => {
  useEffect(() => {eva.replace()})
  return (
    <div className='scrolldiv mar-top'>
      <div className='row '>
        <div className='col-md-12 text-start'>                  
          <div className=''>
          <div className='pageheader'>
              <div className='row mb-3 align-items-center'>
                <div className='col-md-4'>
                  <h4 className="fw-bolder text-black text-uppercase mb-0">Import Users</h4></div>
                <div className='col-md-8 text-end'>
                  <div className='btnwithpro'>
                    <div className='btngrouprht'>
                      <NavLink to="/add-student" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="plus-outline"></i> Add users</NavLink>
                      <NavLink to="/students-import" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import users</NavLink>
                      {/* <a href='/add-student' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</a> 
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</a>
                  */}
                    </div>
                    <ProfileArea />
                  </div>
                </div>
              </div>
            </div>

         
              <div className='formscroldiv'>
              <div className='searchform border-none pt-0'>
                <div className='fields'>Create import slot</div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Name'/></div>
                <div className='fields'>
                  {/* <label htmlFor="file-upload" className="custom-file-upload form-control">Upload file <i data-eva-animation="flip" data-eva="upload-outline"></i></label> */}
                  <label className="custom-file-upload form-control">Upload file <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                  <input id="file-upload" type="file"/>
                </div>                        
                <div className='fields'><button type='button' className='btn btn-primary'>Submit</button></div>
                <div className='fields'></div>
              </div>

          <div className='greenbox'>
            <div className='greencont'>Map imported data</div>
            <div className='mapimportdata'>
              <div className='data'>
                <p>User email</p>
                <h5><a href="" className='text-primary'>John@gmail.com</a></h5>
              </div>
              <div className='data'>
                <p>User ID</p>
                <h5><a href="" className='text-primary'>2</a></h5>
              </div>
              <div className='data'>
                <p>Batch year</p>
                <h5><a href="" className='text-primary'>2023</a></h5>
              </div>
              <div className='data'>
                <p>Name</p>
                <h5><a href="" className='text-primary'>John david</a></h5>
              </div>
              <div className='data text-end'>
                <button type='button' className='btn btn-light'>Map & complete</button>
              </div>
            </div>
          </div>

            <div className='tableblur mt-3'>                    
              <div className='searchform pt-0'>
                <div className='fields'>Search & Filters</div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Name'/></div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Updated date'/></div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Uploaded by'/></div>
                <div className='fields'><input type={'text'} className="form-control" placeholder='Record count'/></div>
              </div>
              <div className='table-responsive'>
              <table className="table align-middle mb-0 custable table-hover">
                <thead className="">
                  <tr>
                    <th>
                    <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck1" /><label className="form-check-label" htmlFor="exampleCheck1"></label></div>
                    </th>
                    <th>Slot name</th>
                    <th>Updated date</th>
                    <th>Uploaded by</th>
                    <th>Records count</th>                                                      
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        1
                      </div>
                    </td>
                    <td>
                      13-07-2022  10:00 AM 
                    </td>
                    <td>
                      <p className="fw-normal mb-1"><span className="text-dark">Anderson</span></p>
                    </td>
                    <td> 223 </td>
                    
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                    </div>
                    </td>                           
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        2
                      </div>
                    </td>
                    <td>
                      13-07-2022  10:00 AM 
                    </td>
                    <td>
                      <p className="fw-normal mb-1"><span className="text-dark">Anderson</span></p>
                    </td>
                    <td> 223 </td>
                    
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                    </div>
                    </td>                           
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        3
                      </div>
                    </td>
                    <td>
                      13-07-2022  10:00 AM 
                    </td>
                    <td>
                      <p className="fw-normal mb-1"><span className="text-dark">Anderson</span></p>
                    </td>
                    <td> 223 </td>
                    
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                    </div>
                    </td>                           
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        4
                      </div>
                    </td>
                    <td>
                      13-07-2022  10:00 AM 
                    </td>
                    <td>
                      <p className="fw-normal mb-1"><span className="text-dark">Anderson</span></p>
                    </td>
                    <td> 223 </td>
                    
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                    </div>
                    </td>                           
                  </tr>
                  <tr>
                  <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                    <td>
                      <div className="d-flex align-items-center">
                        5
                      </div>
                    </td>
                    <td>
                      13-07-2022  10:00 AM 
                    </td>
                    <td>
                      <p className="fw-normal mb-1"><span className="text-dark">Anderson</span></p>
                    </td>
                    <td> 223 </td>
                    
                    <td className='text-center'>
                    <div className='btngrouprht'>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                      <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={ <Tooltipb id="tooltip-bottom">Delete</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                    </div>
                    </td>                           
                  </tr>
                </tbody>
              </table>
              </div>
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

export default StudentsImport;