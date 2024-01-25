import { Modal, ModalBody, ModalHeader } from "reactstrap"

const EndorsementAckNumber = (props) => {
    return (
        <Modal className='modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={() => props.toggle()}>
                Endorsement Ticket No. 5476843
            </ModalHeader>
            <ModalBody>
                Your Endorsement request submitted successfully
            </ModalBody>
        </Modal>
    )
}
export default EndorsementAckNumber