import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSignIn, getUserProfile, resetLoginInfo, resetUserProfile, resetUserProfileFailed, resetLoginInfoFailed } from '../actions/exampleAction';
import { useNavigate, NavLink } from "react-router-dom";
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase-config';
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInInfo = useSelector(state => state.demoReducer.logInResponse);
  const userProfile = useSelector(state => state.demoReducer.userProfile);
  const userProfilefailed = useSelector(state => state.demoReducer.userProfileFailed);
  const logInResponseFailed = useSelector(state => state.demoReducer.logInResponseFailed);

  const [isLoading, setIsLoading] = useState(false)
  const [erroMessage, setErroMessage] = useState("");

  useEffect(() => {
    if (logInInfo && logInInfo.statusCode == 200 && logInInfo.data.accessToken) {

      dispatch(resetLoginInfo())
      console.log('logInResponse - success');
      dispatch(getUserProfile());
    }
  }, [logInInfo]);

  useEffect(() => {
    if (userProfile && userProfile.statusCode == 200) {
      setIsLoading(false)
      // console.log('userProfile');
      // console.log(userProfile.data);
      dispatch(resetUserProfile())
      localStorage.setItem('userprofile', JSON.stringify(userProfile.data));
      navigate("/");
    }
  }, [userProfile]);

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
    setErroMessage("");
    event.preventDefault();
    setIsLoading(true)
    const formData = { email, password };
    localStorage.setItem('user_email', formData.email);
    // console.log(formData);
    if (!formData.email || !formData.password) {
      setErroMessage("Please fill out all below fields");
      setIsLoading(false)
      return;
    }
    let data = {
      "email": formData.email,
      "password": formData.password
    }
    dispatch(postSignIn(data));
  };
  useEffect(() => {
    if (userProfilefailed && typeof userProfilefailed === 'string' && userProfilefailed.length > 0) {
      setIsLoading(false)
      setErroMessage(userProfilefailed);
      dispatch(resetUserProfileFailed())
    }
  }, [userProfilefailed]);
  useEffect(() => {
    if (logInResponseFailed && typeof logInResponseFailed === 'string' && logInResponseFailed.length > 0) {
      setIsLoading(false)
      setErroMessage(logInResponseFailed);
      dispatch(resetLoginInfoFailed())
    }
  }, [logInResponseFailed]);
//   const signUp = (email, password) => {
//     setIsLoading(true)

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((response) => {

//             localStorage.setItem('accessToken', response._tokenResponse.refreshToken)
//             localStorage.setItem('user_email', email);

//             navigate("/");
//         })
//         .catch((error) => {
//             setIsLoading(false)
//             if (error.code === 'auth/email-already-in-use') {
//                 setErroMessage('Email Already in Use');
//             }
//         })
// }
  return (
    <div className='logouter'>
    <div className='logincon'>
      <div className='loginimg'>
        <img src={require('../assets/images/login-bg.jpg')} alt="" loading="lazy" />
        <div className='logtxtbox'>
          <h1>Documents repository on <span className='dartxtclr'>blockchain</span></h1>
        </div>
        </div>
      <div className='loginform fadein'>
        {erroMessage &&
          <div className="alert alert-danger alert-top slideDown" role="alert" data-mdb-color="danger">
            {erroMessage}
          </div>
        }
        <div className="main-content">
          <div className="main-logo main-logo--cert">
            <a href="">
              <img src={require('../assets/images/logo.png')} alt="certifily" loading="lazy" />
            </a>
          </div>
          <div id="log-in" className="base-layout">
            <h5 className="title">Create an Account</h5>
            <p className='lighttxtclr mb-5'>Enter the information to register.</p>
            <div className="remember-user">
              <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor='username'>User name</label>
                  <input id='username' type="text" name="text" maxLength="80" minLength="6" className='form-control' />
                </div>
                <div className="form-group">
                  <label htmlFor='email'>Email</label>
                  <input id='email' type="text" name="email" value={email} onChange={handleInputChange} maxLength="80" minLength="6" className='form-control' />
                </div>
                <div className="form-group">
                  <label htmlFor='password'>Password</label>
                  <input id='password' type="password" name="password" value={password} onChange={handleInputChange} maxLength="80" minLength="6" className='form-control' />
                </div>  
                <div className="form-group">
                  <label htmlFor='Confirmpassword'>Confirm Password</label>
                  <input id='Confirmpassword' type="password" name="Confirm-password" value={password} onChange={handleInputChange} maxLength="80" minLength="6" className='form-control' />
                </div>               
                <div className="form-group text-center loginbtn">

                  {isLoading ?
                    <button
                      type="button"
                      className="btn btn-light btn-icon btn-disabled bg-white"
                    >

                      <img
                        src={require('../assets/images/certifi-loader.gif')}
                        loading="lazy"
                        alt="Loading..." width={28}
                      />
                    </button>
                    :
                    <button className="btn btn-primary text-uppercase" type="submit">Create Account
                    </button>}

                </div>

              
                <div className='form-group text-center mt-5'>
                  Already have an account? <NavLink to="/login" className="text-underline">Login</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
