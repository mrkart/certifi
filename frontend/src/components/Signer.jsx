import { React, useEffect, useMyCustomStuff } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';


const Signer = () => {
  return (
    <div className='scrolldiv1'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12'><h4 className="fw-bolder text-black text-uppercase mb-0">Issue & Sign</h4></div>
            </div>
          </div>

          <div className='formscroldiv'>
                  <div className='backgroundblur text-start'>
                    <div className='certinfo'>                      
                      <div className='certinfocont1'>
                        <p>2022 - Computer Science Graduation - List 1</p>
                        <p>Total Students - 124</p>
                        <p>Download records for final verification</p>                       
                      </div>                      
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-4'>
                     <div className='backgroundblur text-center'>
                      <div className='signerboxes'>
                        <h6>Preparer Sign</h6>
                        <button type="button" class="btn btn-primary btn-icon icon-rht btn-abs btn-disabled" >Signed <i data-eva="checkmark-outline"></i></button>
                        <p>On JUL-17-2022 11:01 EST</p>
                        <p>By  Prof Charles Harper</p>
                      </div>
                     </div>
                    </div>

                    <div className='col-md-4'>
                     <div className='backgroundblur text-center'>
                      <div className='signerboxes'>
                        <h6>Verifier Sign</h6>
                        <button type="button" class="btn btn-primary btn-icon icon-rht btn-abs btn-disabled">Signed <i data-eva="checkmark-outline"></i></button>
                        <p>On JUL-17-2022 11:01 EST</p>
                        <p>By  Prof Charles Harper</p>
                      </div>
                     </div>
                    </div>

                    <div className='col-md-4'>
                     <div className='backgroundblur text-center'>
                      <div className='signerboxes'>
                        <h6>Issuer Sign</h6>
                        <button type="button" class="btn btn-light text-primary">Sign</button>                       
                        <button type="button" class="btn btn-danger">Reject</button>
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

export default Signer;