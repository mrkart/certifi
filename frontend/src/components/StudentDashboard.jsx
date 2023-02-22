import { React, useState } from 'react';



const StudentDashboard = () => {

    const [viewCertificate, setViewCertificate] = useState(false)
    const viewCertificatepage = () => {
        setViewCertificate(true)
    }
    const dismissView = () => {
        setViewCertificate(false)
    }
    return (
        <div className='scrolldiv'>
            <div className='row'>
                <div className='col-md-12 text-start'>

                    {!viewCertificate ? <div className='certtemplates mintnft'>
                        <div className='row'>
                            <div className="col-sm-6 col-md-4">
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' onClick={viewCertificatepage} />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Certifily-icon.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Certificate</h3>
                                    </label>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled" >
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Certifily-icon-1.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Agreement | Contract</h3>
                                    </label>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Group-16.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Membership</h3>
                                    </label>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Group-16-1.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Letter</h3>
                                    </label>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Group-16-2.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Cards</h3>
                                    </label>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-4 btn-disabled">
                                <div className='ctemp' >
                                    <input type={'radio'} id="certselect-1" name='cerselect' />
                                    <label className='backgroundblur' for="certselect-1">
                                        <div className='img'>
                                            <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                                        </div>
                                        <h4>Create a</h4>
                                        <h3>Tickets</h3>
                                    </label>
                                </div>
                            </div>


                        </div>
                    </div> :
                        <div>
                            <div className='certtemplates mintnft'>
                                <div className='row'>
                                    <div className="col-sm-6 col-md-4">
                                        <div className='ctemp' >
                                            {/* <input type={'radio'} id="cert-1" name='cert-1' value={false} disabled/> */}
                                            <label className='backgroundblur' for="cert-1">
                                                <div className='img'>
                                                    <iframe src={require('../assets/images/certificate-ela.pdf')} height="300" width="100%"></iframe>
                                                </div>

                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-md-4 " >
                                        <div className='ctemp' >
                                            <input type={'radio'} id="cert-2" name='cert-2' disabled />
                                            <label className='backgroundblur' for="cert-2">
                                                <div className='img'>
                                                    <embed src={require('../assets/images/certificate-shun.pdf')} height="300" width="100%"></embed>
                                                </div>

                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-6'>
                                   
                                </div>
                                <div className='col-6 text-end'>
                                    <div className='btngrouprht'>
                                        <button className='btn btn-primary btn-icon icon-rht' type="button" onClick={dismissView} >Back < i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
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