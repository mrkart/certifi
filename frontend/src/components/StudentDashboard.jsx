import { React, useState, useEffect } from 'react';
import * as eva from 'eva-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCertList, resetUserCertList } from '../actions/exampleAction';
import ReactTimeAgo from 'react-time-ago';
import { apiAsBlob } from '../services/api';

const StudentDashboard = () => {

    const [viewCertificate, setViewCertificate] = useState(false)
    const [certificateCount, setCertificateCount] = useState(0);
    const [certificateList, setCertificateList] = useState([]);
    const [apiLoading, setApiLoading] = useState(true);
    
    const dispatch = useDispatch();
    const userCertList = useSelector(state => state.demoReducer.userCertificateList);
    let userprofile = JSON.parse(localStorage.getItem('userprofile'));
    let orgID = userprofile.organistaions[0]?.id;
    let userId = userprofile.id;
    let userName = userprofile.name;
    let flowAddress = userprofile.flowAddress;

    const viewCertificatepage = () => {
        if (certificateCount > 0) {
            setViewCertificate(true);
        }
    }
    const dismissView = () => {
        setViewCertificate(false)
    }

    useEffect(() => {
        dispatch(getUserCertList(orgID, userId));
    }, []);

    useEffect(() => {
        if (userCertList.statusCode == 200) {
            setApiLoading(false);
            dispatch(resetUserCertList());
            // console.log('userCertList');
            if (userCertList?.data?.count > 0) {
                setCertificateCount(userCertList.data.count);
                // console.log(userCertList.data.certificates);
                setCertificateList(userCertList.data.certificates);
            }
        }
    }, [userCertList]);

    useEffect(() => { eva.replace() });


    const shareOnLinkedIn = (mycert) => {
        const message = "Certifily";

        // Replace this with your LinkedIn share URL
        const shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(mycert) + "&title=" + encodeURIComponent(message);

        window.open(shareUrl, "_blank");
    }

    const buttonStyle = {
        cursor: 'pointer'
    };

    const downloadOnClick = async (url, nftId) => {
        const res = await apiAsBlob(url);
        if (res && res.status === 200) {
            var blob = new Blob([res.data], { type: 'application/pdf' });
            var blob_url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blob_url;
            link.download = `${nftId}.pdf`;
            link.click();
            URL.revokeObjectURL(blob_url);
        }
    };


    return (
        <div className='scrolldiv'>
            <div className='row fadein'>
                <div className='col-md-12 text-start'>

                    {!viewCertificate ? <div className='certtemplates mintnft studentdash'>
                        <div className='row'>
                            <div className="col-sm-6 col-md-4">
                                <div className='createcetr'>
                                    <h5>Welcome</h5>
                                    <h4 className='fw-bolder text-primary'>{userName}</h4>
                                    <div className='lastestnfts'>
                                        <h5>Latest NFTs</h5>
                                        { apiLoading ?
                                            <div className="text-center">
                                                <img src={require('../assets/images/certifi-loader.gif')} loading="lazy" />
                                            </div>
                                            :
                                            <div>
                                                {certificateCount == 0 ?
                                                    <p>There are no additional NFTs generated</p>
                                                    :
                                                    <ul className='list-unstyled'>
                                                        {certificateList.map((user, index) => (
                                                            <li key={index}>
                                                                <a href={"https://alpha.certifi.ly/verify/"+user.certificateNumber} target="_blank">
                                                                    <span className='img'><img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" /></span>
                                                                    <span className='lnftscont nftlistborder'>
                                                                        <ReactTimeAgo date={user.datetimeCreated} locale="en-US" />
                                                                        <h6>Certificate from {user.org.name}</h6>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4">
                                <div className='folder mb-3' onClick={viewCertificatepage}>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            {/* <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">

                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-3'>
                                                <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                            </div>

                                            <h4 className='text-primary text-uppercase fw-bold mb-3'>Certificates</h4>
                                            <h2 className='fw-bold mb-0'>{certificateCount}</h2>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' >View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>

                                {/* <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect'  />
                                    <label className='backgroundblur' htmlFor="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Certificate</h3>
                                    </label>
                                </div> */}
                            </div>


                            <div className="col-sm-6 col-md-4 ">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            {/* <div className='climgcont'>
                                                <img src={require('../assets/images/icons/documents.png')} loading="lazy" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-3'>
                                                <img src={require('../assets/images/icons/documents.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold mb-3'>Documents</h4>

                                            <h2 className='fw-bold mb-0'>0</h2>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-6 col-md-4 ">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            {/* <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-3'>
                                                <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold mb-3'>Memberships</h4>
                                            <h2 className='fw-bold mb-0'>0</h2>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-6 col-md-4 ">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            {/* <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-3'>
                                                <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold mb-3'>Cards</h4>
                                            <h2 className='fw-bold mb-0'>0</h2>
                                        </div>
                                        {/* <div className='foldpicshare justify-content-center'>
                                            <div className='foldshare eva-hover icon-rht' onClick={viewCertificatepage}>View all <i data-eva="arrow-ios-forward-outline" data-eva-animation="flip"></i></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 ">
                                <div className='folder mb-3'>
                                    <div className='foldercut'>
                                        <div className='cltitle'>
                                            {/* <div className='climgcont'>
                                                <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card dashboardboxContainer light-blur">
                                        <div className='foldcont text-center justify-content-center'>
                                            <div className='img mb-3'>
                                                <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                                            </div>
                                            <h4 className='text-primary text-uppercase fw-bold mb-3'>Tickets</h4>
                                            <h2 className='fw-bold mb-0'>0</h2>
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
                                <div className="row mb-3 align-items-center"><div className="col-md-12">
                                    <div className='backtit'>
                                        <button className='btn btn-light btn-icon ' type="button" onClick={dismissView} >< i data-eva-animation="flip" data-eva="arrow-back-outline"></i> Back </button>
                                        <h4 className="fw-bolder text-black text-uppercase mb-0"><img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" width={30} /> Certificates</h4>
                                    </div>
                                </div>
                                </div>
                                <div className='row'>
                                    {certificateList.map((user, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className='ctemp' >
                                                <label className='backgroundblur' htmlFor="cert-1">
                                                    <p className='text-end w-100 mb-3'>
                                                    <a href={"https://testnet.flowview.app/account/"+flowAddress+"/collection/CertifilyNFTCollection/"+user.nftId} target="_blank">
                                                        #{user.nftId} 
                                                    </a>
                                                    <a href={"https://alpha.certifi.ly/verify/"+user.certificateNumber} target="_blank">
                                                    <span className='badge badge-success ms-2 text-uppercase'>
                                                        Verify
                                                    </span>
                                                    </a></p>
                                                    <iframe src={user.certificateHash}></iframe>
                                                    <div className='row align-items-center'>
                                                        <div className='col-md-7 text-start'>
                                                            <p className='mt-3 mb-2'>Issued on <span>
                                                                {
                                                                    new Date(user.datetimeCreated).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })
                                                                }</span>
                                                            </p>
                                                            <p className=''>by {user.org['name']}</p>
                                                        </div>
                                                        <div className='col-md-5 text-end'>
                                                            <span className='eva-hover d-inline-flex align-items-center' style={buttonStyle} onClick={() => shareOnLinkedIn(user.certificateHash)}><i className='mr-2' data-eva="share-outline" data-eva-animation="flip"></i> Share</span>
                                                            <span className='ms-2 eva-hover d-inline-flex align-items-center' style={buttonStyle} onClick={() => downloadOnClick(user.certificateHash, user.nftId)}><i className='mr-2' data-eva="code-download-outline" data-eva-animation="flip"></i> Download</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}

                                    {/* <div className="col-md-6">
                                        <div className='ctemp' >
                                            <label className='backgroundblur' htmlFor="cert-1">
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
                                            <label className='backgroundblur' htmlFor="cert-2">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>}



                </div>

            </div>
        </div >
    );
}

export default StudentDashboard;