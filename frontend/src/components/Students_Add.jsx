import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonError, commonSuccess, postCreateStudent, resetAddStudent, resetAddStudentFailed } from '../actions/exampleAction';
import { useNavigate } from "react-router-dom";
import { getOrgId } from '../helpers/authData';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const StudentsAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addStudentRes = useSelector(state => state.demoReducer.addStudent);
  const addNewStudentFailed = useSelector(state => state.demoReducer.addNewStudentFailed);
  let timeout;
  useEffect(() => {
    if(addStudentRes.statusCode == 200){
      dispatch(resetAddStudent());
      dispatch(commonSuccess("Added successfully"))
      navigate("/users");
    }
  },[addStudentRes]);

  useEffect(() => {
    if(addNewStudentFailed && addNewStudentFailed.statusCode){
      console.log(addNewStudentFailed)
      dispatch(resetAddStudentFailed());
      setIsLoading(false);
      if(addNewStudentFailed.statusCode === 403){
        navigate('/login')
      }else if(addNewStudentFailed 
        && addNewStudentFailed.data 
        && addNewStudentFailed.data[0] 
        && addNewStudentFailed.data[0][0] 
        && typeof addNewStudentFailed.data[0][0] === 'string'){
          dispatch(commonError(addNewStudentFailed.data[0][0]))

      }else if(addNewStudentFailed && addNewStudentFailed.message){
        // setErroMessage(addNewStudentFailed.message);
        dispatch(commonError(addNewStudentFailed.message))

      }else{
        // setErroMessage("Unhandled error occured")
        dispatch(commonError("Unhandled error occured"))

      }
      
    }
  },[addNewStudentFailed]);

  let orgID = getOrgId();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [slot, setSlot] = useState('');
  const [number, setNumber] = useState('');
  const [erroMessage,setErroMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const [isValidPhnNo,setIsValidPhnNo] = useState(false)
  const handleSubmit = (event) => {
    setErroMessage("");
    event.preventDefault();
    const formData = { email, name, slot, number, isValidPhnNo };
    console.log(formData);
    if(!formData.email || !formData.name || !formData.slot){
      dispatch(commonError("Please fill out all below fields"))
      // setErroMessage("Please fill out all below fields");
    //   clearTimeout(timeout);
    //   timeout = setTimeout(()=>{
    //     setErroMessage("")
    // },4000)
      return;
    }
    let data = {
      "email": formData.email,
      "name": formData.name,
      "slotName": formData.slot
    }
    if(formData.number){
      if(isValidPhnNo){
        setIsLoading(true);
        data["phone"] = `+${formData.number}`
        dispatch(postCreateStudent(data,orgID));
      }else{
        // setErroMessage("Please fill valid phone number")
        dispatch(commonError("Please fill valid phone number"))
      }
    }else{
      setIsLoading(true);
      dispatch(postCreateStudent(data,orgID));
    }
    
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value.toLowerCase());
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'slot') {
      setSlot(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };
  const isNumbervalid = (value,country) => {
    if (value.match(/12345/)) {
      setIsValidPhnNo(false)
      return 'Invalid value: '+value+', '+country.name;
  } else if (value.match(/1234/)) {
    setIsValidPhnNo(false)
       return false
  } else {
    setIsValidPhnNo(true)
      return true;
  }
  }
  return (
    <div className='scrolldiv1'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
                    
            <div className='backgroundblur'>
              <div className='searchform border-none d-block'>
                <form onSubmit={handleSubmit}>
                  <div className='formscroldiv1 px-3'>
                    {/* {erroMessage &&
                      <div className="alert alert-danger text-center py-3 fade show fadein alert-top" role="alert">
                        {erroMessage}
                      </div>
                    } */}
                    <h6 className='mb-3 fw-bold'>User Details</h6>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Email *</label>
                          <input name="email" type={'text'} value={email} onChange={handleInputChange} className="form-control" placeholder='Email' />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Name *</label>
                          <input name="name" type={'text'}  value={name} onChange={handleInputChange} className="form-control" placeholder='Name' />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Contact Number</label>
                          <PhoneInput
                              value={number}
                              onChange={phone => setNumber(phone)}
                              placeholder="Contact Number"
                              inputClass="form-control"
                             
                              isValid={(value, country) => isNumbervalid(value, country)}
                            />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Batch *</label>
                          <input name="slot" type={'text'} value={slot} onChange={handleInputChange} className="form-control" placeholder='Batch' />
                        </div>
                      </div>
                    </div>
                  {/* <h6 className='my-3 fw-bold'>College Details</h6>
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
                      <select className="form-control">
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
                      <select className="form-control">
                            <option>Select Department</option>
                            <option value="1">B.Sc</option>
                            <option value="2">B.Com</option>
                            <option value="3">BCA</option>
                          </select>
                    </div>
                  </div>
                  </div> */}
                  </div>                  
                  <hr className='light-brd'/>
                  <div className='row align-items-center'>                  
                    <div className='col-12 text-center'>
                      <div className='btngrouprht'>
                        
                          {isLoading ? 
                           <button
                           type="button"
                           className="btn btn-light btn-icon btn-disabled bg-white"
                         >
                            <img src={require('../assets/images/certifi-loader.gif')} loading="lazy" width={28} /></button>: 
                            <button type="submit" className='btn btn-primary btn-icon icon-rht'>Create User</button>}
                      </div>
                    </div>
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

export default StudentsAdd;