import { Fragment, React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import * as eva from 'eva-icons';
import ProfileArea from '../components/shared/ProfileArea';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltipb from 'react-bootstrap/Tooltip';


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
                  <h4 className="fw-bolder text-black text-uppercase mb-2">Create Document</h4>
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
                <li className="nav-item btn-disabled" role="presentation"><a className="nav-link" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Attributes</a></li>
                <li className="nav-item btn-disabled" role="presentation"><a className="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Signers</a></li>
              </ul>

              <div className="tab-content" id="ex1-content">
                <div className="tab-pane fade show active fadein" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                  <div className='formscroldiv'>
                    <div className='backgroundblur'>
                      <div className='acboxs'>
                        <div className='albox'>
                          <div className='albox-titbtn'>
                            <div className='albox-tit'>
                              <h4>Sample Agreement</h4>
                            </div>
                            <div className='albox-btn'>
                              <div className='btngrouprht'>
                                <button type="submit" className="btn btn-primary btn-icon eva-hover">< i data-eva-animation="flip" data-eva="grid-outline"></i>Select a Template </button>
                                <button type="submit" className="btn btn-primary btn-icon eva-hover">< i data-eva-animation="flip" data-eva="book-open-outline"></i> Open Library </button>
                                {/* <button type="submit" className="btn btn-primary btn-icon eva-hover">< i data-eva-animation="flip" data-eva="keypad-outline"></i>Attributes </button> */}
                              </div>
                            </div>
                          </div>

                          <div className='altermsbox'>
                            <div className='altem'>
                              <div className='btngrouprht'>
                                <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={<Tooltipb id="tooltip-bottom">Edit</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a></OverlayTrigger>
                                <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={<Tooltipb id="tooltip-bottom">Move</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="keypad-outline"></i></a></OverlayTrigger>
                              </div>
                            </div>
                            <div className='altcont'>
                              <div className='backgroundblur'>
                                <div className='altcontbox'>
                                  <h4>Term #1</h4>
                                  <h6>Nature of Agreement</h6>
                                  <p className='abunobt'>This an agreement between
                                    <span className='btngrouprht'>
                                      <button type="submit" className="btn btn-light btn-icon eva-hover"><i data-eva-animation="flip" data-eva="globe-outline"></i> Client Short Name </button>
                                      <button type="submit" className="btn btn-light btn-icon eva-hover"><i data-eva-animation="flip" data-eva="lock-outline"></i> Client Address </button></span>
                                    undertake a new project</p>
                                </div>
                                <div className='altcontaction'>
                                  <div className='btngrouprht'>
                                    <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={<Tooltipb id="tooltip-bottom">Saved</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="save-outline"></i></a></OverlayTrigger>
                                    <OverlayTrigger key={'bottom'} placement={'bottom'} overlay={<Tooltipb id="tooltip-bottom">Remove</Tooltipb>}><a href="#" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a></OverlayTrigger>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='acboxs'>
                        <div className='albox'>
                          <div className='altermsbox'>
                            <div className='altcont p-0'>
                              <div className='backgroundblur d-block'>
                                <div className='albox-tit mb-3'>
                                  <label>Term #2 Title</label>
                                  <input type={'text'} value="Term 2 sample title" className='form-control' />
                                </div>
                                <div className='row'>
                                  <div className='col-md-4'>
                                    <div className='form-group'>
                                      <label className='mb-2'>Enter Term Detail</label>
                                      <textarea className="form-control" placeholder='Term Detail'></textarea>
                                    </div>
                                  </div>
                                  <div className='col-md-8'>
                                    <div className='row align-items-center'>
                                      <div className='col-md-6'><h5>Insert Attributes</h5></div>
                                      <div className='col-md-6 text-end'>
                                        <span className='icontext viewall eva-hover me-3'>
                                          <span className='text'>Create Attributes</span>
                                          <span className='icon me-2'><i data-eva="plus-outline"></i></span>
                                        </span>
                                      </div>
                                    </div>

                                    <hr className='light-brd' />
                                    <div className='text-end'>
                                      <span className='icontext viewall eva-hover'>
                                        <span className='icon'><i data-eva="arrow-ios-forward-outline"></i></span>
                                        <span className='text'>View All Attributes</span>
                                      </span>
                                    </div>
                                    <div className='form-group'>
                                      <label className='mb-2'>&nbsp; </label>
                                      <div className='listcorgrade largebtn '>
                                        <span className='btn btn-light btn-icon eva-hover me-2 mb-2'><i data-eva-animation="flip" data-eva="globe-outline"></i> Client</span>
                                        <span className='btn btn-light btn-icon eva-hover me-2 mb-2'><i data-eva-animation="flip" data-eva="lock-outline"></i> Contractor</span>
                                        <span className='btn btn-light btn-icon eva-hover me-2 mb-2'><i data-eva-animation="flip" data-eva="globe-outline"></i> Insurance</span>
                                        <span className='btn btn-light btn-icon eva-hover me-2 mb-2'><i data-eva-animation="flip" data-eva="lock-outline"></i> Contractor</span>
                                        <span className='btn btn-light btn-icon eva-hover me-2 mb-2'><i data-eva-animation="flip" data-eva="globe-outline"></i> Insurance agreement</span>
                                        <span  className="btn btn-light btn-icon eva-hover me-2 mb-2"><i data-eva-animation="flip" data-eva="globe-outline"></i> Client Short Name </span>
                                        <span  className="btn btn-light btn-icon eva-hover me-2 mb-2"><i data-eva-animation="flip" data-eva="lock-outline"></i> Client Address </span>
                                        <span  className="btn btn-light btn-icon eva-hover me-2 mb-2"><i data-eva-animation="flip" data-eva="lock-outline"></i> Client Email </span>
                                      </div>


                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                    {/* <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label className='mb-2'>Term Name </label>
                              <input type={'text'} className="form-control" placeholder='Enter Term Name' />
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
                        </div> */}
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