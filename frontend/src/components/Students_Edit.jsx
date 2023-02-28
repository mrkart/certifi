import { React, useState, useEffect, useMyCustomStuff } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putUserDetails, getUserByID, resetUserbyid, resetEdituser } from '../actions/exampleAction';
import { useNavigate } from "react-router-dom";

const StudentsEdit = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('')
  // console.log(params.studentId);

  const studentID = params.studentId;
  const edituser = useSelector(state => state.demoReducer.edituser);
  const userbyid = useSelector(state => state.demoReducer.userbyid);

  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let orgID = userprofile.organistaions[0]?.id;

  useEffect(() => {
    if(edituser.statusCode == 200){
      dispatch(resetEdituser());
      navigate("/students");
    }
  },[edituser]);

  useEffect(() => {
    if(userbyid.statusCode == 200){
      dispatch(resetUserbyid());
      // console.log(userbyid.data.orgUser);
      setEmail(userbyid.data.orgUser.email);
      setName(userbyid.data.orgUser.name);
      setBatch(userbyid.data.orgUser.slot[0].name);
      setNumber(userbyid.data.orgUser.phone);
      setAddress(userbyid.data.orgUser.flowAddress)
    }
  },[userbyid]);

  useEffect(() => {
    dispatch(getUserByID(orgID,studentID));
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email, name, batch, number };
    console.log(formData);
    let data = {
      "email": formData.email,
      "name": formData.name,
      "phone": formData.number,
      "slotName": formData.batch
    }
    dispatch(putUserDetails(data,orgID,studentID));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'batch') {
      setBatch(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <div className='scrolldiv1'>
      <div className='row '>
        <div className='col-md-12 text-start'>
          <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12'><h4 className="fw-bolder text-black text-uppercase mb-0"><a href="" className='text-dark'>Users</a> {'>'} Edit Users</h4></div>
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
              <div className='formscroldiv px-3'>
              <h6 className='mb-3 fw-bold'>User Details</h6>
                <div className='row'>
                <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>User ID</label>
                      <input name="studentid" onChange={handleInputChange} value={studentID} type={'text'} className="form-control" placeholder='Email' disabled />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Email</label>
                      <input name="email" onChange={handleInputChange} value={email} type={'text'} className="form-control" placeholder='Email' disabled/>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Name</label>
                      <input name="name" onChange={handleInputChange} value={name} type={'text'} className="form-control" placeholder='Name' />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Contact Number</label>
                      <input name="number" onChange={handleInputChange} value={number} type={'text'} className="form-control" placeholder='Contact Number' />
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Batch</label>
                      <input name="batch" onChange={handleInputChange} value={batch} type={'text'} className="form-control" placeholder='Batch' disabled/>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Flow Address</label>
                      <input name="batch" onChange={handleInputChange} value={address} type={'text'} className="form-control" placeholder='Address' disabled/>
                    </div>
                  </div>
                  </div>
                  {/* <h6 className='my-3 fw-bold'>College Details</h6>
                  <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>College Name</label>
                      <input type={'text'} className="form-control" placeholder='College Name' value={''} />
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label className='mb-2'>Batch</label>
                      <select className="form-control">
                            <option>Select Batch</option>
                            <option value="1" selected>2020</option>
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
                            <option value="3" selected>BCA</option>
                          </select>
                    </div>
                  </div>
                </div>*/}
              </div>
              <hr className='light-brd'/>
              <div className='row align-items-center'>                  
                <div className='col-12 text-center'>
                  <div className='btngrouprht'>
                    <button className='btn btn-primary btn-icon icon-rht'>Save</button>
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

export default StudentsEdit;