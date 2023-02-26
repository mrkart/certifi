import { Fragment, React, useEffect, useMyCustomStuff, useState } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import Stepper from "react-stepper-horizontal";
import * as eva from 'eva-icons';
import { useDispatch, useSelector } from 'react-redux';
import { generateCertificate, getUserList, getWalletAddress, mintCertificate, resetGenerateCertificate, resetMintCertificate, resetMintCertificateFailed } from '../actions/exampleAction';
import TableLoader from './shared/TableLoader';
import { signMessage } from '../utils/generateSign';
import SuccessModal from './shared/MintSuccessModal';
import FullLoader from './shared/FullLoader';
import { useNavigate } from 'react-router-dom';
import FailureModal from './shared/MintFailureModal';
import { getUserAddress } from '../utils/utils';
import { connectBlocto, isConnectWallet } from '../helpers/ConnectWallet';
import { NavLink } from 'react-router-dom';

const Issue_Certificate = () => {

  const [stepper, setStepper] = useState(0);
  const [selectedType, setSelectedType] = useState(false)
  const [title, setTitle] = useState('Course Certificate')
  const [fontOption, setFontOption] = useState('1')
  const [fontSize, setFontSize] = useState('2')
  const [selectedStyle, setSelectedStyle] = useState('italic')
  const [color, setColor] = useState('#005FFF')
  const [certificateNo, setCertificateNo] = useState('9210')
  const [firstName, setFirstName] = useState('William')
  const [userName, setUserName] = useState('')
  const [lastName, setLastName] = useState('a. Young')
  const [course, setCourse] = useState('Bachelor of engineering')
  const [grade, setGrade] = useState('A')
  const [batch, setBatch] = useState('2023')
  const [selectedUser,setSelectedUser] = useState(0)
  const [selectedUserDetail,setSelectedUserDetail] = useState({})
  const dispatch = useDispatch();
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  let orgID = userprofile && userprofile.organistaions[0]?.id;

  const fulluserlist = useSelector(state => state.demoReducer.userlist);
  const downloadCertificate = useSelector(state => state.demoReducer.generatedCertificate);
  const mintCertificateRes = useSelector(state => state.demoReducer.mintResponse);
  const mintCertificateFailed = useSelector(state => state.demoReducer.mintFailed);

  
  const [userlist, setUserlist] = useState([]);
  const [certificatePreview, setCertificatePreview] = useState('')
  const [blobData, setBlobData] = useState({})
  const [coursename, setCoursename] = useState('');
  const [stuGrad, setStuGrad] = useState('');
  const [batchno, setBatchno] = useState('');
  const [cnumber, setCNumber] = useState('');
  const [isCertificateSelect, setIsCertificateSelect] = useState(false)

  const [fineToSelectUser, setFineToSelectUser] = useState(false)
  const [fineToGetCertInfo, setFineToGetCertInfo] = useState(false)
  const [fineToSelectCertificate, setFineToSelectCertificate] = useState(false)
  const [callBack, setCallBack] = useState(false)
  const [recentCourse, setRecentCourse] = useState(false);
  const [recentGrade, setRecentGrade] = useState(false);

  //mint
  const [isMintInitiated, setIsMintInitiated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [approveToMint, setApproveToMint] = useState(false)
  const [mintFailed, setMintFailed] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    eva.replace()
  })
  const handleSelectMinType = () => {
    setSelectedType(true)
    dispatch(getUserList(orgID));
  }
  const onChangeValue = (e) => { }

  const triggerCourseChange = (event) => {
    console.log(event.target.innerText);
    setCoursename(event.target.innerText);
  }
  const triggerGradeChange = (event) => {
    console.log(event.target.innerText);
    setStuGrad(event.target.innerText);
  }
  const handleInputFocusCourse = () => {
    setRecentCourse(true);
  }
  const handleInputBlurCourse = () => {
    setTimeout(() => {
      setRecentCourse(false);
    }, 500);
  }
  const handleInputFocusGrade = () => {
    setRecentGrade(true);
  }
  const handleInputBlurGrade = () => {
    setTimeout(() => {
      setRecentGrade(false);
    }, 500);
  }
  
  // useEffect(() => {
  //   dispatch(getUserList(orgID));
  // }, []);

  useEffect(() => {
    if (fulluserlist && fulluserlist.statusCode == 200 && fulluserlist.data && fulluserlist.data.orgUsers) {
      let data = fulluserlist.data.orgUsers;
      // setTimeout(() => {
        setUserlist(data);
      // }, 1000);
    }
  }, [fulluserlist]);
  const handleselectUser = (user) => {
    if (user && user.id) {
      setSelectedUser(user.id)
      setSelectedUserDetail(user)
      setFineToSelectUser(true)
      localStorage.setItem('selectedStudent', JSON.stringify(user))
      if (user && user.slot && user.slot[0] && user.slot[0].name) {
        setBatchno(user.slot[0].name)
      }

    }

  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'coursename') {
      setCoursename(value);
      setCallBack(true)
    } else if (name === 'stuGrad') {
      setStuGrad(value);
      setCallBack(true)
    } else if (name === 'batchno') {
      setBatchno(value);
      setCallBack(true)
    } else if (name === 'cnumber') {
      setCNumber(value);
      setCallBack(true)
    }
  };
  const SelectStudent = (event) => {
    // let classname = event.currentTarget.getAttribute('class');
    let dataUser = JSON.parse(event.currentTarget.getAttribute('data-user'));
    // const checkbox = document.getElementById(classname);
    handleselectUser(dataUser)
    // console.log(dataUser);
    // checkbox.checked = true;
  }
  const movewithInfo = () => {
    const formData = { coursename, stuGrad, batchno, cnumber };
    let data = {
      "coursename": formData.coursename,
      "grade": formData.stuGrad,
      "batch": formData.batchno,
      "certificateNumber": formData.cnumber
    }
    localStorage.setItem('certInfo', JSON.stringify(data))
    setStepper(stepper + 1)

  }
  useEffect(() => {
    if (downloadCertificate && downloadCertificate.status === 200) {
      var blob = new Blob([downloadCertificate.data], { type: "application/pdf" });
      var blob_url = URL.createObjectURL(blob);
      setCertificatePreview(blob_url)
      setBlobData(downloadCertificate.data)
      dispatch(resetGenerateCertificate())
    }

  }, [downloadCertificate])

  const moveWithCertificatePreview = () => {
    let userDetail = JSON.parse(localStorage.getItem('selectedStudent'));
    let certDetail = JSON.parse(localStorage.getItem('certInfo'));

    if (userDetail && userDetail.id) {
      const userId = userDetail.id
      const slotId = userDetail.slot && userDetail.slot[0]?.id
      setUserName(userDetail.name);
      if (certDetail && certDetail.coursename) {
        let obj = {
          "courseName": certDetail.coursename,
          "grade": certDetail.grade,
          "slotId": slotId,
          "certificateNumber": certDetail.certificateNumber
        }
        setCertificatePreview('')
        dispatch(generateCertificate(orgID, userId, obj))
      }


    }
    setStepper(stepper + 1)


  }
  const generateSign = async () => {
    
    if(isConnectWallet()){
      initiateSignScript()
    }else{
      const wallet = await connectBlocto()
      if(wallet && wallet.walletAddress){
        initiateSignScript()
      }
    }
    
    

  }
  const initiateSignScript = async () => {
    const response = await signMessage()
    if(response){
      dispatch(getWalletAddress())
    }
    if(response && response[0] && response[0].addr){
      setApproveToMint(true)
      mintCert()
    }
  }
  const backtoSelectStuStep = () => {
    setStepper(stepper - 1)
  }

  useEffect(() => {
    setCallBack(false)
    if (coursename && stuGrad && batchno && cnumber) {
      setFineToGetCertInfo(true)

    } else {
      setFineToGetCertInfo(false)
    }
  }, [callBack])

  const handleSelectCertificatetheme = () => {
    setFineToSelectCertificate(true)
    setIsCertificateSelect(true)
  }
  const mintCert = () => {
    let userDetail = JSON.parse(localStorage.getItem('selectedStudent'));
    let certDetail = JSON.parse(localStorage.getItem('certInfo'));

    if(userDetail && userDetail.id){
      const userId = userDetail.id
      const slotId = userDetail.slot && userDetail.slot[0]?.id
      if(certDetail && certDetail.coursename){
        let obj = {
          "courseName": certDetail.coursename,
          "grade": certDetail.grade,
          "slotId": slotId,
          "certificateNumber": certDetail.certificateNumber
        }
        dispatch(mintCertificate(orgID,userId,obj))
        setIsLoading(true)
      }
      
      
    }
  }
  useEffect(() => {
    if(mintCertificateRes && mintCertificateRes.statusCode === 201){
      dispatch(resetMintCertificate())
      setIsLoading(false)
      setIsMintInitiated(true)
      localStorage.removeItem('selectedStudent')
      localStorage.removeItem('certInfo')
    }
  },[mintCertificateRes])
  useEffect(() => {
    if(mintCertificateFailed && typeof mintCertificateFailed === 'string' && mintCertificateFailed.length > 0){
      dispatch(resetMintCertificateFailed())
      setIsLoading(false)
      setMintFailed(true)
    }
  })

  const closeModal = () => {
    setIsMintInitiated(false)
    setSelectedType(false)
    setApproveToMint(false)
    setCertificatePreview(false)
    setCoursename('')
    setStuGrad('')
    setBatchno('')
    setCNumber('')
    setIsCertificateSelect(false)
    setFineToSelectUser(false)
    setFineToGetCertInfo(false)
    setFineToSelectCertificate(false)
    setMintFailed(false)
    setStepper(0)
    navigate('/')
  }
  const closefailedModal = () => {
    setIsMintInitiated(false)
    setSelectedType(false)
    setApproveToMint(false)
    setCertificatePreview(false)
    setCoursename('')
    setStuGrad('')
    setBatchno('')
    setCNumber('')
    setIsCertificateSelect(false)
    setFineToSelectUser(false)
    setFineToGetCertInfo(false)
    setFineToSelectCertificate(false)
    setMintFailed(false)
    setStepper(0)
    navigate('/')
  }
  return (
    <Fragment>
      {!selectedType ? <div className='scrolldiv mar-top'>
        <div className='row '>
          <div className='col-md-12 text-start'>
            <div className=''>
              <div className='row mb-3 align-items-center'>
                <div className='col-md-12 text-center'>
                  <h4 className="fw-bolder text-black text-uppercase mb-2">Mint</h4>
                  <h6 className='mb-3'>Select a document type to be minted as NFT</h6>
                </div>
              </div>
            </div>

            <div className='certtemplates mintnft'>
              <div className='row'>
                <div className="col-6 col-md-4">
                  <div className='ctemp' onClick={handleSelectMinType}>
                    <input type={'radio'} id="certselect-1" name='cerselect'  />
                    <label className='backgroundblur' htmlFor="certselect-1">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Certificate</h3>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-4 " >
                  <div className='ctemp dis-bfore' >
                    <input type={'radio'} id="certselect-2" name='cerselect' />
                    <label className='backgroundblur' htmlFor="certselect-2">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Certifily-icon-1.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Agreement | Contract</h3>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-4 ">
                  <div className='ctemp dis-bfore' >
                    <input type={'radio'} id="certselect-3" name='cerselect' />
                    <label className='backgroundblur' htmlFor="certselect-3">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Membership</h3>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-4 ">
                  <div className='ctemp dis-bfore' >
                    <input type={'radio'} id="certselect-4" name='cerselect' />
                    <label className='backgroundblur' htmlFor="certselect-4">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Group-16-1.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Letter</h3>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-4 ">
                  <div className='ctemp dis-bfore' >
                    <input type={'radio'} id="certselect-5" name='cerselect' />
                    <label className='backgroundblur' htmlFor="certselect-5">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Cards</h3>
                    </label>
                  </div>
                </div>

                <div className="col-6 col-md-4 ">
                  <div className='ctemp dis-bfore'>
                    <input type={'radio'} id="certselect-6" name='cerselect' />
                    <label className='backgroundblur' htmlFor="certselect-6">
                      <div className='img'>
                        <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                      </div>
                      <h4>Mint a</h4>
                      <h3>Tickets</h3>
                    </label>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div> :
        <div className='scrolldiv1 mar-top'>
          <div className='row '>
            <div className='col-md-12 text-start'>
              <div className=''>
                <div className='row mb-3 align-items-center'>
                  <div className='col-md-12'>
                    <div className='userOrg'>
                      <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                      <h4 className="fw-bolder text-black text-uppercase mb-0">Mint Certificate</h4>
                    </div>
                      </div>
                </div>
              </div>
              <div>   
              {isMintInitiated ? <SuccessModal closemodal={closeModal}/> : ''}
              {isLoading ? <FullLoader/> : ''}
              {mintFailed ? <FailureModal closemodal={closefailedModal}/> : ''}
                <div className="certsteps mb-3">
                  <Stepper
                  activeTitleColor={'#005fff'}
                  activeColor={'#005fff'}
                  completeColor={'#111'}
                  completeTitleColor={'#111'}
                  completeBorderColor={'#111'}
                  completeBarColor={'#111'}
                  steps={[
                    { title: 'Select students', className: 'certsteps' },
                    { title: 'Certification info', className: 'certsteps' },
                    { title: 'Select template', className: 'certsteps' },
                    { title: 'Customize template', className: 'certsteps' },
                    { title: 'Preview', className: 'certsteps' },
                    { title: 'Signers', className: 'certsteps' }
                  ]} activeStep={stepper} />
                </div>
                {stepper === 0 &&
                  <div className=''>
                    <div className='formscroldiv fadein'>
                      <div className='searchform border-none'>
                        <div className='fields txtfields'>Cert batch name</div>
                        <div className='fields'>
                          <select className='form-control'>
                            <option>2023-Computer-Science-Graduation - List 1 (300 Students)</option>
                          </select>
                        </div>
                        <div className='fields text-end'>
                        <div className='btngrouprht'>
                            <NavLink to="/add-student" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="plus-outline"></i> Add students</NavLink>
                            <NavLink to="/students-import" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import students</NavLink>                           
                          </div>
                        </div>
                      </div>
                      {userlist.length == 0 ? (
                        <TableLoader />
                      ) : (
                        <div className='tableblur'>
                          <div className='searchform pt-0'>
                            <div className='fields'>Search & Filters</div>
                            <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                            <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                            <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email' /></div>
                            <div className='fields'>
                              <select className="form-control">
                                <option defaultValue>Import slot</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                              </select>

                            </div>
                          </div>
                          <div className='table-responsive'>
                            <table className="table align-middle mb-0 custable table-hover" >
                              <thead className="">
                                <tr>
                                  <th></th>
                                  <th>Student ID</th>
                                  <th>Email</th>
                                  <th>Name</th>
                                  <th>Batch</th>
                                  <th>Status</th>
                                  {/* <th className='text-center'>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {userlist.map((user, index) => (
                                  <tr key={index} onClick={SelectStudent} data-user={JSON.stringify(user)}>
                                    <td>
                                      <div className="form-group">
                                        <input 
                                          type="checkbox" 
                                          className="form-check-input" 
                                          id={`exampleCheck${index}`} 
                                          checked={selectedUser === user.id} 
                                          onChange={() => handleselectUser(user)} 
                                        />
                                        <label className="form-check-label" htmlFor={`exampleCheck${index}`}></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        {user.id}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="text-dark">{user.email}</span>
                                    </td>
                                    <td>
                                      <p className="fw-normal mb-1">{user.name}</p>
                                    </td>
                                    <td> {user.slot[0].name} </td>
                                    <td>
                                      <span className="text-primary">Approved</span>
                                    </td>
                                    {/* <td className='text-center'>
                                      <div className='btngrouprht'>                                      
                                        <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                      </div>
                                    </td> */}
                                  </tr>
                                ))}

                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {/* <div className='tableblur mt-4'>
                        <div className='searchform'>
                          <div className='fields'>Search & Filters</div>
                          <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                          <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                          <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email' /></div>
                          <div className='fields'>
                            <select className="form-control">
                              <option selected>Import slot</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                            </select>

                          </div>
                        </div>
                        <div className='table-responsive'>
                          <table className="table align-middle mb-0 custable table-hover" >
                            <thead className="">
                              <tr>
                                <th>
                                  <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck1" /><label className="form-check-label" htmlFor="exampleCheck1"></label></div>
                                </th>
                                <th>Student ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Status</th>
                                <th className='text-center'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    1
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark">anderson@gmail.com</span>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">Anderson</p>
                                </td>
                                <td> 2022 </td>
                                <td>
                                  <span className="text-primary">Approved</span>
                                </td>
                                <td className='text-center'>
                                  <div className='btngrouprht'>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                  </div>
                                </td>

                              </tr>
                              <tr>
                                <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck3" /><label className="form-check-label" htmlFor="exampleCheck3"></label></div></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    2
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark">adam@gmail.com</span>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">Adam</p>
                                </td>
                                <td> 2021 </td>
                                <td>
                                  <span className="text-primary">Approved</span>
                                </td>
                                <td className='text-center'>
                                  <div className='btngrouprht'>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck4" /><label className="form-check-label" htmlFor="exampleCheck4"></label></div></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    3
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark">sean@gmail.com</span>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">Sean</p>
                                </td>
                                <td> 2020 </td>
                                <td>
                                  <span className="text-primary">Approved</span>
                                </td>
                                <td className='text-center'>
                                  <div className='btngrouprht'>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck5" /><label className="form-check-label" htmlFor="exampleCheck5"></label></div></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    4
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark">taylor@gmail.com</span>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">Taylor</p>
                                </td>
                                <td> 2019 </td>
                                <td>
                                  <span className="text-primary">Approved</span>
                                </td>
                                <td className='text-center'>
                                  <div className='btngrouprht'>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck6" /><label className="form-check-label" htmlFor="exampleCheck6"></label></div></td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    5
                                  </div>
                                </td>
                                <td>
                                  <span className="text-dark">anderson@gmail.com</span>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">Anderson</p>
                                </td>
                                <td> 2022 </td>
                                <td>
                                  <span className="text-danger">Decline</span>
                                </td>
                                <td className='text-center'>
                                  <div className='btngrouprht'>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                    <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div> */}

                    </div>

                    <div className='row align-items-center'>
                      {/* <div className='col-6'>Totally <span className='fw-bold'>125</span> students seclected</div> */}
                      <div className='col-12 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)} disabled={!fineToSelectUser}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                        </div>
                      </div>
                    </div>

                  </div>
                }
                {stepper === 1 &&
                  <div className=''>
                    <div className='formscroldiv fadein'>
                      <div className='backgroundblur text-start p-15px mt-3'>
                        <div className='createcertform'>
                          <div className='row'>
                            <div className='col-md-4 offset-md-4'>
                              <div className='form-group'>
                                <label className='mb-2'>Course <span className='btn btn-light btn-tran'><i data-eva="edit-outline"></i> Edit</span></label>
                                <input 
                                  type={'text'} 
                                  className="form-control" 
                                  placeholder='Course' 
                                  onChange={handleInputChange} 
                                  value={coursename} 
                                  name="coursename"
                                  onBlur={handleInputBlurCourse} 
                                  onFocus={handleInputFocusCourse} 
                                />
                              </div>
                              </div>

                              { recentCourse &&
                                <div className='col-md-4 fadein'>
                                  <div className='form-group'>
                                    <label className='mb-2 fw-bold'>Recent Courses </label>
                                    <div className='listcorgrade'>
                                      <span className='badge badge-primary' onClick={triggerCourseChange}>B.Sc</span>
                                      <span className='badge badge-primary' onClick={triggerCourseChange}>BCA</span>
                                      <span className='badge badge-primary' onClick={triggerCourseChange}>MCA</span>
                                      <span className='badge badge-primary' onClick={triggerCourseChange}>M.Sc</span>
                                      <span className='badge badge-primary' onClick={triggerCourseChange}>B.Com</span>
                                    </div>
                                  </div>
                                </div>
                              }
                              <div className='col-md-4 offset-md-4'>
                              <div className='form-group'>
                                <label className='mb-2'>Grade <span className='btn btn-light btn-tran'><i data-eva="edit-outline"></i> Edit</span></label>
                                <input 
                                  type={'text'} 
                                  className="form-control" 
                                  placeholder='Grade' 
                                  onChange={handleInputChange} 
                                  value={stuGrad} 
                                  name="stuGrad"
                                  onBlur={handleInputBlurGrade} 
                                  onFocus={handleInputFocusGrade} 
                                />
                              </div>
                              </div>
                              { recentGrade &&
                              <div className='col-md-4 fadein'>
                                <div className='form-group'>
                                  <label className='mb-2 fw-bold'>Recent Grades</label>
                                  <div className='listcorgrade'>
                                    <span className='badge badge-primary' onClick={triggerGradeChange}>A</span>
                                    <span className='badge badge-primary' onClick={triggerGradeChange}>B</span>
                                    <span className='badge badge-primary' onClick={triggerGradeChange}>C</span>
                                    <span className='badge badge-primary' onClick={triggerGradeChange}>D</span>
                                    <span className='badge badge-primary' onClick={triggerGradeChange}>E</span>
                                  </div>
                                </div>
                              </div>
                              }
                              <div className='col-md-4 offset-md-4'>
                              <div className='form-group'>
                                <label className='mb-2'>Batch <span className='btn btn-light btn-tran'><i data-eva="edit-outline"></i> Edit</span></label>
                                <input type={'text'} className="form-control" placeholder='Batch' onChange={handleInputChange} value={batchno} name="batchno" readOnly />
                              </div>

                              <div className='form-group'>
                                <label className='mb-2'>Certificate Number <span className='btn btn-light btn-tran'><i data-eva="edit-outline"></i> Edit</span></label>
                                <input type={'text'} className="form-control" placeholder='Certificate Number' onChange={handleInputChange} value={cnumber} name="cnumber" />
                              </div>
                            
                          
                        </div>
                        {/* <div className='certinfo'>
                      <p>Upload a CSV/XLS file with student ID & their certification info</p>
                      <div className='certinfocont'>
                        <p>Course</p>
                        <p>Grade</p>
                        <p>Batch</p>
                        <p>Certificate Number</p>
                      </div>
                      <h3>Download CSV File</h3>

                      <div className='form-group'>
                        <label htmlFor="file-upload" className="custom-file-upload btn btn-primary btn-icon icon-rht">Upload File <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                        <input id="file-upload" type="file" />
                      </div>

                      <p className='text-secondary'>CSV, XLS only - Maximum 10000 records</p>
                    </div> */}
                      </div>
                    </div>
                    </div>
                    </div>
                    <div className='row align-items-center'>
                      <div className='col-6'>
                        <div className='btngrouprht'>
                          <button className='btn btn-light btn-icon' onClick={backtoSelectStuStep}><i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                        </div>
                      </div>
                      <div className='col-6 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' onClick={movewithInfo} disabled={!fineToGetCertInfo}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {stepper === 2 &&
                   <div className=''>
                    <div className='formscroldiv fadein'>
                      {/* <div className='certempfrm'>
                    <div className='row'>
                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Graduation Certificate Layout</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>

                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Course certificate 2</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>
                    </div>

                  </div> */}
                      <div className='certtemplates'>
                        <div className='row'>
                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp' onClick={() => setStepper(stepper + 1)}>
                              <input type={'radio'} id="certselect-1" name='cerselect' checked={isCertificateSelect} onChange={handleSelectCertificatetheme} />
                              <label className='backgroundblur' htmlFor="certselect-1">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Golden Border</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-2" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-2">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert2.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Filled Header</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-3" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-3">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert3.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Corner Frame</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-4" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-4">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert4.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Bottom Corner Badge</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-5" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-5">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert5.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Badge with Ribben</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-6" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-6">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert6.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Classic</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-7" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-7">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert7.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Filled header and Badge with Ribben</div>
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6 col-md-4 6 col-lg-3">
                            <div className='ctemp dis-bfore' >
                              <input type={'radio'} id="certselect-8" name='cerselect' />
                              <label className='backgroundblur' htmlFor="certselect-8">
                                <div className='img'>
                                  <img src={require('../assets/images/cert/cert8.png')} loading="lazy" />
                                </div>
                                <div className='cername'>Outer Frame</div>
                              </label>
                            </div>
                          </div>


                        </div>
                      </div>

                    </div>
                    <div className='row align-items-center'>
                      <div className='col-6'>
                        <div className='btngrouprht'>
                          <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                        </div>
                      </div>
                      <div className='col-6 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)} disabled={!fineToSelectCertificate}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {stepper === 3 &&
                   <div className=''>
                    <div className='formscroldiv fadein'>
                      <div className='createcertform backgroundblur text-start p-15px mb-3'>
                        <div className='row'>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label className='mb-2'>Title</label>
                              <input type={'text'} className="form-control" placeholder='Title' value={title} onChange={onChangeValue} />
                            </div></div>

                          <div className='col-md-4'>
                          <div className='txtsfont'>
                              <div className='row'>
                                <div className='col-md-8'>
                                  <div className='form-group'>
                                    <label className='mb-2'>Select font</label>
                                    <div className="input-group has-validation">
                                      <span className="input-group-text">T</span>
                                      <select className="form-control" value={fontOption} onChange={onChangeValue}>
                                        <option>Select font</option>
                                        <option value="1">Arial </option>
                                        <option value="2">Verdana </option>
                                        <option value="3">Tahoma</option> 
                                        <option value="4">Trebuchet MS </option>
                                        <option value="5">Times New Roman</option>
                                        <option value="6">Georgia</option>
                                        <option value="7">Garamond</option>
                                        <option value="8">Courier New</option>
                                        <option value="9">Brush Script MT</option>
                                        <option value="10">Open sans</option>
                                      </select>

                                    </div>
                                  </div>
                                </div>
                                

                                <div className='col-md-4'>
                                  <div className='form-group'>
                                  <label className='mb-2'>Font size</label>
                                    <div className="input-group has-validation">
                                      <select className="form-control" value={fontSize} onChange={onChangeValue}>
                                        <option>Font Size</option>
                                        <option value="1">8px</option>
                                        <option value="2">9px</option>
                                        <option value="3">10px</option>
                                        <option value="4">11px</option>
                                        <option value="5">12px</option>
                                        <option value="6">13px</option>
                                        <option value="7">14px</option>
                                        <option value="8">15px</option>
                                        <option value="9">16px</option>
                                      </select>

                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                                </div>

                                <div className='col-md-4'>
                                <div className='txtsstyle'>
                              <div className='row'>
                                <div className='col-md-7'>
                                  <div className='form-group'>
                                  <label className='mb-2'>Font style</label>
                                    <div className="btn-toolbar mb-3 form-control" role="toolbar" aria-label="Toolbar with button groups">
                                      <div className="btn-group me-2" role="group" aria-label="First group">
                                        <button type="button" className="btn btn-outline-secondary bold">B</button>
                                        <button type="button" className="btn btn-outline-secondary italic">I</button>
                                        <button type="button" className="btn btn-outline-secondary underline">U</button>
                                        <button type="button" className="btn btn-outline-secondary linethrough">S</button>
                                      </div>

                                    </div>

                                  </div>
                                </div>
                                <div className='col-md-5'>                                  
                                <div className='form-group'>
                                <label className='mb-2'>Font color</label>                                 
                                <div className="input-group has-validation">                                      
                                      <span className='pickclr input-group-text' style={{ backgroundColor: '#005FFF' }}></span>
                                      <input type={'text'} className="form-control" placeholder='#005FFF' value={color} onChange={onChangeValue} />         
                                    </div>              
                                  </div>
                                </div>
                              </div>
                            </div>
                                </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label className='mb-2'>Upload background image</label>
                              <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload image <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                              <input id="file-upload" type="file" />
                            </div>
                            <div className='form-group'>
                              <div className='imgpreviewbox'>
                                <span className='imagename'>White-bg.png</span>
                                {/* <i data-eva-animation="flip" data-eva="image-outline"></i>
                              <p>Background picture</p> */}
                                <img src={require('../assets/images/cert/cert1-split/bg.png')} className="mw-100 mh-100" loading="lazy" />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label className='mb-2'>Upload border image</label>
                              <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload image <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                              <input id="file-upload" type="file" />
                            </div>
                            <div className='form-group'>
                              <div className='imgpreviewbox'>
                              <span className='imagename'>golden-frame.png</span>
                                <img src={require('../assets/images/cert/cert1-split/frame.png')} className="mw-100 mh-100" loading="lazy" />

                                {/* <i data-eva-animation="flip" data-eva="image-outline"></i>
                              <p>Design picture</p> */}
                              </div>
                            </div>
                          </div>

                          <div className='col-md-4'>
                          <div className='form-group'>
                                  <label className='mb-2'>Upload header image</label>
                                  <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload image <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                                  <input id="file-upload" type="file" />
                                </div>
                            <div className='form-group'>
                              <div className='imgpreviewbox'>
                              <span className='imagename'>header-image.png</span>
                                <img src={require('../assets/images/cert/cert1-split/cert-cont.png')} className="mw-100 mh-100" loading="lazy" />
                                {/* <i data-eva-animation="flip" data-eva="image-outline"></i>
                                <p>Drag drop interface to drag uploaded design pictures above</p> */}
                              </div>
                            </div>
                          </div>
                          <div className='col-md-8'>
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className='form-group'>
                                  <h4 className='formsubhead mt-3 mb-4'>Manage signatures</h4>
                                </div>
                              </div>

                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label className='mb-2'>Name of <span className='text-uppercase fw-bold'>Chief executive officer</span> </label>
                                  <input type={'text'} className="form-control" placeholder='Name' value="Ruby D. Huffman" />
                                  </div>
                                <div className='form-group'>
                                  <label className='mb-2'>Upload <span className='text-uppercase'>Chief executive officer</span> signature</label>
                                  <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                                  <input id="file-upload" type="file" />
                                </div>
                                <div className='form-group'>
                                  <div className='imgpreviewbox h-auto p-2'>
                                    <img src={require('../assets/images/cert/cert1-split/chief-executive-officer.png')} className="mw-100 mh-100" loading="lazy" />

                                    {/* <i data-eva-animation="flip" data-eva="image-outline"></i>
                              <p>Cancellor signature</p> */}
                                  </div>
                                  
                                </div>
                              </div>

                              <div className='col-md-6'>
                              <div className='form-group'>
                                  <label className='mb-2'>Name of <span className='fw-bold text-uppercase'>Department head</span> </label>
                                  <input type={'text'} className="form-control" placeholder='Name' value="David P. Liriano" />
                                  </div>
                                <div className='form-group'>
                                  <label className='mb-2'>Upload <span className='text-uppercase'>Department head</span> signature</label>
                                  <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                                  <input id="file-upload" type="file" />
                                </div>
                                <div className='form-group'>
                                  <div className='imgpreviewbox h-auto p-2'>
                                    <img src={require('../assets/images/cert/cert1-split/department-head.png')} className="mw-100 mh-100" loading="lazy" />

                                    {/* <i data-eva-animation="flip" data-eva="image-outline"></i>
                              <p>Register signature</p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          {/* <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='mb-2'>Upload president signature</label>
                            <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload president signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                            <input id="file-upload" type="file" />
                          </div>
                          <div className='form-group'>
                            <div className='imgpreviewbox'>
                            <img src={require('../assets/images/cert/cert1-split/president-signature.png')} className="mw-100 mh-100" loading="lazy" />

                              <i data-eva-animation="flip" data-eva="image-outline"></i>
                              <p>President signature</p>
                            </div>
                          </div>
                        </div> */}

                          {/* <div className='col-md-12'>
                            <div className='form-group'>
                              <h4 className='formsubhead'>Manage Parameters</h4>
                            </div>
                          </div>

                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{Certificate number}' value={certificateNo} onChange={onChangeValue} />
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{First Name}' value={firstName} onChange={onChangeValue} />
                            </div>
                          </div>

                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{Last Name}' value={lastName} onChange={onChangeValue} />
                            </div>
                          </div>

                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{Course}' value={course} onChange={onChangeValue} />
                            </div>
                          </div>

                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{grade}' value={grade} onChange={onChangeValue} />
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <input type={'text'} className="form-control" placeholder='{batch}' value={batch} onChange={onChangeValue} />
                            </div>
                          </div> */}


                        </div>
                      </div>
                    </div>
                    <div className='row align-items-center'>
                      <div className='col-6'>
                        <div className='btngrouprht'>
                          <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                        </div>
                      </div>
                      <div className='col-6 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' onClick={moveWithCertificatePreview}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {stepper === 4 &&
                   <div className='fadein'>
                    {certificatePreview ? <div className='formscroldiv'>
                      {/* <div className='backgroundblur text-center mh-auto'>
                    <div className='certinfo certpreview'>
                      <div className='img'>
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className='certprecontbtn'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='cpbtnlinks'>
                          <a href='' className='text-dark'><i data-eva="arrowhead-left-outline"></i> PREVIOUS</a>

                        <a href='' className='btn btn-light text-primary'>John Smith<br/>#12347</a></div>
                      </div>
                      <div className='col-md-4 text-center'>
                        <h5 className='text-primary'>Laura Wheeler</h5>
                        <p>#12455</p>
                      </div>  
                       <div className='col-md-4 '>
                        <div className='cpbtnlinks align-items-end'>
                          <a href='' className='text-dark'>Next <i data-eva="arrowhead-right-outline"></i></a>
                          
                        <a href='' className='btn btn-light text-primary'>Adam Smith<br/>#12347</a></div>
                      </div>
                    </div>
                  </div>  */}

                      <div className="accordion listview" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-mdb-toggle="collapse"
                              data-mdb-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <span className='listviewtxts'> 
                                <span className='studid'>#{cnumber}</span>
                                <span className='studname'>{userName}</span>
                                <span className='studbetch'>{batchno}</span>
                                <span className='studdep'>{coursename}</span>
                              </span>

                            </button>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                            <div className="accordion-body text-center accbodyiframe">
                              <iframe src={certificatePreview ? `${certificatePreview}#toolbar=0&navpanes=0&scrollbar=0` : ''} className="iframe"></iframe>
                              {/* <img src={require('../assets/images/cert/cert1sig.png')} loading="lazy" /> */}
                            </div>
                          </div>
                        </div>
                        {/* <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className='listviewtxts'>
                            <span className='studid'>#12455</span>
                            <span className='studname'>Laura Wheeler</span>
                            <span className='studbetch'>2022</span>
                            <span className='studdep'>Computer science</span>
                          </span>

                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                        <div className="accordion-body text-center">
                          <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className='listviewtxts'>
                            <span className='studid'>#12455</span>
                            <span className='studname'>Laura Wheeler</span>
                            <span className='studbetch'>2022</span>
                            <span className='studdep'>Computer science</span>
                          </span>

                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                        <div className="accordion-body text-center">
                          <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div> */}
                      </div>

                    </div> : <div className='formscroldiv'><TableLoader /></div>}

                    <div className='row align-items-center'>
                      {/* <div className='col-12 text-center'>You will be prompted to initiate your blockchain signature in next step</div> */}
                      <div className='col-6'>
                        <div className='btngrouprht'>
                          <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                        </div>
                      </div>

                      <div className='col-6 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' onClick={() => setStepper(stepper + 1)}>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {stepper === 5 &&
                   <div className=''>
                    <div className='formscroldiv fadein'>
                      <div className='backgroundblur text-start'>
                        <div className='certinfo'>
                          <div className='certinfocont1'>
                            <p className='text-center mb-0'><b>1</b> Student from <b>2023</b> - Computer Science Graduation</p>                           
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='backgroundblur text-center'>
                            <div className='signerboxes'>
                              <h6>Preparer Sign</h6>
                              <button type="button" className="btn btn-primary btn-icon icon-rht btn-abs btn-disabled" >Signed <i data-eva="checkmark-outline"></i></button>
                              <p>On Feb-25-2023 11:01 EST</p>
                              <p>By <b>Prof Charles Harper</b></p>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className='backgroundblur text-center'>
                            <div className='signerboxes'>
                              <h6>Verifier Sign</h6>
                              <button type="button" className="btn btn-primary btn-icon icon-rht btn-abs btn-disabled">Signed <i data-eva="checkmark-outline"></i></button>
                              <p>On Feb-25-2023 08:01 EST</p>
                              <p>By <b>David R. Martin</b></p>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className='backgroundblur text-center'>
                            <div className='signerboxes'>
                              <h6>Issuer Sign</h6>
                              <button type="button" className="btn btn-light text-primary" onClick={generateSign}>Sign</button>
                              <button type="button" className="btn btn-danger">Reject</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='row align-items-center'>
                      <div className='col-12'>
                        <div className='btngrouprht'>
                          <button className='btn btn-light btn-icon' onClick={() => setStepper(stepper - 1)}>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</button>
                        </div>
                      </div>
                      {/* <div className='col-6 text-end'>
                        <div className='btngrouprht'>
                          <button className='btn btn-primary btn-icon icon-rht' type="button" onClick={mintCert} disabled={!approveToMint}>Finish < i data-eva-animation="flip" data-eva="checkmark-outline"></i></button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                }
              </div>
              {/* <div className='issuecerttabs'>

            <ul className="nav nav-pills mb-3 justify-content-center" id="ex1" role="tablist">
              <li className="nav-item" role="presentation"><a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected="true">Select students <i data-eva="checkmark-outline"></i></a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected="false">Certification info</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected="false">Cert template</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" id="ex1-tab-4" data-mdb-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4" aria-selected="false">Preview</a></li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                <div className='formscroldiv'>
                  <div className='searchform border-none'>
                    <div className='fields txtfields'>Cert batch name</div>
                    <div className='fields'>
                      <select className='form-control'>
                        <option>2022-Computer-Science-Graduation - List 1</option>
                      </select>
                    </div>
                    <div className='fields'></div>
                  </div>

                  <div className='tableblur mt-4'>
                    <div className='searchform'>
                      <div className='fields'>Search & Filters</div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Name' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Batch year' /></div>
                      <div className='fields'><input type={'text'} className="form-control" placeholder='Student ID/Email' /></div>
                      <div className='fields'>
                        <select className="form-control">
                          <option selected>Import slot</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>

                      </div>
                    </div>
                    <div className='table-responsive'>
                      <table className="table align-middle mb-0 custable table-hover" >
                        <thead className="">
                          <tr>
                            <th>
                              <div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck1" /><label className="form-check-label" htmlFor="exampleCheck1"></label></div>
                            </th>
                            <th>Student ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Status</th>
                            <th className='text-center'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck2" /><label className="form-check-label" htmlFor="exampleCheck2"></label></div></td>
                            <td>
                              <div className="d-flex align-items-center">
                                1
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">anderson@gmail.com</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">Anderson</p>
                            </td>
                            <td> 2022 </td>
                            <td>
                              <span className="text-primary">Approved</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                              </div>
                            </td>

                          </tr>
                          <tr>
                            <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck3" /><label className="form-check-label" htmlFor="exampleCheck3"></label></div></td>
                            <td>
                              <div className="d-flex align-items-center">
                                2
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">adam@gmail.com</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">Adam</p>
                            </td>
                            <td> 2021 </td>
                            <td>
                              <span className="text-primary">Approved</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck4" /><label className="form-check-label" htmlFor="exampleCheck4"></label></div></td>
                            <td>
                              <div className="d-flex align-items-center">
                                3
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">sean@gmail.com</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">Sean</p>
                            </td>
                            <td> 2020 </td>
                            <td>
                              <span className="text-primary">Approved</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck5" /><label className="form-check-label" htmlFor="exampleCheck5"></label></div></td>
                            <td>
                              <div className="d-flex align-items-center">
                                4
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">taylor@gmail.com</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">Taylor</p>
                            </td>
                            <td> 2019 </td>
                            <td>
                              <span className="text-primary">Approved</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><div className="form-group"><input type="checkbox" className="form-check-input" id="exampleCheck6" /><label className="form-check-label" htmlFor="exampleCheck6"></label></div></td>
                            <td>
                              <div className="d-flex align-items-center">
                                5
                              </div>
                            </td>
                            <td>
                              <span className="text-dark">anderson@gmail.com</span>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">Anderson</p>
                            </td>
                            <td> 2022 </td>
                            <td>
                              <span className="text-danger">Decline</span>
                            </td>
                            <td className='text-center'>
                              <div className='btngrouprht'>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="edit-outline"></i></a>
                                <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
                <div className='row align-items-center'>
                  <div className='col-3'></div>
                  <div className='col-6 text-center'>Totally <span className='fw-bold'>125</span> students seclected</div>
                  <div className='col-3 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">

                <div className='formscroldiv'>
                  <div className='backgroundblur text-center'>
                    <div className='certinfo'>
                      <p>Upload a CSV/XLS file with student ID & their certification info</p>
                      <div className='certinfocont'>
                        <p>Course</p>
                        <p>Grade</p>
                        <p>Batch</p>
                        <p>Certificate Number</p>
                      </div>
                      <h3>Download CSV File</h3>

                      <div className='form-group'>
                        <label htmlFor="file-upload" className="custom-file-upload btn btn-primary btn-icon icon-rht">Upload File <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                        <input id="file-upload" type="file" />
                      </div>

                      <p className='text-secondary'>CSV, XLS only - Maximum 10000 records</p>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-6'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</a>
                    </div>
                  </div>
                  <div className='col-6 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                <div className='formscroldiv'>
                  <div className='certempfrm'>
                    <div className='row'>
                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Graduation Certificate Layout</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>

                      <div className='col-md-6 text-center'>
                        <div className='backgroundblur mb-3'>
                          <div className='certinfo'>
                            <div className='img'>
                              <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                            </div>
                          </div>
                        </div>
                        <p>Course certificate 2</p>
                        <button className='btn btn-light'>Random Preview</button>

                      </div>
                    </div>

                  </div>

                </div>
                <div className='row align-items-center'>
                  <div className='col-6'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</a>
                    </div>
                  </div>
                  <div className='col-6 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-3">
                <div className='btngrouprht text-end mb-3'>
                  <button className='btn btn-primary text-primary btn-sm btn-action' data-mdb-toggle="tooltip" title="Cert View" data-mdb-placement="bottom">< i data-eva-animation="flip" data-eva="award-outline"></i></button>
                  <button className='btn btn-outline-primary text-primary btn-sm btn-action' data-mdb-toggle="tooltip" title="List View" data-mdb-placement="bottom">< i data-eva-animation="flip" data-eva="menu-outline"></i></button>
                </div>

                <div className='formscroldiv'>
                  <div className='backgroundblur text-center mh-auto'>
                    <div className='certinfo certpreview'>
                      <div className='img'>
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className='certprecontbtn'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='cpbtnlinks'>
                          <a href='' className='text-dark'><i data-eva="arrowhead-left-outline"></i> PREVIOUS</a>

                        <a href='' className='btn btn-light text-primary'>John Smith<br/>#12347</a></div>
                      </div>
                      <div className='col-md-4 text-center'>
                        <h5 className='text-primary'>Laura Wheeler</h5>
                        <p>#12455</p>
                      </div>  
                       <div className='col-md-4 '>
                        <div className='cpbtnlinks align-items-end'>
                          <a href='' className='text-dark'>Next <i data-eva="arrowhead-right-outline"></i></a>
                          
                        <a href='' className='btn btn-light text-primary'>Adam Smith<br/>#12347</a></div>
                      </div>
                    </div>
                  </div> 

                  <div className="accordion listview" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                        <div className="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                      <div className="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <span className='listviewtxts'>  
                            <span className='studid'>#12455</span>                          
                            <span className='studname'>Laura Wheeler</span>                          
                            <span className='studbetch'>2022</span>                          
                            <span className='studdep'>Computer science</span>                          
                          </span>
                          
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                      <div className="accordion-body text-center">
                        <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='row align-items-center'>
                  <div className='col-4'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-light btn-icon'>< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back</a>
                    </div>
                  </div>
                  <div className='col-4 text-center'>You will be prompted to initiate your blockchain signature in next step</div>
                  <div className='col-4 text-end'>
                    <div className='btngrouprht'>
                      <a href='' className='btn btn-primary btn-icon icon-rht'>Continue < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div> */}
            </div>

          </div>
        </div>}
    </Fragment>


  );
}

export default Issue_Certificate;