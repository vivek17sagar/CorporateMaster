import Wizard from "@components/wizard"
import { useRef, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import PaidEndorsement1 from "./paidEndorsement1"
import PaidEndorsement2 from "./paidEndorsement2"
import PaidEndorsement3 from "./paidEndorsement3"

const PaidEndorsement = (props) => {
    const [stepper, setStepper] = useState(null)
    const ref = useRef(null)
    const showAlertAndClose = () => {
        props.submit()
    }
    const steps = [
        {
            id: 'paid-endorsement-form',
            title: 'Paid Endorsement Form',
            content: <PaidEndorsement1 stepper={stepper} />
        },
        {
            id: 'members',
            title: 'Members',
            content: <PaidEndorsement2 stepper={stepper} />
        },
        {
            id: 'documents',
            title: 'Documents',
            content: <PaidEndorsement3 close={() => showAlertAndClose()} stepper={stepper} />
        }
    ]


    return (
        <Modal isOpen={true} className='modal-lg'>
            <ModalHeader toggle={() => props.toggle()}>
            </ModalHeader>
            <ModalBody>
                <div className='horizontal-wizard'>
                    <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
                </div>
            </ModalBody>

        </Modal>

    )
}
export default PaidEndorsement