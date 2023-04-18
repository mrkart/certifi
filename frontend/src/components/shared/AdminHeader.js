import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commonError, commonSuccess, getWalletAddress, importUsers, resetImportUserFailed, resetImportUserSuccess, resetMintDocsType } from '../../actions/exampleAction';
import { getOrgName, getUsername } from '../../helpers/authData';
import { NavLink, useLocation } from 'react-router-dom';
import ProfileArea from './ProfileArea';
import { Modal, Button } from "react-bootstrap"
import * as eva from 'eva-icons';

const AdminHeader = () => {

  let userName = getUsername()
  let userOrg = getOrgName();
  const [address, setAddress] = useState('')
  const [isMintTypeClicked, setIsMintTypeClicked] = useState(false)
  const dispatch = useDispatch()
  const walletaddress = useSelector(state => state.demoReducer.walletAddress);
  const mintCertificateTypeClicked = useSelector(state => state.demoReducer.isDocTypeClicked);
  const navigate = useNavigate()
  const importSuccess = useSelector(state => state.demoReducer.importUsersSuccess);
  const importFailed = useSelector(state => state.demoReducer.impoerUsersFailed);
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  let location = useLocation();
 
 
  useEffect(() => {
    setIsMintTypeClicked(mintCertificateTypeClicked)
  }, [mintCertificateTypeClicked])
  const loadTitle = () => {
    if ((location && location.pathname && location.pathname === '/users')) {
      return 'Users'
    } else if (location && location.pathname && location.pathname.includes('/create-token')) {
      return 'API Tokens'
    } else if (location && location.pathname && location.pathname.includes('/add-user')) {
      return 'Add Users'
    } else if (location && location.pathname && location.pathname.includes('/users-import')) {
      return 'Import Users'
    } else if (location && location.pathname && location.pathname.includes('/edit-user')) {
      return 'Edit Users'
    } else if (location && location.pathname && location.pathname.includes('/create/document')) {
      return 'Create Document'
    } else if (location && location.pathname && location.pathname.includes('/documents/all')) {
      return 'All Documents'
    } else if (location && location.pathname && location.pathname.includes('/agreement-signers')) {
      return 'Agreement Contract'
    } else if (location && location.pathname && location.pathname.includes('/attributes')) {
      return 'Agreement Contract'
    } else if (location && location.pathname && location.pathname.includes('/select-template')) {
      return 'cert templates'
    }
    else if (location && location.pathname && location.pathname.includes('/create/file')) {
      return 'Create File'
    }
    else if (location && location.pathname && location.pathname.includes('/')) {
      return ''
    }
  }
  const isUser = () => {
    if (
      location && location.pathname && location.pathname.includes('/users')
    ) {
      return true
    } else {
      return false
    }
  }
  const isAddUser = () => {
    if (location && location.pathname && (location.pathname.includes('/add-user') || location.pathname.includes('/edit-user'))) {
      return true
    } else {
      return false
    }
  }
  const isIssueCertificate = () => {
    if (
      location && location.pathname && location.pathname.includes('/mint-certificate')
    ) {
      return true
    } else {
      return false
    }
  }
  const isAgreementPage = () => {
    if (location && location.pathname && location.pathname.includes('/create/document')) {
      return true
    } else {
      return false
    }
  }
  const isAllDocPage = () => {
    if (location && location.pathname && location.pathname.includes('/documents/all')) {
      return true
    } else {
      return false
    }
  }
  const isAgreementSigner = () => {
    if (location && location.pathname && (location.pathname.includes('/agreement-signers') || location.pathname.includes('/attributes'))) {
      return true
    } else {
      return false
    }
  }
  const importUsersClick = () => {
    if ((location && location.pathname && location.pathname.includes('/users-import'))) {
      setIsOpen(true)
    } else {
      navigate('/users-import')
    }
  }
  const handleSelectCSV = (e) => {
    let uploadFile = e.target.files[0]
    closeModal()
    const types = ['text/csv']
    let err = '';

    const sizeLimit = 1 * (1e+6);
    e.target.value = null;
    if (uploadFile == undefined || uploadFile.type == undefined) {
      return false
    }
    else if ((types.every(type => uploadFile && uploadFile.type !== type))) {

      err += uploadFile.type + ' is not a supported format\n';
      dispatch(commonError(err))

    } else if (uploadFile && uploadFile.size >= sizeLimit) {
      err += `Maximum supported file size is ${1} MB`;
      dispatch(commonError(err))

    } else {
      if (uploadFile) {
        setIsUploading(true)
        dispatch(importUsers(uploadFile))

        // this.setState({ uploadedFile: uploadFile, localImageName: uploadFile && uploadFile.name })
      }
    }

  }
  useEffect(() => {
    if (importFailed && importFailed.statusCode) {
      setIsUploading(false)
      setIsOpen(false)

      dispatch(resetImportUserFailed())
      if (importFailed && (importFailed.statusCode === 403 || importFailed.statusCode === 401)) {
        navigate('/login')
      }else if (importFailed && importFailed.data && importFailed.data[0] && importFailed.data[0][0] && typeof importFailed.data[0][0] === 'string') {
        dispatch(commonError(importFailed.data[0][0]))
      } else if (importFailed.message) {
        dispatch(commonError(importFailed.message))
      }
    }
  }, [importFailed])
  useEffect(() => {
    if (importSuccess && importSuccess.statusCode === 202) {
      setIsUploading(false)
      dispatch(resetImportUserSuccess())
      dispatch(commonSuccess("Successfully imported"))

    }
  }, [importSuccess])
  
  const downloadCsv = () => {
    closeModal()
    var csvFileData = [  
      ['example@gmail.com', 'firstname','+1-202-555-0173','Batch A'] 
   ];  
   //define the heading for each row of the data  
   var csv = 'email,name,phone,slotName\n';  
      
   //merge the data with CSV  
   csvFileData.forEach(function(row) {  
           csv += row.join(',');  
           csv += "\n";  
   });  
   var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
      
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = 'sample.csv';  
    hiddenElement.click();  


  }
  useEffect(() => { eva.replace() });

  return (
    <div className='pageheader'>
      <Modal show={isOpen} onHide={(e) => closeModal(e, this)} size="md" aria-labelledby="contained-modal-title-vcenter"
        centered backdrop="static" className='fadein'>

        <Modal.Body>
        <span className='mcls' onClick={closeModal}>&times;</span>
          <div className="modal-body d-flex flex-column align-items-center">
            
            <div className="form-group1 text-center">
              <div className=' mb-5'><img src={require('../../assets/images/logo.png')} loading="lazy" /></div>
              <div className='btngrouprht'>
                <button onClick={downloadCsv} type="button" className="btn btn-primary btn-icon icon-rht">Download sample CSV <i data-eva-animation="flip" data-eva="download-outline"></i></button>
                <label htmlFor="file-upload" className="btn btn-primary btn-icon icon-rht">
                  Upload CSV <i data-eva-animation="flip" data-eva="upload-outline"></i>
                </label>
                {/* <input type="file" id="file-upload" single="" onChange={handleSelectCSV} accept=".csv" /> */}

              </div>
            </div>
          </div>

        </Modal.Body>
        {/* <Modal.Footer className='bg-light justify-content-center'>
                <Button variant="outline-secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer> */}
      </Modal>
      {isIssueCertificate() ?

        <div className='row mb-3 align-items-center'>
          {isMintTypeClicked ? <div className='col-md-6'>
            <div className='userOrg'>
              <img src={require('../../assets/images/icons/Certifily-icon.png')} loading="lazy" />
              <h4 className="fw-bolder text-black text-uppercase mb-0">Create Certificate</h4>
            </div>
          </div> : <div className='col-md-6'>
            <h4 className="fw-bolder text-black text-uppercase mb-2">Create</h4>
            <h6 className='mb-0'>Select a document type to be minted as NFT</h6>
          </div>}
          <div className='col-md-6 text-end'>
            <div className='btnwithpro'>
              <ProfileArea />
            </div>
          </div>
        </div>
        :
        <div className='row mb-3 align-items-center'>
          <div className={isAgreementSigner() ? 'col-md-6' : 'col-md-4'}>
            <h4 className="fw-bolder text-black text-uppercase mb-0">{isAddUser() ? <NavLink to="/users" className='text-dark d-inline-block'>Users {'>'}</NavLink> : ''} {loadTitle()}</h4>
            {isAgreementSigner() ? <h6 className='mb-0'>Insurance Agreement</h6> : ''}
          </div>

          <div className={isAgreementSigner() ? 'col-md-6 text-end' : 'col-md-8 text-end'}>
            <div className='btnwithpro'>
              {isUser() ? <div className='btngrouprht'>
                <NavLink to="/add-user" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="plus-outline"></i> Add users</NavLink>
                {isUploading && 
                <button
                type="button"
                className="btn btn-light btn-icon btn-disabled bg-white">

                <img
                  src={require('../../assets/images/certifi-loader.gif')}
                  loading="lazy"
                  alt="Loading..." width={28}
                />&nbsp;Uploading.. 
              </button>}
                {!isUploading && <button className="btn btn-primary btn-icon" type='button' onClick={importUsersClick}>< i data-eva-animation="flip" data-eva="code-download-outline"></i> Import users</button>}
                <input type="file" id="file-upload" single="" onChange={handleSelectCSV} accept=".csv" />

              </div> : isAgreementPage() ?
                <div className='btngrouprht'>
                  <NavLink to="/documents/all" className="btn btn-primary btn-icon"><i data-eva-animation="flip" data-eva="file-text-outline"></i> All Documents</NavLink>
                </div> : isAllDocPage() ?
                  <div className='btngrouprht'>
                    <NavLink to="/create/document" className="btn btn-primary btn-icon">< i data-eva-animation="flip" data-eva="plus-outline"></i> Create Document</NavLink>
                  </div> : ''}
              <ProfileArea />
            </div>
          </div>
        </div>}
    </div>

  );
}

export default AdminHeader;