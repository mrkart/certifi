import { React, useState, useEffect, useMyCustomStuff } from 'react';
import * as eva from 'eva-icons';

const StudentsAddEmail = () => {

  const user_email = localStorage.getItem('user_email');
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  const userFlowAddress = userprofile.flowAddress;

  const [email, setEmail] = useState('');
  const [verifyOTP, setVerifyOTP] = useState([]);

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
  useEffect(() => { eva.replace() });
  return (
    <div className='scrolldiv'>
      <div className='row'>
        <div className='col-md-12 text-start'>
          <div className='row mb-3 align-items-center addemailaccount'>
            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h4 className="fw-bolder text-black text-uppercase">Email Accounts</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className='col-md-4'>
                      <div className="input-group mb-3 inputbtngroup">
                        <input type={'text'} name="email" value={email} onChange={handleInputChange} className="form-control" placeholder='Email' />
                        <button type="submit" className='btn btn-primary btn-icon'><i data-eva="plus-outline"></i> Add</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h4 className="fw-bolder text-black text-uppercase">Verified Emails</h4>

                <div className='tableblur mt-4'>
                  <div className='table-responsive'>
                    <table className="table align-middle mb-0 custable table-hover">
                      <thead className="">
                        <tr>
                          <th></th>
                          <th>Email Id</th>
                          <th>Flow Address</th>
                          <th>Verification</th>
                          <th className='text-center'>Action</th>
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
                            {user_email}
                          </td>
                          <td>
                            {userFlowAddress}
                          </td>
                          <td>
                            <span className='badge badge-success'>VERIFIED</span>
                          </td>

                          <td className='text-center'>
                            <div className='btngrouprht'>
                              <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>


            <div className='col-md-12 mb-3'>
              <div className='backgroundblur verifyotp'>
                <h4 className="fw-bolder text-black text-uppercase mb-0">OTP VERIFICATION</h4>

                <table className="table table-borderless verifytable">
                  <tbody>
                    {verifyOTP.map((user, index) => (
                      <tr key={index}>
                        <td className='align-middle'>{user}</td>
                        <td className=''>
                          <div className="otp-input-fields">
                            <input type="number" className="otp__digit otp__field__1" />
                            <input type="number" className="otp__digit otp__field__2" />
                            <input type="number" className="otp__digit otp__field__3" />
                            <input type="number" className="otp__digit otp__field__4" />
                            <input type="number" className="otp__digit otp__field__5" />
                            <input type="number" className="otp__digit otp__field__6" />
                          </div>
                        </td>
                        <td className='text-success fw-bolder align-middle'>VERIFY</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div >

  );
}

export default StudentsAddEmail;