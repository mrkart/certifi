import { React, useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { closeInfoModal } from '../../actions/exampleAction';

const InfoModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const isModalOPen = useSelector(state => state.demoReducer.isInfoModal);

    const dispatch = useDispatch()
    useEffect(() => {
        setIsOpen(isModalOPen)
    },[isModalOPen])
    const closeModal = () => {
        setIsOpen(false)
        dispatch(closeInfoModal())
    }
    return (
        <Modal show={isOpen} onHide={(e) => closeModal(e, this)} size="sm" aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body>
                <div className="modal-body d-flex flex-column align-items-center">
                    <div className="form-group my-2 text-center">

                        <h6 className='mt-2'>Sorry, this is our future plan, isn't available right now</h6>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <Button variant="outline-secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InfoModal;