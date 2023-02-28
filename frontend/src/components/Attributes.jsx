import { Fragment, React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import * as eva from 'eva-icons';
import ProfileArea from '../components/shared/ProfileArea';
import { NavLink } from 'react-router-dom';


const Attributes = () => {
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
                                <li className="nav-item" role="presentation"><a className="nav-link active finished" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Terms</a></li>
                                <li className="nav-item" role="presentation"><a className="nav-link active finished" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Attributes</a></li>
                                <li className="nav-item btn-disabled" role="presentation"><a className="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Signers</a></li>
                            </ul>

                            <div className="tab-content" id="ex1-content">
                                 <div className="tab-pane fade show active fadein" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">

                                    <div className='formscroldiv'>
                                        <div className='backgroundblur text-center'>
                                            <div className='acboxs'>
                                                <div className='table-responsive'>
                                                    <table className='table'>
                                                        <tr>
                                                            <th className='text-start'>Attributes</th>
                                                            <th>Information</th>
                                                            <th>Access</th>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-start'>Contractor</td>
                                                            <td><div className='form-group mb-0'><input type={'text'} className="form-control" placeholder='' /></div></td>
                                                            <td>
                                                                <label class="toggle" htmlFor='checkboxpp'>
                                                                    <input class="toggle-checkbox" type="checkbox" checked id='checkboxpp'/>
                                                                    <div class="toggle-switch"></div>
                                                                    <span class="toggle-label">Public</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-start'>Client</td>
                                                            <td><div className='form-group mb-0'><input type={'text'} className="form-control" placeholder='' /></div></td>
                                                            <td>
                                                                <label class="toggle">
                                                                    <input class="toggle-checkbox" type="checkbox" />
                                                                    <div class="toggle-switch"></div>
                                                                    <span class="toggle-label">Private</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-start'>ContractorAddress</td>
                                                            <td><div className='form-group mb-0'><input type={'text'} className="form-control" placeholder='' /></div></td>
                                                            <td>
                                                                <label class="toggle">
                                                                    <input class="toggle-checkbox" type="checkbox" />
                                                                    <div class="toggle-switch"></div>
                                                                    <span class="toggle-label">Private</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-start'>ClientAddress</td>
                                                            <td><div className='form-group mb-0'><input type={'text'} className="form-control" placeholder='' /></div></td>
                                                            <td>
                                                                <label class="toggle">
                                                                    <input class="toggle-checkbox" type="checkbox" />
                                                                    <div class="toggle-switch"></div>
                                                                    <span class="toggle-label">Private</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-start'>ClientEmail</td>
                                                            <td><div className='form-group mb-0'><input type={'text'} className="form-control" placeholder='' /></div></td>
                                                            <td>
                                                                <label class="toggle">
                                                                    <input class="toggle-checkbox" type="checkbox" />
                                                                    <div class="toggle-switch"></div>
                                                                    <span class="toggle-label">Private</span>
                                                                </label>
                                                            </td>
                                                        </tr>

                                                    </table>
                                                </div>
                                                <div className='text-start'>
                                                <hr className='light-brd' />
                                                <span className='icontext eva-hover icon-sm'>
                                                    <span className='icon'><i data-eva="plus-outline"></i></span>
                                                    <span className='text'>Create Attribute</span>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row align-items-center'>
                                      <div className='col-6'>
                                      <div className='btngrouprht'>
                                              <NavLink to="/create/document" className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</NavLink></div>
                                    </div>
                                        <div className='col-6 text-end'>
                                            <div className='btngrouprht'>                                              
                                                <NavLink to="/agreement-signers" className='btn btn-primary btn-icon icon-rht'>Next < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                <div className='formscroldiv'>
                  <div className='certempfrm'>
                    <div className='row'>
                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Graduation Certificate Layout</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>

                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Course certificate 2</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>
                    </div>

                  </div>

                </div>
                <div className='row align-items-center'>
                  <div className='col-6'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</a>
                    </div>
                  </div>
                  <div className='col-6 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>
              </div>               */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>


    );
}

export default Attributes;