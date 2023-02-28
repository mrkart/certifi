import { React, useState, useEffect } from 'react';
import ProfileArea from '../components/shared/ProfileArea';
import * as eva from 'eva-icons';

const CreateApiToken = () => {

  const [copySuccess,setCopySucess] = useState(false);
  let timeout;

  const user_email = localStorage.getItem('user_email');
  const accessToken = localStorage.getItem('accessToken');
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  const userFlowAddress = userprofile.flowAddress;

  const [email, setEmail] = useState('');
  const [verifyOTP, setVerifyOTP] = useState([]);
  const [inputValue, setInputValue] = useState(accessToken);

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
    setCopySucess(true);
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      setCopySucess(false)
    },4000)
  };

  useEffect(() => {eva.replace()})

  return (
    <div className='scrolldiv'>
      <div className='pageheader'>
              <div className='row mb-3 align-items-center'>
                <div className='col-md-6 text-start'>
                  <h4 className="fw-bolder text-black text-uppercase mb-0">API Tokens</h4></div>
                <div className='col-md-6 text-end'>
                  <div className='btnwithpro'>                    
                    <ProfileArea />
                  </div>
                </div>
              </div>
            </div>            
      <div className='row'>
        <div className='col-md-12 text-start'>
          <div className='row mb-3 align-items-center addemailaccount'>
            <div className='col-md-12 mb-3'>
              {/* <div className='backgroundblur'>
                <h6 className="fw-bolder text-black text-uppercase mb-3">Create Token</h6>
                <form onSubmit={handleSubmit}>
                  <div className="row">                   
                    <div className='col-md-6'>
                    <div className="mb-3 btngrouprht resbtn">
                        <button type="submit" className='btn btn-primary btn-icon'> Generate Public Key</button>
                        <button type="submit" className='btn btn-primary btn-icon'> Generate Secret Key</button>
                      </div>
                    <div className="input-group mb-3 inputbtngroup">
                          <input type={'text'} name="email" value={inputValue} onChange={e => setInputValue(e.target.value)} className="form-control" placeholder='' />
                          <button onClick={handleCopy} type="submit" className='btn btn-primary btn-icon'><i data-eva="copy-outline"></i> Copy Token</button>
                        </div>
                      </div>                          
                  </div>
                </form>
              </div> */}

            <div className="mb-3 mt-3 btngrouprht resbtn float-end">
                  <button
                      type="submit"
                      className="btn btn-primary btn-icon"
                  >
                      {' '}
                      Generate Public Key
                  </button>
                  <button
                      type="submit"
                      className="btn btn-primary btn-icon"
                  >
                      {' '}
                      Generate Secret Key
                  </button>
              </div>
            </div>
            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h6 className="fw-bolder text-black text-uppercase">API keys</h6>
                {copySuccess && (
                    <div
                        class="alert alert-success text-center py-3 fade show fadein alert-top"
                        role="alert"
                    >
                        <b>Secret key</b> copied to clipboard!
                    </div>
                )}
                <div className='tableblur mt-4'>
                  <div className='table-responsive'>
                    <table className="table align-middle mb-0 custable table-hover">
                      <thead className="">
                        <tr>
                          <th></th>
                          <th width="700">Secret key</th>
                          <th>Created on</th>
                          <th>Status</th>
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
                          <td className='accessToken'>
                            {/* {"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuzI1NiIsInR5cCI6IkpXLCJuzI1NiIsInR5cCI6I"} */}
                            {/* <span>{accessToken}</span> */}
                            <div className="input-group mb-0 inputbtngroup">
                              <input 
                                type={'text'}
                                name="apiKey" 
                                value={inputValue} 
                                onChange={e => setInputValue(e.target.value)}
                                className="form-control"
                                placeholder='' 
                                disabled={true}
                              />
                              <button 
                                onClick={handleCopy} 
                                type="submit" 
                                className='btn btn-primary btn-icon'
                              >
                                <i data-eva="copy-outline"></i> Copy Secret
                              </button>
                            </div>
                            <form>

                            </form>
                          </td>
                          <td>
                            {"February 25, 2023"}
                          </td>
                          <td>
                            <span className='badge badge-success'>ACTIVE</span>
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