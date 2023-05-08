import { React, useState, useEffect, useMyCustomStuff, Fragment } from 'react';
import { Tooltip, ResponsiveContainer } from 'recharts';
import { SketchPicker } from 'react-color';
import * as eva from 'eva-icons';


const CertificateTemplateCustomize = () => {

  const [title, setTitle] = useState('Course Certificate');
  const [fontOption, setFontOption] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [fontStyle, setFontStyle] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorr, setColorr] = useState('#005FFF');
  const [nameXCoor, setNameXCoor] = useState('')
  const [nameYCoor, setNameYCoor] = useState('')

  const [batchXCoor, setBatchXCoor] = useState('')
  const [batchYCoor, setBatchYCoor] = useState('')

  const [courseXCoor, setCourseXCoor] = useState('')
  const [courseYCoor, setCourseYCoor] = useState('')

  const [templateImage, setTemplateImage] = useState('')
  const [templateFile, setTemplateFile] = useState('')
  const [batch, setBatch] = useState('2023')
  const [course, setCourse] = useState('B.Sc')

  const [institutionXCoor, setInstitutionXCoor] = useState('')
  const [institutionYCoor, setInstitutionYCoor] = useState('')
  const [institutionName, setInstitutionName] = useState('')

  const [isPreview, setIsPreview] = useState(false)
  function handleColorClick() {
    setDisplayColorPicker(!displayColorPicker);
  }
  function handleColorClose() {
    setDisplayColorPicker(false);
  }
  function handleColorChange(newColor) {
    setColorr(newColor.hex);
  }
  const onChangeValue = (e) => { };

  const styles = {
    color: {
      width: '36px',
      backgroundColor: colorr,
    },
    swatch: {
      padding: '5px',
      backgroundColor: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
      top: '50px',
      right: '0px'
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  };
  useEffect(() => { eva.replace() })

  useEffect(() => {
    document.body.classList.add('customize-template')
    return () => {
      document.body.classList.remove('customize-template')
    }
  }, [])

  const handleTemplateImage = (e) => {
    const uplaodFile = e.target.files[0]
    setTemplateImage(URL.createObjectURL(e.target.files[0]))
    setTemplateFile(e.target.files[0])
  }
  const handleNamexCoor = (e) => {
    setNameXCoor(e.target.value)
  }
  const handleNameyCoor = (e) => {
    setNameYCoor(e.target.value)
  }

  const handleBatchXCoor = (e) => {
    setBatchXCoor(e.target.value)
  }
  const handleBatchYCoor = (e) => {
    setBatchYCoor(e.target.value)
  }

  const handleCourseXCoor = (e) => {
    setCourseXCoor(e.target.value)
  }
  const handleCourseYCoor = (e) => {
    setCourseYCoor(e.target.value)
  }

  const handleCourse = (e) => {
    setCourse(e.target.value)
  }
  const handleBatch = (e) => {
    setBatch(e.target.value)
  }
  const handleFontChange = (e) => {
    setFontOption(e.target.value)
  }
  const handleFontSize = (e) => {
    setFontSize(e.target.value)
  }
  const handleFontStyle = (e) => {
    e.preventDefault()
    setFontStyle(e.target.value)
  }
  const handlePreview = (e) => {
    e.preventDefault()
    setIsPreview(true)
  }
  const createTemplate = (e) => {
    e.preventDefault()
    console.log("create")
  }
  const handleInstitution = (e) => {
    setInstitutionName(e.target.value)
  }
  const handleInstitutionXCoor = (e) => {
    setInstitutionXCoor(e.target.value)
  }
  const handleInstitutionYCoor = (e) => {
    setInstitutionYCoor(e.target.value)
  }
  return (
    <Fragment>
      <div className='fadein'>
        <div class="cs-mention ">
          <div class="cs-mrhtsidebar show cs-customcert">
            <div class="tableblur fadein">
              <div className='form-group'>
                <label className='mb-2'>Upload Template</label>
                <label htmlFor="file-upload" className="custom-file-upload bluetheme form-control">Upload Template <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                <input id="file-upload" type="file" />
              </div>

              <div class="form-group">
                <label class="mb-2">Template Name</label>
                <input type="text" class="form-control" placeholder="Title" disabled="" value="Course Certificate" />
              </div>

              <hr className='light-brd ' />

              <div className='form-group'>
                <h4 className='formsubhead mb-0'>User Name Style</h4>
              </div>

              <div class="form-group">
                <label class="mb-2">Select font</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">T</span>
                  <select class="form-control">
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
              <div class="txtsfont">
                <div class="row">
                  <div class="col-md-5">
                    <div class="form-group">
                      <label class="mb-2">Font size</label>
                      <div class="input-group has-validation">
                        <select class="form-control">
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
                  <div class="col-md-7">
                    <div class="form-group">
                      <label class="mb-2">Font style</label>
                      <div class="btn-toolbar mb-3 form-control" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group me-2" role="group" aria-label="First group">
                          <button type="button" class="btn btn-outline-secondary bold">B</button><button type="button" class="btn btn-outline-secondary italic">I</button>
                          <button type="button" class="btn btn-outline-secondary underline">U</button><button type="button" class="btn btn-outline-secondary linethrough">S</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='form-group'>
                <label className='mb-2'>Font color</label>
                {/* <div className="input-group has-validation">                                      
                                      <span className='pickclr input-group-text' style={{ backgroundColor: '#005FFF' }}></span>
                                      <input type={'text'} className="form-control" placeholder='#005FFF' value={color} onChange={onChangeValue} />         
                                    </div>               */}
                <div className="input-group has-validation">
                  {/* <div style={styles.swatch} onClick={handleClick}>
                                      <div style={styles.color} />
                                    </div> */}
                  <span className='pickclr input-group-text' style={styles.color} onClick={handleColorClick}></span>
                  {displayColorPicker ? (
                    <div style={styles.popover}>
                      <div style={styles.cover} onClick={handleColorClose} />
                      <SketchPicker color={colorr} onChange={handleColorChange} />
                    </div>
                  ) : null}
                  <input type={'text'} className="form-control" placeholder='#005FFF' value={colorr} readOnly />
                </div>
              </div>


              <hr className='light-brd ' />
              <div className='form-group'>
                <h4 className='formsubhead mb-0'>Set Place</h4>
                <p className='small'>Drag and drop to set tag place</p>
              </div>
              <div class="txtsfont">
                <div class="form-group">
                  <div className='ddspbadge' >
                    <div className='badge badge-light'>NAME</div>
                    <div className='badge badge-light'>CERTIFICATE NO</div>
                    <div className='badge badge-light'>COURSE</div>
                    <div className='badge badge-light'>GRADE</div>
                    <div className='badge badge-light'>BATCH</div>
                  </div>
                </div>
              </div>

              <hr className='light-brd ' />

              {/* <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <h4 className='formsubhead mt-3 mb-4'>Manage signatures</h4>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='mb-2'>Name of <span className='text-uppercase fw-bold'>Chief executive officer</span> </label>
                    <input type={'text'} className="form-control" placeholder='Name' value="Ruby D. Huffman" readOnly />
                  </div>
                  <div className='form-group'>
                    <label className='mb-2'>Upload <span className='text-uppercase'>Chief executive officer</span> signature</label>
                    <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox h-auto p-2'>
                      <img src={require('../assets/images/cert/cert1-split/chief-executive-officer.png')} className="mw-100 mh-100" loading="lazy" />
                     
                    </div>
                  </div>
                </div>
              <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='mb-2'>Name of <span className='fw-bold text-uppercase'>Department head</span> </label>
                    <input type={'text'} className="form-control" placeholder='Name' value="David P. Liriano" readOnly />
                  </div>
                  <div className='form-group'>
                    <label className='mb-2'>Upload <span className='text-uppercase'>Department head</span> signature</label>
                    <label htmlFor="file-upload1" className="custom-file-upload form-control">Upload signature <i data-eva-animation="flip" data-eva="upload-outline"></i></label>
                    <input id="file-upload" type="file" />
                  </div>
                  <div className='form-group'>
                    <div className='imgpreviewbox h-auto p-2'>
                      <img src={require('../assets/images/cert/cert1-split/department-head.png')} className="mw-100 mh-100" loading="lazy" />                      
                    </div>
                  </div>
                </div> 
              </div>*/}
            </div>
          </div>
          <div class="cs-meditor">
            <div class="tableblur fadein">
              <div class="acboxs cs-previewcus">
                <img src={require('../assets/images/cert/cert2-split/Blue-and-Yellow.png')} alt="Certifily" loading="lazy" />
              </div>
            </div>
          </div>
        </div>


        <div className='row align-items-center mt-3'>

          <div className='col-12 text-end'>
            <div className='btngrouprht'>
              <button className='btn btn-primary btn-icon icon-rht' type='button' onClick={handlePreview}>Save < i data-eva-animation="flip" data-eva="save-outline"></i></button>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
}



export default CertificateTemplateCustomize;

function PreviewImage(props) {
  const handleToCreateTemplate = (e) => {
    props.createTemplate(e)
  }
  return (
    <div className='fadein'>
      <div className='row align-items-center'>

        <div className='col-12 text-end'>
          <div className='btngrouprht'>
            <button className='btn btn-primary btn-icon icon-rht' type='button' onClick={handleToCreateTemplate}>Create< i data-eva-animation="flip" data-eva="arrow-forward-outline"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}