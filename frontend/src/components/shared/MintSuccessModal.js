import { React, useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap"

const SuccessModal = (props) => {
    const [isOpen, setIsOpen] = useState(true)


    const closeModal = () => {
        setIsOpen(false)
        props.closemodal()
    }
    return (
        <Modal show={isOpen} onHide={(e) => closeModal(e, this)} size="sm" aria-labelledby="contained-modal-title-vcenter"
            centered backdrop="static">

            <Modal.Body>
                <div className="modal-body d-flex flex-column align-items-center">
                    <div className="form-group text-center checkcross">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#7ac142" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                            <polyline className="path check" fill="none" stroke="#7ac142" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                        </svg>
                        <h4 className='mt-3  mb-0 text-uppercase'>Mint Initiated</h4>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className='bg-light justify-content-center'>
                <Button variant="outline-secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;