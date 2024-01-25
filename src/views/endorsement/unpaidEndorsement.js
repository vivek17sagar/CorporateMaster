import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import Wizard from "@components/wizard"
import { useRef, useState } from "react"
import UnpaidEndorsement1 from "./unpaidEndorsement1"
import UnpaidEndorsement2 from "./unpaidEndorsement2"

const UnpaidEndorsement = (props) => {
    const [stepper, setStepper] = useState(null)
    const ref = useRef(null)
    const showAlertAndClose = () => {
        props.submit()
    }
    const steps = [
        {
            id: 'unpaid-endorsement-form',
            title: 'Unpaid Endorsement Form',
            content: <UnpaidEndorsement1 stepper={stepper} />
        },
        {
            id: 'documents',
            title: 'Documents',
            content: <UnpaidEndorsement2 close={() => showAlertAndClose()} stepper={stepper} />
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
export default UnpaidEndorsement