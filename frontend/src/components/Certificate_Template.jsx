import { React } from 'react';


const CertificateTemplate = () => {
   return (

    <div className='scrolldiv'>
      <div className='row '>
        <div className='col-md-12 text-start'>
        {/* <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-12 text-center'>
                <h4 className="fw-bolder text-black text-uppercase mb-2">Mint NFT</h4>
                <h6 className='mb-3'>Select NFT type</h6>
                </div>              
            </div>
            </div>

            <div className='certtemplates mintnft'>
              <div className='row'>
                <div className="col-sm-6 col-md-4">         
                <div className='ctemp' >  
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
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
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
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
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
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
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
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
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
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
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
                        <div className='img'>
                          <img src={require('../assets/images/icons/Group-16-3.png')} loading="lazy" />
                        </div>
                        <h4>Create a</h4>
                        <h3>Tickets</h3>
                    </label>                   
                  </div>
                </div>

                
              </div>
            </div> */}

            
            
            <div className=''>
            <div className='row mb-3 align-items-center'>
              <div className='col-md-6'><h4 className="fw-bolder text-black text-uppercase mb-0">cert templates</h4></div>
              <div className='col-md-6 text-end'>
                <div className='btngrouprht'>
                  <a href='' className='btn btn-primary btn-icon'>< i data-eva-animation="flip" data-eva="plus-outline"></i> Add template</a>
                </div>
              </div>
            </div>
            </div>
            <div className='certtemplates'>
              <div className='row'>
                <div className="col-sm-6 col-md-3">         
                <div className='ctemp' >  
                  <input type={'radio'} id="certselect-1" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-1">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert1.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-2" name='cerselect' />       
                    <label className='backgroundblur' htmlFor="certselect-2">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert2.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-3" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-3">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert3.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-4" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-4">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert4.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-5" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-5">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert5.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-6" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-6">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert6.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-7" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-7">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert7.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                <div className="col-sm-6 col-md-3">         
                <div className='ctemp dis-bfore' >  
                  <input type={'radio'} id="certselect-8" name='cerselect'/>       
                    <label className='backgroundblur' htmlFor="certselect-8">                   
                        <div className='img'>
                          <img src={require('../assets/images/cert/cert8.png')} loading="lazy" />
                        </div>
                        <div className='cername'>Course certificate</div>
                    </label>                   
                  </div>
                </div>

                
              </div>
            </div>
            </div>
            </div>
      </div>
  );
}

export default CertificateTemplate;