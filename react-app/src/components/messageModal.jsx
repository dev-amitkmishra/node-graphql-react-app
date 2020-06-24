import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const MessageModal = (props) => {
    return (
      <>
        <Modal show={props.show} onHide={props.handleClose} centered="true">
            <Modal.Body>
              <span>
                user <span style={{color: 'blue'}}>{props.userName}</span> created successfully
              </span>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default MessageModal;