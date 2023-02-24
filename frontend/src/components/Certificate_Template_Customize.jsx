import { React, useEffect, useMyCustomStuff } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';



const CertificateTemplateCustomize = () => {  
  return (

    <div className='scrolldiv'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-6'><h4 className="fw-bolder text-black text-uppercase mb-0"><a href="" className='text-dark'>cert templates</a> > New templates</h4></div>
              <div className='col-md-6 text-end'>
                <div className='btngrouprht'>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="edit-outline"></i> Edit</a>
                </div>
              </div>
            </div>

            <div className='createcertform'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Title</label>
                    <input type={'text'} className="form-control" placeholder='Title' />
                  </div>
                  <div className='row'>
                    <div className='col-md-8'>
                      <div className='form-group'>
                        <div className="input-group has-validation">
                          <span className="input-group-text">T</span>
                          <select className="form-control">
                            <option>Select font</option>
                            <option value="1">Verdana</option>
                            <option value="2">Times New Roman</option>
                            <option value="3">Open Sans</option>
                          </select>

                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <div className="input-group has-validation">
                          <select className="form-control">
                            <option>Font Size</option>
                            <option value="1">8px</option>
                            <option value="2">9px</option>
                            <option value="3">10px</option>
                          </select>

                        </div>
                      </div>

                    </div>
                  </div>


                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <div className="btn-toolbar mb-3 form-control" role="toolbar" aria-label="Toolbar with button groups">
                          <div className="btn-group me-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-secondary bold">B</button>
                            <button type="button" className="btn btn-outline-secondary italic">I</button>
                            <button type="button" className="btn btn-outline-secondary underline">U</button>
                            <button type="button" className="btn btn-outline-secondary linethrough">S</button>
                          </div>

                        </div>

                      </div>
                    </div>
                    <div className='col-md-2'>
                      <span className='pickclr' style={{ backgroundColor: '#005FFF' }}></span>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <input type={'text'} className="form-control" placeholder='#005FFF' />
                      </div>

                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Upload background picture</label>
                    <label htmlFor="file-upload" className="custom-file-upload form-control">Upload background picture <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>Background picture</p>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Upload design picture</label>
                    <label htmlFor="file-upload" className="custom-file-upload form-control">Upload design picture <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>Design picture</p>
                    </div>
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='form-group'>
                    <div className='imgpreviewbox draganddrop'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>Drag drop interface to drag uploaded design pictures above</p>
                    </div>
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='form-group'>
                    <h4 className='formsubhead'>Manage signature</h4>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Upload cancellor signature</label>
                    <label htmlFor="file-upload" className="custom-file-upload form-control">Upload cancellor signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>Cancellor signature</p>
                    </div>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Upload register signature</label>
                    <label htmlFor="file-upload" className="custom-file-upload form-control">Upload register signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>Register signature</p>
                    </div>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <label className='mb-2'>Upload president signature</label>
                    <label htmlFor="file-upload" className="custom-file-upload form-control">Upload president signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox'>
                      <i data-eva-animation="flip" data-eva="image-outline"></i>
                      <p>President signature</p>
                    </div>
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='form-group'>
                    <h4 className='formsubhead'>Manage Parameters</h4>
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{Certificate number}' />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{First Name}' />
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{Last Name}' />
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{Course}' />
                  </div>
                </div>

                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{grade}' />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <input type={'text'} className="form-control" placeholder='{batch}' />
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='form-group'>
                    <div className='btngrouprht text-end'>
                      <button type='button' className='btn btn-light btn-icon'>Preview</button>
                      <button type='button' className='btn btn-primary btn-icon'>Save</button>
                    </div>
                  </div>
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

export default CertificateTemplateCustomize;