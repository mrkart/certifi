import { React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import Stepper from "react-stepper-horizontal";


const Issue_Certificate = () => {
  
  const [stepper, setStepper] = useState(0);

  return (
    <div className='scrolldiv1'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12'><h4 className="fw-bolder text-black text-uppercase mb-0">Issue Certs</h4></div>
            </div>
          </div>

          <div>
            <Stepper steps={ [{title: 'Select students', className:'certsteps'}, {title: 'Certification info', className:'certsteps'}, {title: 'Cert template', className:'certsteps' }, {title: 'Preview', className:'certsteps'}] } activeStep={ stepper } />
            
            { stepper === 0 && 
              <div>
                <div className='formscroldiv'>
                  <div className='searchform border-none'>
                    <div className='fields txtfields'>Cert batch name</div>
                    <div className='fields'>
                      <select className='form-control'>
                        <option>2022-Computer-Science-Graduation - List 1</option>
                      </select>
                    </div>
                    <div className='fields'></div>
                  </div>

                  <div className='tableblur mt-4'>
                    <div className='searchform'>
                      <div className='fields'>Search & Filters</div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email' /></div>
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

                <div className='row align-items-center'>
                  <div className='col-3'></div>
                  <div className='col-6 text-center'>Totally <span className='fw-bold'>125</span> students seclected</div>
                  <div className='col-3 text-end'>
                    <div className='btngrouprht'>
                      <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                    </div>
                  </div>
                </div>
              
              </div>
            }
            {stepper === 1 && 
              <div>
               <div className='formscroldiv'>
                  <div className='backgroundblur text-center'>
                    <div className='certinfo'>
                      <p>Upload a CSV/XLS file with student ID & their certification info</p>
                      <div className='certinfocont'>
                        <p>Course</p>
                        <p>Grade</p>
                        <p>Batch</p>
                        <p>Certificate Number</p>
                      </div>
                      <h3>Download CSV File</h3>

                      <div className='form-group'>
                        <label for="file-upload" class="custom-file-upload btn btn-primary btn-icon icon-rht">Upload File <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                        <input id="file-upload" type="file" />
                      </div>

                      <p className='text-secondary'>CSV, XLS only - Maximum 10000 records</p>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-6'>
                    <div className='btngrouprht'>
                      <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                    </div>
                  </div>
                  <div className='col-6 text-end'>
                    <div className='btngrouprht'>
                      <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            }
            {stepper === 2 && 
              <div>
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
                      <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                    </div>
                  </div>
                  <div className='col-6 text-end'>
                    <div className='btngrouprht'>
                      <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                    </div>
                  </div>
                </div>              
              </div>
            }
            {stepper === 3 && 
              <div>
               <div className='formscroldiv'>
                  {/* <div className='backgroundblur text-center mh-auto'>
                    <div className='certinfo certpreview'>
                      <div className='img'>
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className='certprecontbtn'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='cpbtnlinks'>
                          <a href='' className='text-dark'><i data-eva="arrowhead-left-outline"></i> PREVIOUS</a>

                        <a href='' className='btn btn-light text-primary'>John Smith<br/>#12347</a></div>
                      </div>
                      <div className='col-md-4 text-center'>
                        <h5 className='text-primary'>Laura Wheeler</h5>
                        <p>#12455</p>
                      </div>  
                       <div className='col-md-4 '>
                        <div className='cpbtnlinks align-items-end'>
                          <a href='' className='text-dark'>Next <i data-eva="arrowhead-right-outline"></i></a>
                          
                        <a href='' className='btn btn-light text-primary'>Adam Smith<br/>#12347</a></div>
                      </div>
                    </div>
                  </div>  */}

                  <div class="accordion listview" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                        <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                      <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                      <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='row align-items-center'>
                  <div className='col-4'>
                    <div className='btngrouprht'>
                      <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                    </div>
                  </div>
                  <div className='col-4 text-center'>You will be prompted to initiate your blockchain signature in next step</div>
                  <div className='col-4 text-end'>
                    <div className='btngrouprht'>
                      <button className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          {/* <div className='issuecerttabs'>

            <ul className="nav nav-pills mb-3 justify-content-center" id="ex1" role="tablist">
              <li className="nav-item" role="presentation"><a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Select students <i data-eva="checkmark-outline"></i></a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Certification info</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Cert template</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-4" data-mdb-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4" aria-selected="false">Preview</a></li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                <div className='formscroldiv'>
                  <div className='searchform border-none'>
                    <div className='fields txtfields'>Cert batch name</div>
                    <div className='fields'>
                      <select className='form-control'>
                        <option>2022-Computer-Science-Graduation - List 1</option>
                      </select>
                    </div>
                    <div className='fields'></div>
                  </div>

                  <div className='tableblur mt-4'>
                    <div className='searchform'>
                      <div className='fields'>Search & Filters</div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email' /></div>
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
                <div className='row align-items-center'>
                  <div className='col-3'></div>
                  <div className='col-6 text-center'>Totally <span className='fw-bold'>125</span> students seclected</div>
                  <div className='col-3 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">

                <div className='formscroldiv'>
                  <div className='backgroundblur text-center'>
                    <div className='certinfo'>
                      <p>Upload a CSV/XLS file with student ID & their certification info</p>
                      <div className='certinfocont'>
                        <p>Course</p>
                        <p>Grade</p>
                        <p>Batch</p>
                        <p>Certificate Number</p>
                      </div>
                      <h3>Download CSV File</h3>

                      <div className='form-group'>
                        <label for="file-upload" class="custom-file-upload btn btn-primary btn-icon icon-rht">Upload File <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                        <input id="file-upload" type="file" />
                      </div>

                      <p className='text-secondary'>CSV, XLS only - Maximum 10000 records</p>
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

              </div>
              <div className="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
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
              </div>
              <div className="tab-pane fade" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-3">
                <div className='btngrouprht text-end mb-3'>
                  <button className='btn btn-primary text-primary btn-sm btn-action' data-mdb-toggle="tooltip" title="Cert View" data-mdb-placement="bottom">< i data-eva-animation="flip" data-eva="award-outline"></i></button>
                  <button className='btn btn-outline-primary text-primary btn-sm btn-action' data-mdb-toggle="tooltip" title="List View" data-mdb-placement="bottom">< i data-eva-animation="flip" data-eva="menu-outline"></i></button>
                </div>

                <div className='formscroldiv'>
                  <div className='backgroundblur text-center mh-auto'>
                    <div className='certinfo certpreview'>
                      <div className='img'>
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className='certprecontbtn'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='cpbtnlinks'>
                          <a href='' className='text-dark'><i data-eva="arrowhead-left-outline"></i> PREVIOUS</a>

                        <a href='' className='btn btn-light text-primary'>John Smith<br/>#12347</a></div>
                      </div>
                      <div className='col-md-4 text-center'>
                        <h5 className='text-primary'>Laura Wheeler</h5>
                        <p>#12455</p>
                      </div>  
                       <div className='col-md-4 '>
                        <div className='cpbtnlinks align-items-end'>
                          <a href='' className='text-dark'>Next <i data-eva="arrowhead-right-outline"></i></a>
                          
                        <a href='' className='btn btn-light text-primary'>Adam Smith<br/>#12347</a></div>
                      </div>
                    </div>
                  </div> 

                  <div class="accordion listview" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                        <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                      <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                      <div class="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='row align-items-center'>
                  <div className='col-4'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</a>
                    </div>
                  </div>
                  <div className='col-4 text-center'>You will be prompted to initiate your blockchain signature in next step</div>
                  <div className='col-4 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div> */}
        </div>

      </div>
    </div>
   
  );
}

export default Issue_Certificate;