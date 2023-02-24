import { React, useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap"

const FailureModal = (props) => {
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
                    <div className="form-group text-center">

                        <h6 className='mt-1'>Mint Failed < i data-eva-animation="flip" data-eva="close-circle-outline"></i></h6>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button variant="outline-secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FailureModal;