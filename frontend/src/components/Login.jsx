import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSignIn, getUserProfile } from '../actions/exampleAction';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInInfo = useSelector(state => state.demoReducer.logInResponse);
  const userProfile = useSelector(state => state.demoReducer.userProfile);


  useEffect(() => {
    if(logInInfo.statusCode == 200 && logInInfo.data.accessToken){
      console.log('logInResponse - success');
      dispatch(getUserProfile());
    }  
  },[logInInfo]);

  useEffect(() => {
    if(userProfile.statusCode == 200){
      // console.log('userProfile');
      // console.log(userProfile.data);
      localStorage.setItem('userprofile',JSON.stringify(userProfile.data));
      navigate("/");
    }  
  },[userProfile]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email, password };
    localStorage.setItem('user_email',formData.email);
    // console.log(formData);
    let data = {
      "email": formData.email,
      "password": formData.password
    }
    dispatch(postSignIn(data));
  };

  return (
    <div className='logincon'>
      <div className='loginimg'><img src={require('../assets/images/certificate-bg.png')}  alt="certifily Logo" loading="lazy" /></div>
      <div className='loginform'>
      {/* <div class="alert alert-danger alert-top slideDown" role="alert" data-mdb-color="danger">
          A simple danger alert—check it out!
        </div> */}
        <div className="main-content">
          <div className="main-logo main-logo--cert">
            <a href="">
              <img src={require('../assets/images/logo.png')}  alt="certifily Logo" loading="lazy" />
            </a>
          </div>
          <div id="log-in" className="base-layout">
            <h5 className="title">Log in</h5>            
            <div className="remember-user">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    User Name <input type="text" name="email" value={email} onChange={handleInputChange} maxLength="80" minLength="6" className='form-control' />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Password <input type="password" name="password" value={password} onChange={handleInputChange} maxLength="80" minLength="6" className='form-control'/>
                  </label>
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-primary text-uppercase" type="submit">Log in</button>
                </div>
              </form>             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;