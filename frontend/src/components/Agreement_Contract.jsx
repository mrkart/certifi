import { Fragment, React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import * as eva from 'eva-icons';
import ProfileArea from '../components/shared/ProfileArea';
import { NavLink } from 'react-router-dom';


const Agreement_Contract = () => {
  useEffect(() => { eva.replace() });
  
  return (
    <Fragment>
     <div className='scrolldiv mar-top'>
        <div className='row '>
          <div className='col-md-12 text-start'>
            
            <div className='pageheader'>
              <div className='row mb-3 align-items-center'>
                <div className='col-md-6'>
                <h4 className="fw-bolder text-black text-uppercase mb-2">Agreement Contract</h4>
                  <h6 className='mb-0'>Insurance Agreement</h6>
                  </div>
                <div className='col-md-6 text-end'>
                  <div className='btnwithpro'>                    
                    <ProfileArea />
                  </div>
                </div>
              </div>
            </div> 


           <div className='issuecerttabs'>

            <ul className="nav nav-pills mb-3 justify-content-center" id="ex1" role="tablist">
              <li className="nav-item" role="presentation"><a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Terms</a></li>
              <li className="nav-item btn-disabled" role="presentation"><a className="nav-link" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Attributes</a></li>
              <li className="nav-item btn-disabled" role="presentation"><a className="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Signers</a></li>              
            </ul>

            <div className="tab-content" id="ex1-content">
              <div className="tab-pane fade show active fadein" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                <div className='formscroldiv'>                  
                     <div className='backgroundblur'>
                      <div className='acboxs'>
                          <div className='btngrouprht mb-3'>
                            <button type="submit" className='btn btn-light btn-lightbtn'>Create New </button>
                            <button type="submit" className='btn btn-light btn-lightbtn'>Select a Template </button>
                            <button type="submit" className='btn btn-light btn-lightbtn'>Open Library </button>
                          </div>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label className='mb-2'>Term Name </label>
                                <input type={'text'} className="form-control" placeholder='Enter Term Name'/>
                              </div>

                              <div className='form-group'>
                                <label className='mb-2'>Enter Term Detail</label>
                                <textarea className="form-control" placeholder='Term Detail'></textarea>
                              </div>

                              <div className='form-group'>
                                <div className='row align-items-center'>
                                  <div className='col-6'>
                                  <span className='icontext eva-hover icon-sm'>
                                  <span className='icon'><i data-eva="plus-outline"></i></span>
                                  <span className='text'>Add New Term</span>
                                </span>
                                  </div>
                                  <div className='col-6'>
                                  <div className="dropdown">
                      <button
                        className="btn dropdown-toggle chartdropdown mt-0"
                        type="button"
                        id="dropdownMenuButton"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Select Term
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" selected>Term 1</a></li>
                        <li><a className="dropdown-item">Term 2</a></li>
                      </ul>
                    </div>
                                  </div>
                                </div>
                               
                                
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label className='mb-2'>&nbsp; </label>
                                <div className='listcorgrade largebtn'>
                                    <span className='badge badge-primary'>Client</span>
                                    <span className='badge badge-primary'>Contractor</span>
                                    <span className='badge badge-primary'>Insurance</span>
                                    <span className='badge badge-primary'>Contractor</span>
                                    <span className='badge badge-primary'>Insurance agreement</span>                                    
                                </div>
                                <hr className='light-brd' />
                                <div className='text-end'>
                                <span className='icontext viewall eva-hover'>
                                  <span className='icon'><i data-eva="arrow-ios-forward-outline"></i></span>
                                  <span className='text'>View All Attributes</span>
                                </span>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                     </div>
                </div>
                <div className='row align-items-center'>                  
                  <div className='col-12 text-end'>
                    <div className='btngrouprht'>
                    <NavLink to="/attributes" className='btn btn-primary btn-icon icon-rht'>Next < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></NavLink>
                    </div>
                  </div>
                </div>

              </div>             
            </div>
          </div>            
          </div>
        </div>
      </div>
       
    </Fragment>


  );
}

export default Agreement_Contract;