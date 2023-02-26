import { React, useState } from 'react';


const CreateApiToken = () => {

  const user_email = localStorage.getItem('user_email');
  const accessToken = localStorage.getItem('accessToken');
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  const userFlowAddress = userprofile.flowAddress;

  const [email, setEmail] = useState('');
  const [verifyOTP, setVerifyOTP] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email };
    if (formData.email) {
      if (!verifyOTP.includes(formData.email)) {
        setVerifyOTP([...verifyOTP, formData.email]);
      }
    }
    // console.log(verifyOTP);
  };

  const handleCopy = () => {
    const input = document.querySelector('input');
    input.select();
    document.execCommand('copy');
  };

  return (
    <div className='scrolldiv'>
       <div className="row mb-3"><div className="col-md-12 text-start"><h4 className="fw-bolder text-black text-uppercase mb-0">API Tokens</h4></div></div>
      <div className='row'>
        <div className='col-md-12 text-start'>
          <div className='row mb-3 align-items-center addemailaccount'>
            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h6 className="fw-bolder text-black text-uppercase">Create Token</h6>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className='col-md-6'>
                      <div className="mb-3 inputbtngroup">
                        <button type="submit" className='btn btn-primary btn-icon'> Generate Public Token</button>
                      </div>
                      <div className="mb-3 inputbtngroup">
                        <button type="submit" className='btn btn-primary btn-icon'> Generate Private Token</button>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className=' col-md-4'>
                        <div className="input-group mb-3 inputbtngroup">
                          <input type={'text'} name="email" value={inputValue} onChange={e => setInputValue(e.target.value)} className="form-control" placeholder='' />
                          <button onClick={handleCopy} type="submit" className='btn btn-primary btn-icon'><i data-eva="copy-outline"></i> Copy Token</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h6 className="fw-bolder text-black text-uppercase">Active Tokens</h6>

                <div className='tableblur mt-4'>
                  <div className='table-responsive'>
                    <table className="table align-middle mb-0 custable table-hover">
                      <thead className="">
                        <tr>
                          <th></th>
                          <th>Token</th>
                          <th>Created on</th>
                          <th>Verification</th>
                          {/* <th className='text-center d-none'>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>

                          <td>
                            <div className="d-flex align-items-center">
                              1
                            </div>
                          </td>
                          <td>
                            {"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuzI1NiIsInR5cCI6IkpXLCJuzI1NiIsInR5cCI6I"}
                          </td>
                          <td>
                            {"February 25, 2023"}
                          </td>
                          <td>
                            <span className='badge badge-success'>VERIFIED</span>
                          </td>

                          {/* <td className='text-center'>
                            <div className='btngrouprht'>
                              <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                            </div>
                          </td> */}
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>


          </div>

        </div>
      </div>
    </div >
  );
}

export default CreateApiToken;