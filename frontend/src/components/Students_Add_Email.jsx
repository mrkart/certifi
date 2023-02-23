import { React, useState, useEffect, useMyCustomStuff } from 'react';

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
    if(formData.email){
      if(!verifyOTP.includes(formData.email)){
        setVerifyOTP([...verifyOTP,formData.email]);
      }
    }
    // console.log(verifyOTP);
  };

  return (
    <div className='scrolldiv1'>
      <div className='row'>
        <div className='col-md-12 text-start'>
          <div className='row mb-3 align-items-center addemailaccount'>
            <div className='col-md-12 mb-3'><h4 className="fw-bolder text-black text-uppercase mb-0">Email Accounts</h4></div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className='col-md-3'>
                  <div className='fields'>
                    <input type={'text'} name="email" value={email} onChange={handleInputChange} className="form-control" placeholder='Email'/>
                  </div>
                </div>
                <div className='col-md-2'>
                  <button type="submit" className='btn btn-primary btn-icon icon-rht'>Add</button>
                </div>
              </div>
            </form>
          </div>

          <div className='row mb-3 mt-4 align-items-center'>
            <div className='col-md-12 mb-3'><h4 className="fw-bolder text-black text-uppercase mb-0">Verified Emails</h4></div>
            <div className="row">
              <div className='col-md-4'>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <th className='align-middle' scope="row">1</th>
                      <td>{user_email} <br />{userFlowAddress}</td>
                      <td className='text-success fw-bolder'>VERIFIED</td>
                      <td className='text-danger fw-bolder'>REMOVE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='row mb-3 mt-4 align-items-center verifyotp'>
            <div className='col-md-12 mb-3'><h4 className="fw-bolder text-black text-uppercase mb-0">OTP VERIFICATION</h4></div>
              <div className='col-md-4'>
              <table class="table table-borderless">
                <tbody>
                  {verifyOTP.map((user, index) => (
                    <tr key={index}>
                      <td className='align-middle'>{user}</td>
                      <td className=''>
                        <div class="otp-input-fields">
                          <input type="number" class="otp__digit otp__field__1" />
                          <input type="number" class="otp__digit otp__field__2" />
                          <input type="number" class="otp__digit otp__field__3" />
                          <input type="number" class="otp__digit otp__field__4" />
                          <input type="number" class="otp__digit otp__field__5" />
                          <input type="number" class="otp__digit otp__field__6" />
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
      </div >
    </div>
  );
}

export default StudentsAddEmail;