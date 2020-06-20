import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalComp = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            {props.children}
        </Modal>
    );
};

export default ModalComp;