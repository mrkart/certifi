import { React, useEffect, useMyCustomStuff } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router'
import * as eva from 'eva-icons';
import CountUp from 'react-countup';

const data = [
  {
    month: 'Jan',
    certificate: 23
  },
  {
    month: 'Feb',
    certificate: 45
  },
  {
    month: 'Mar',
    certificate: 67
  },
  {
    month: 'Apr',
    certificate: 55
  },
  {
    month: 'Jun',
    certificate: 33
  },
  {
    month: 'Jul',
    certificate: 61
  },
  {
    month: 'Aug',
    certificate: 45
  },
    {
    month: 'Sept',
    certificate: 78
  },
    {
    month: 'Oct',
    certificate: 88
  },
    {
    month: 'Nov',
    certificate: 77
  },
    {
    month: 'Dec',
    certificate: 92
  }
];

const Dashboard = () => {
  let navigate = useNavigate()

  // const dispatch = useDispatch();
  // const sampleApi = useSelector(state => state.demoReducer.sampleApi);
  // console.log(sampleApi);
  // useEffect(() => {
  //   dispatch(getSampleAPI());
  // }, []);  
  const gotoIssueCert = () => {
    navigate('/issue-certificate')
  }
  useEffect(() => { eva.replace() });
  return (
    <div className='scrolldiv'>  
      {/* <div className='cert-loader'>
            <div className='backgroundblur'>
              <img src={require('../assets/images/certifi-loader.gif')} loading="lazy" />
            </div>
          </div> */}
      <div className='row fadein'>
        <div className='col-md-12 text-start'>
          <div className='foldersview'>
            <div className='row'>
              <div className='col-md-3'>
                <div className='createcetr'>
                  <h5>Create</h5>
                  <h4 className='fw-bolder text-black'>CERTIFICATE</h4>
                  <p >Create a new certificate on Certifily. Collabrate and Share to your certificates</p>
                  <span className='icontext eva-hover' onClick={gotoIssueCert}>
                    <span className='icon'><i data-eva="plus-outline" data-eva-animation="flip"></i></span>
                    <span className='text'>Create</span>
                  </span>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='folder'>
                      <div className='foldercut'>
                        <div className='cltitle'>
                          <div className='climgcont'>
                            <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />  Certificates
                          </div>
                        </div>
                      </div>
                      <div className="card dashboardboxContainer light-blur">
                        <div className='foldcont'>
                          {/* <p className="card-text mb-1 ccondi">Good</p>
                    <p className=" cpartitle">CLINICAL PRACTICES</p> */}
                          <h2 className='fw-medium mt-5 text-center'>
                            <CountUp
                              start={0}
                              end={765}
                              duration={5}
                            />
                          </h2>
                        </div>
                        <div className='foldpicshare'>
                          <div className='foldpics'>
                            {/* <ul className='list-unstyled'>
                        <li><span className='flpic'><img src={require('../assets/images/photo1.png')} loading="lazy" /></span></li>
                        <li><span className='flpic'><img src={require('../assets/images/photo2.png')} loading="lazy" /></span></li>
                        <li><span className='flpic'><img src={require('../assets/images/photo3.png')} loading="lazy" /></span></li>
                        <li><span className='flpic'><img src={require('../assets/images/photo4.png')} loading="lazy" /></span></li>
                        <li><span className='flpic'><img src={require('../assets/images/photo5.png')} loading="lazy" /></span></li>
                        <li><span className='flpic last-count'>+25</span></li>
                      </ul> */}
                          </div>
                          <div className='foldshare eva-hover icon-rht' >View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='folder'>
                      <div className='foldercut'>
                        <div className='cltitle'>
                          <div className='climgcont'>
                            <img src={require('../assets/images/icons/students.png')} loading="lazy" />  Students
                          </div>
                        </div>
                      </div>
                      <div className="card dashboardboxContainer light-blur">
                        <div className='foldcont'>
                          {/* <p className="card-text mb-1 ccondi">Best</p>
                    <p className=" cpartitle">Distribution Practices</p> */}
                          <h2 className='fw-medium mt-5 text-center'>
                            <CountUp
                              start={0}
                              end={1657}
                              duration={5}
                            />
                          </h2>
                        </div>
                        <div className='foldpicshare'>
                          <div className='foldpics'>
                            <ul className='list-unstyled'>
                              {/* <li><span className='flpic'><img src={require('../assets/images/photo5.png')} loading="lazy" /></span></li> */}
                              <li><span className='flpic'><img src={require('../assets/images/photo4.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo3.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo2.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo1.png')} loading="lazy" /></span></li>
                              <li><span className='flpic last-count'>+100</span></li>
                            </ul>
                          </div>                          
                          <div className='foldshare eva-hover icon-rht' >Manage <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='folder'>
                      <div className='foldercut'>
                        <div className='cltitle'>
                          <div className='climgcont'>
                            <img src={require('../assets/images/icons/signers.png')} loading="lazy" />  Signers
                          </div>
                        </div>
                      </div>
                      <div className="card dashboardboxContainer light-blur">
                        <div className='foldcont'>
                          {/* <p className="card-text mb-1 ccondi">Awesome</p>
                    <p className=" cpartitle">Interior Design</p> */}
                          <h2 className='fw-medium mt-5 text-center'>
                          <CountUp
                            start={0}
                            end={4}
                            duration={4}
                          />
                          </h2>
                        </div>
                        <div className='foldpicshare'>
                          <div className='foldpics'>
                            <ul className='list-unstyled'>
                              {/* <li><span className='flpic'><img src={require('../assets/images/photo2.png')} loading="lazy" /></span></li>
                        <li><span className='flpic'><img src={require('../assets/images/photo4.png')} loading="lazy" /></span></li> */}
                              <li><span className='flpic'><img src={require('../assets/images/photo1.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo2.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo3.png')} loading="lazy" /></span></li>
                              <li><span className='flpic'><img src={require('../assets/images/photo5.png')} loading="lazy" /></span></li>
                              {/* <li><span className='flpic last-count'>+25</span></li> */}
                            </ul>
                          </div>
                          <div className='foldshare eva-hover icon-rht' >View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='tableblur mt-4'>
              <div className='row align-items-center mb-3'>
                <div className='col-7'><span className='sitetextblue bluetxttitle'>RECENT CERTIFICATES</span></div>
                <div className='col-5 text-right'>
                  <span className='icontext pull-right viewall'>
                    <span className='icon'><i data-eva="arrow-ios-forward-outline"></i></span>
                    <span className='text'>View all</span>
                  </span>
                </div>
              </div>

              <div className='table-responsive'>
                <table className="table align-middle mb-0 custable table-hover">
                  <thead className="">
                    <tr>
                      <th>Student ID</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Batch</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
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
                        <span className="text-dark">anderson@gmail.com</span>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">Anderson</p>
                      </td>
                      <td> 2022 </td>
                      <td>
                        <span className="text-success">Approved</span>
                      </td>
                      <td className='text-center'>
                        <a href="" className='text-primary'><i data-eva="link-outline"></i></a>
                      </td>
                      <td className='text-center'>
                        <span className="dropdown">
                          <a href="#" className='text-secondary dropdown-toggle' type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"><i data-eva="more-vertical-outline"></i></a>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </span>
                      </td>
                    </tr>
                    <tr>
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
                        <span className="text-success">Approved</span>
                      </td>
                      <td className='text-center'>
                        <a href="" className='text-primary'><i data-eva="link-outline"></i></a>
                      </td>
                      <td className='text-center'>
                        <span className="dropdown">
                          <a href="#" className='text-secondary dropdown-toggle' type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"><i data-eva="more-vertical-outline"></i></a>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </span>
                      </td>
                    </tr>
                    <tr>
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
                        <span className="text-success">Approved</span>
                      </td>
                      <td className='text-center'>
                        <a href="" className='text-primary'><i data-eva="link-outline"></i></a>
                      </td>
                      <td className='text-center'>
                        <span className="dropdown">
                          <a href="#" className='text-secondary dropdown-toggle' type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"><i data-eva="more-vertical-outline"></i></a>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </span>
                      </td>
                    </tr>
                    <tr>
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
                        <span className="text-success">Approved</span>
                      </td>
                      <td className='text-center'>
                        <a href="" className='text-primary'><i data-eva="link-outline"></i></a>
                      </td>
                      <td className='text-center'>
                        <span className="dropdown">
                          <a href="#" className='text-secondary dropdown-toggle' type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"><i data-eva="more-vertical-outline"></i></a>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </span>
                      </td>
                    </tr>
                    <tr>
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
                        <a href="" className='text-primary'><i data-eva="link-outline"></i></a>
                      </td>
                      <td className='text-center'>
                        <span className="dropdown">
                          <a href="#" className='text-secondary dropdown-toggle' type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"><i data-eva="more-vertical-outline"></i></a>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 mt-4'>
              <div className='dashlast'>
                <div className='row text-start'>
                  <div className='col-md-3'>
                    <h5 className='fw-bolder'>VERIFICATION <br /> REQUESTS PROCESSED</h5>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle chartdropdown"
                        type="button"
                        id="dropdownMenuButton"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Last 12 months
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" selected>Last 3 years</a></li>
                        <li><a className="dropdown-item">Last 5 years</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-md-9'>
                    <div className='row'>
                      <div className='col-md-6 barchart'>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={150}
                          height={40}
                          data={data}
                          margin={{
                            top: 40,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis/>
                          <Tooltip />
                        <Bar 
                          barSize={28}
                          dataKey="certificate" 
                          fill="#005fff" 
                          radius={[10, 10, 0, 0]} 
                          label={{ value: "index", fontSize: '100%', color: "#005fff", position: "top", angle: 0, dy: 0 }} 
                        />
                        </BarChart>
                      </ResponsiveContainer>
                      </div>
                      <div className='col-md-6 borderleft2pxwhite'>
                        <div className='row'>
                          <div className='col-7'>
                            <h5 className='fw-bolder'>SIGNERS</h5>
                          </div>
                          <div className='col-5 text-end'>
                            <span className='icontext viewall'>
                              <span className='icon'><i data-eva="plus-outline"></i></span>
                              <span className='text'>Add</span>
                            </span>
                          </div>
                        </div>

                        <div className='teammemberrow'>
                          <div className='temproname'>
                            <img className='teammemberprofile' src={require('../assets/images/photo1.png')} loading="lazy" />
                            <p className='teammembername'>Anderson</p>
                          </div>
                          <div className='teammembercert'>
                            <p>13 certificates</p>
                          </div>
                        </div>

                        <div className='teammemberrow'>
                          <div className='temproname'>
                            <img className='teammemberprofile' src={require('../assets/images/photo3.png')} loading="lazy" />
                            <p className='teammembername'>Taylor</p>
                          </div>
                          <div className='teammembercert'>
                            <p>32 certificates</p>
                          </div>
                        </div>

                        <div className='teammemberrow'>
                          <div className='temproname'>
                            <img className='teammemberprofile' src={require('../assets/images/photo4.png')} loading="lazy" />
                            <p className='teammembername'>Maddona</p>
                          </div>
                          <div className='teammembercert'>
                            <p>21 certificates</p>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='col-md-2'>
          <div className="card light-blur h-100">
            <p className="card-text mb-1 ccondi mt-4">Sample</p>
            <p className=" cpartitle">Sample text</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;