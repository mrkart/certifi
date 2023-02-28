import { Fragment, React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import * as eva from 'eva-icons';
import ProfileArea from '../components/shared/ProfileArea';
import { NavLink } from 'react-router-dom';


const AgreeSigners = () => {
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
                                <li className="nav-item" role="presentation"><a className="nav-link active finished" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Signers</a></li>
                            </ul>

                            <div className="tab-content" id="ex1-content">

                                <div className="tab-pane fade show active fadein" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">

                                    <div className='formscroldiv'>
                                        <div className='backgroundblur text-start'>
                                            <div className='acboxs'>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Email Id</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Email ID'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Role</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Role'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='mb-2'>&nbsp;</div>
                                                        <label class="toggle">
                                                            <input class="toggle-checkbox" type="checkbox" checked />
                                                            <div class="toggle-switch"></div>
                                                            <span class="toggle-label">Recipient</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className='light-brd'/>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Email Id</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Email ID'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Role</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Role'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='mb-2'>&nbsp;</div>
                                                        <label class="toggle">
                                                            <input class="toggle-checkbox" type="checkbox" />
                                                            <div class="toggle-switch"></div>
                                                            <span class="toggle-label">Signer</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className='light-brd'/>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Email Id</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Email ID'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Role</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Role'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='mb-2'>&nbsp;</div>
                                                        <label class="toggle">
                                                            <input class="toggle-checkbox" type="checkbox" />
                                                            <div class="toggle-switch"></div>
                                                            <span class="toggle-label">Signer</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className='light-brd'/>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Email Id</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Email ID'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Role</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Role'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='mb-2'>&nbsp;</div>
                                                        <label class="toggle">
                                                            <input class="toggle-checkbox" type="checkbox" />
                                                            <div class="toggle-switch"></div>
                                                            <span class="toggle-label">Signer</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className='light-brd'/>
                                                <div className='row mb-3'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Email Id</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Email ID'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='mb-2'>Role</label>
                                                            <input type={'text'} className="form-control" placeholder='Enter Role'/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='mb-2'>&nbsp;</div>
                                                        <label class="toggle">
                                                            <input class="toggle-checkbox" type="checkbox" />
                                                            <div class="toggle-switch"></div>
                                                            <span class="toggle-label">Signer</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='text-start'>
                                                    <hr className='light-brd' />
                                                    <span className='icontext eva-hover icon-sm'>
                                                        <span className='icon'><i data-eva="plus-outline"></i></span>
                                                        <span className='text'>Add a Signer / Recipient</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row align-items-center'>
                                        <div className='col-6'>
                                            <div className='btngrouprht'>
                                                <NavLink to="/attributes" className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</NavLink></div>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <div className='btngrouprht'>
                                                <NavLink to="/" className='btn btn-primary btn-icon icon-rht'>Next < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></NavLink>
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

export default AgreeSigners;