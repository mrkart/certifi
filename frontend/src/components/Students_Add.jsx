import { React, useEffect, useMyCustomStuff } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';


const StudentsAdd = () => {
  return (
    <div className='scrolldiv1'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12'><h4 class="fw-bolder text-black text-uppercase mb-0"><a href="" className='text-dark'>Students</a> {'>'} Add Students</h4></div>
              {/* <div className='col-md-6 text-end'>
                <div className='btngrouprht'>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</a>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</a>
                </div>
              </div> */}
            </div>
            <div className='backgroundblur'>
            
              <div className='searchform border-none d-block'>
              <div className='formscroldiv'>
              <h6 className='mb-3 fw-bold'>Student Details</h6>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Email</label>
                      <input type={'text'} className="form-control" placeholder='Email' />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Name</label>
                      <input type={'text'} className="form-control" placeholder='Name' />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Last Name</label>
                      <input type={'text'} className="form-control" placeholder='Last Name' />
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Contact Number</label>
                      <input type={'text'} className="form-control" placeholder='Contact Number'/>
                    </div>
                  </div>
                  </div>
                  <h6 className='my-3 fw-bold'>College Details</h6>
                  <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>College Name</label>
                      <input type={'text'} className="form-control" placeholder='College Name' />
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Batch</label>
                      <select class="form-control">
                            <option>Select Batch</option>
                            <option value="1">2020</option>
                            <option value="2">2021</option>
                            <option value="3">2022</option>
                          </select>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Department</label>
                      <select class="form-control">
                            <option>Select Department</option>
                            <option value="1">B.Sc</option>
                            <option value="2">B.Com</option>
                            <option value="3">BCA</option>
                          </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='light-brd'/>
              <div className='row align-items-center'>                  
                  <div className='col-12 text-center'>
                    <div className='btngrouprht'>
                      <button className='btn btn-primary btn-icon icon-rht'>Submit</button>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsAdd;