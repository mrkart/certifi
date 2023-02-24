import { React, useState, useEffect } from 'react';
import * as eva from 'eva-icons';


const StudentDashboard = () => {

    const [viewCertificate, setViewCertificate] = useState(false)
    const viewCertificatepage = () => {
        setViewCertificate(true)
    }
    const dismissView = () => {
        setViewCertificate(false)
    }
    useEffect(() => { eva.replace() });
    return (
        <div className='scrolldiv'>
            <div className='row fadein'>
                <div className='col-md-12 text-start'>

                    {!viewCertificate ? <div className='certtemplates mintnft studentdash'>
                        <div className='row'>
                            <div className="col-sm-6 col-md-4">
                                <div className='folder mb-3' onClick={viewCertificatepage}>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">

                                        <div className='foldcont text-center'>
                                            <h2 className='fw-medium mt-5'>2</h2>
                                            <h4 className='text-primary text-uppercase fw-bold'>Certificates</h4>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' >View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>

                                {/* <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect'  />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Certificate</h3>
                                    </label>
                                </div> */}
                            </div>


                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            <div className='climgcont'>
                                                <img src={require('../assets/images/icons/documents.png')} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-2'>
                                                <img src={require('../assets/images/icons/documents.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold'>Documents</h4>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-2'>
                                                <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold'>Memberships</h4>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-2'>
                                                <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold'>Cards</h4>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-2'>
                                                <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold'>Tickets</h4>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div> :
                        <div>
                            <div className='certtemplates mintnft studentcert'>
                                <div className='row'>
                                    <div className="col-md-6">
                                        <div className='ctemp' >
                                            <label className='backgroundblur' for="cert-1">
                                                <p className='text-end w-100 mb-3'>#234254 <span className='badge badge-success ms-2 text-uppercase'>Verify</span></p>
                                                <iframe src={require('../assets/images/certificate-ela.pdf#toolbar=0&navpanes=0&scrollbar=0')}></iframe>
                                                <div className='row align-items-center'>
                                                    <div className='col-md-7 text-start'>
                                                        <p className='mt-3 mb-2'>Issued on Feb 23 2023</p>
                                                        <p className=''>by Madurai Kamaraj University</p>
                                                    </div>
                                                    <div className='col-md-5 text-end'>
                                                        <span className='eva-hover d-inline-flex align-items-center'><i className='mr-2' data-eva="share-outline" data-eva-animation="flip"></i> Share</span>
                                                    </div>
                                                </div>

                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 " >
                                        <div className='ctemp' >
                                            <input type={'radio'} id="cert-2" name='cert-2' disabled />
                                            <label className='backgroundblur' for="cert-2">
                                                <p className='text-end w-100 mb-3'>#234254 <span className='badge badge-success ms-2 text-uppercase'>Verify</span></p>
                                                <iframe src={require('../assets/images/certificate-shun.pdf')}></iframe>

                                                <div className='row align-items-center'>
                                                    <div className='col-md-7 text-start'>
                                                        <p className='mt-3 mb-2'>Issued on Feb 23 2023</p>
                                                        <p className=''>by Madurai Kamaraj University</p>
                                                    </div>
                                                    <div className='col-md-5 text-end'>
                                                        <span className='eva-hover d-inline-flex align-items-center'><i className='mr-2' data-eva="share-outline" data-eva-animation="flip"></i> Share</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center mt-3'>

                                <div className='col-12 text-center'>
                                    <div className='btngrouprht'>
                                        <button className='btn btn-light btn-icon ' type="button" onClick={dismissView} >< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back </button>
                                    </div>
                                </div>
                            </div>
                        </div>}



                </div>

            </div>
        </div >
    );
}

export default StudentDashboard;