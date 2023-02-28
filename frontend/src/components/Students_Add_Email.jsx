import { React, useState, useEffect, useMyCustomStuff } from 'react';
import * as eva from 'eva-icons';
import * as fcl from '@onflow/fcl';
import { Buffer } from 'buffer'
// const { getAccount } = require('@onflow/sdk');
import * as t from "@onflow/types";
import { useDispatch, useSelector } from 'react-redux';
import { addOwnershipForAccount, getWalletAddress, removePublicKey, resetAddOwnership, resetAddOwnershipFailed, resetRemovePublickey, resetRemovePublickeyFailed } from '../actions/exampleAction';
import FullLoader from './shared/FullLoader';

// import * as sdk from "@onflow/sdk"
// const { getAccount } = require('@onflow/fcl');
var timeout;
const StudentsAddEmail = () => {

  const user_email = localStorage.getItem('user_email');
  let userprofile = JSON.parse(localStorage.getItem('userprofile'));
  const userFlowAddress = userprofile.flowAddress;

  const [email, setEmail] = useState('');
  const [verifyOTP, setVerifyOTP] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState(false)
  const [infoMessage,setInfoMessage] = useState(false)
  const [failedMessage,setFailedMessage] = useState('')
  const [successMessage,setSuccessMessage] = useState('')
  const dispatch = useDispatch();
  const ownershipAdded = useSelector(state => state.demoReducer.flowOwnership);
  const ownershipFailed = useSelector(state => state.demoReducer.flowOwnershipFailed);
  const keyRemoved = useSelector(state => state.demoReducer.removedKey);
  const keyRemovedFailed = useSelector(state => state.demoReducer.removeKeyFailed);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email };
    if (formData.email) {
      if (!verifyOTP.includes(formData.email)) {
        setVerifyOTP([...verifyOTP, formData.email]);
      }
    }
    // console.log(verifyOTP);
  };
  useEffect(() => { eva.replace() });


  const addOwnership = async () => {
    setIsLoading(true)

    const address = await fcl.currentUser().authenticate();
    const account = await fcl.send([fcl.getAccount(address.addr)])
    const studAccount = await fcl.send([fcl.getAccount(userFlowAddress)])
    dispatch(getWalletAddress())

    console.log(account.account.keys)
    const mykey = account.account.keys.find(item => item.weight === 1000 & item.revoked === false);
    console.log(mykey)

    if (account && account.account && account.account.keys && account.account.keys[0]) {
      const key = account.account.keys[0]
      const hashAlgStr = key.hashAlgoString
      const signAlgStr = key.signAlgoString
      if (key.publicKey) {
        let obj = {
          key: key.publicKey
        }
        if (hashAlgStr.includes('SHA3_256')) {
          obj['hashAlg'] = 3
        } else {
          obj['hashAlg'] = 2
        }
        if (signAlgStr.includes('secp256k1')) {
          obj['signAlg'] = 2
        } else {
          obj['signAlg'] = 1
        }
        const ownerKey = studAccount.account.keys.find(item => item.publicKey === key.publicKey);
        if (ownerKey && ownerKey.publicKey) {
          setInfoMessage(true)
          setIsLoading(false)
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            setInfoMessage(false)
          }, 4000)
        } else {
          dispatch(addOwnershipForAccount(obj))
        }


      }
    }



  }
  useEffect(() => {
    if (ownershipAdded && ownershipAdded.statusCode === 200) {
      dispatch(resetAddOwnership())
      setIsLoading(false)
      setAddSuccess(true)
      setSuccessMessage('Ownership added')
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setAddSuccess(false)
      }, 4000)

    }
  }, [ownershipAdded])
  useEffect(() => {
    if (ownershipFailed && ownershipFailed.length > 0 && typeof ownershipFailed === 'string') {
      dispatch(resetAddOwnershipFailed())
      setFailedMessage(ownershipFailed)
      setErrorMessage(true)
      clearTimeout(timeout)
      setIsLoading(false)
      timeout = setTimeout(() => {
        setErrorMessage(false)
      }, 4000)


    }


  }, [ownershipFailed])
  const removeCustodial = async () => {
    setIsLoading(true)
    const address = await fcl.currentUser().authenticate();
    const account = await fcl.send([fcl.getAccount(address.addr)])
    const studAccount = await fcl.send([fcl.getAccount(userFlowAddress)])
    dispatch(getWalletAddress())
    const acckey = account.account.keys[0]

    if(studAccount && studAccount.account && studAccount.account.keys && studAccount.account.keys[0]){
      const stukey = studAccount.account.keys[0]

      const ownerKey = studAccount.account.keys.find(item => item.publicKey === acckey.publicKey);
        if (ownerKey && ownerKey.publicKey) {
          if(stukey && stukey.revoked){
            setFailedMessage("Already rovoked")
            setErrorMessage(true)
            clearTimeout(timeout)
            setIsLoading(false)
            timeout = setTimeout(() => {
              setErrorMessage(false)
            }, 4000)
          }else{
            dispatch(removePublicKey())
          }
        } else {
          setFailedMessage("Claim your Certifi Custodial wallet first")
            setErrorMessage(true)
            clearTimeout(timeout)
            setIsLoading(false)
            timeout = setTimeout(() => {
              setErrorMessage(false)
            }, 4000)
        }
      
    }
    
        
    
  }
  useEffect(() => {
    if(keyRemoved && keyRemoved.statusCode === 200){
      setIsLoading(false)
      dispatch(resetRemovePublickey())
      setAddSuccess(true)
      setSuccessMessage('Key Deleted')
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setAddSuccess(false)
      },4000)
    }
  },[keyRemoved])
  useEffect(() => {
    if(keyRemovedFailed && keyRemovedFailed.length > 0 && typeof keyRemovedFailed === 'string'){
      dispatch(resetRemovePublickeyFailed())
      setErrorMessage(true)
      setFailedMessage(keyRemovedFailed)
      clearTimeout(timeout)
      setIsLoading(false)
      timeout = setTimeout(() => {
        setErrorMessage(false)
      },4000)
    }
  },[keyRemovedFailed])

  return (
    <div className='scrolldiv'>
      <div className="row mb-3"><div className="col-md-12 text-start"><h4 className="fw-bolder text-black text-uppercase mb-0">Sync Accounts</h4></div></div>
      <div className='row'>
        <div className='col-md-12 text-start'>
          <div className='row mb-3 align-items-center addemailaccount'>
            <div className='col-md-12 mb-3'>
              {isLoading ? <FullLoader /> : ''}
              <div className='backgroundblur'>
              
              {addSuccess &&
                      <div class="alert alert-success text-center py-3 fade show fadein alert-top" role="alert">
                        {successMessage}
                      </div>
                    }
              {errorMessage &&
                <div class="alert alert-danger text-center py-3 fade show fadein alert-top" role="alert">
                  {failedMessage}
                </div>
              }
              {infoMessage &&
                      <div class="alert alert-warning text-center py-3 fade show fadein alert-top" role="alert">
                        Already added
                      </div>
                    }
                {/* <h6 className="fw-bolder text-black text-uppercase">Email Accounts</h6> */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className='col-md-4'>
                      <h6 className="fw-bolder text-black text-uppercase">Add an email account</h6>
                      <div className="input-group mb-3 inputbtngroup">
                        <input type={'text'} name="email" value={email} onChange={handleInputChange} className="form-control" placeholder='Email' />
                        <button type="submit" className='btn btn-primary btn-icon'><i data-eva="plus-outline"></i> Add</button>
                      </div>
                    </div>
                    <div className='col-md-8'>
                    {verifyOTP.length != 0 &&
                
                <div className='verifyotp fadein'>
                  <h6 className="fw-bolder text-black text-uppercase">Check email inbox for OTP <span className='text-secondary small'>(Coming soon)</span></h6>
                  {verifyOTP.map((user, index) => (
                  <div className="input-group inputbtngroup w-auto d-inline-flex" key={index}>
                  <div className="otp-input-fields">
                              <input type="number" className="otp__digit otp__field__1" />
                              <input type="number" className="otp__digit otp__field__2" />
                              <input type="number" className="otp__digit otp__field__3" />
                              <input type="number" className="otp__digit otp__field__4" />
                              <input type="number" className="otp__digit otp__field__5" />
                              <input type="number" className="otp__digit otp__field__6" />
                            </div>
                            <button type="submit" className='btn btn-primary btn-icon'>Verify OTP</button>
                  </div>
                   ))}
                  
                </div>
             
            }
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='col-md-12 mb-3'>
              <div className='backgroundblur'>
                <h6 className="fw-bolder text-black text-uppercase">Synced email accounts</h6>

                <div className='tableblur mt-4'>
                  <div className='table-responsive'>
                    <table className="table align-middle mb-0 custable table-hover">
                      <thead className="">
                        <tr>
                          <th></th>
                          <th>Email Id</th>
                          <th className='text-center'>Flow Address</th>
                          <th className='text-center'>Action</th>
                          {/* <th className='text-center d-none'>Action</th> */}
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
                            {user_email} <span className='badge badge-success'>VERIFIED</span>
                          </td>
                          <td className='text-center'>
                            <a target="_blank" href={`https://testnet.flowview.app/account/${userFlowAddress}/collection`}> {userFlowAddress} </a>
                            <p className='text-secondary mb-0'>Certifily Custodial Child Account</p>
                          </td>
                          <td className='text-center'>
                            <div className='btngrouprht'>
                              <button type="submit" className='btn btn-primary btn-icon eva-hover' onClick={addOwnership} ><i data-eva="archive-outline" data-eva-animation="flip"></i> Claim Ownership </button>
                              <button type="submit" className='btn btn-primary btn-icon eva-hover' onClick={removeCustodial} ><i data-eva="corner-up-left-outline" data-eva-animation="flip"></i> Revoke Certifi Custodial </button>
                            </div>
                          </td>

                          {/* <td className='text-center'>
                            <div className='btngrouprht'>
                              <a href="" className='btn btn-outline-primary text-primary btn-sm btn-action'>< i data-eva-animation="flip" data-eva="trash-2-outline"></i></a>
                            </div>
                          </td> */}
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>


          
          </div>

        </div>
      </div>
    </div >

  );
}

export default StudentsAddEmail;