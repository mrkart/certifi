import { React, useState, useEffect, useMyCustomStuff } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { postCreateStudent, resetAddStudent, resetAddStudentFailed } from '../actions/exampleAction';
import { useNavigate } from "react-router-dom";

const StudentsAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addStudentRes = useSelector(state => state.demoReducer.addStudent);
  const addNewStudentFailed = useSelector(state => state.demoReducer.addNewStudentFailed);

  useEffect(() => {
    if(addStudentRes.statusCode == 200){
      dispatch(resetAddStudent());
      navigate("/students");
    }
  },[addStudentRes]);

  useEffect(() => {
    if(addNewStudentFailed && typeof addNewStudentFailed === 'string' && addNewStudentFailed.length > 0){
      dispatch(resetAddStudentFailed());
      setIsLoading(false);
      setErroMessage(addNewStudentFailed);
    }
  },[addNewStudentFailed]);

  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let orgID = userprofile.organistaions[0]?.id;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [slot, setSlot] = useState('');
  const [number, setNumber] = useState('');
  const [erroMessage,setErroMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    setErroMessage("");
    event.preventDefault();
    const formData = { email, name, slot, number };
    console.log(formData);
    if(!formData.email || !formData.name || !formData.number || !formData.slot){
      setErroMessage("Please fill out all below fields");
      return;
    }
    setIsLoading(true);
    let data = {
      "email": formData.email,
      "name": formData.name,
      "phone": formData.number,
      "slotName": formData.slot
    }
    dispatch(postCreateStudent(data,orgID));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'slot') {
      setSlot(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <div className='scrolldiv1 mar-top'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12'><h4 className="fw-bolder text-black text-uppercase mb-0"><span className='text-dark'>Students</span> {'>'} Add Students</h4></div>
              {/* <div className='col-md-6 text-end'>
                <div className='btngrouprht'>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</a>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</a>
                </div>
              </div> */}
              </div>
            <div className='backgroundblur'>
              <div className='searchform border-none d-block'>
                <form onSubmit={handleSubmit}>
                  <div className='formscroldiv1 px-3'>
                    {erroMessage &&
                      <div class="alert alert-danger text-center col-sm-6 mx-auto py-3" role="alert">
                        {erroMessage}
                      </div>
                    }
                    <h6 className='mb-3 fw-bold'>Student Details</h6>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Email</label>
                          <input name="email" type={'text'} value={email} onChange={handleInputChange} className="form-control" placeholder='Email' />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Name</label>
                          <input name="name" type={'text'}  value={name} onChange={handleInputChange} className="form-control" placeholder='Name' />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Contact Number</label>
                          <input name="number" type={'text'}  value={number} onChange={handleInputChange} className="form-control" placeholder='Contact Number'/>
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <label className='mb-2'>Batch</label>
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
                      {isLoading ? <img src={require('../assets/images/certifi-loader.gif')} loading="lazy" /> : 
                        <button type="submit" className='btn btn-primary btn-icon icon-rht'>Create Student</button>
                      }
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