import { useState } from "react"
import { Button, Modal, ModalBody, Row } from "reactstrap"
import whatsappIcon from '@src/assets/images/icons/whatsapp.png'
import { Mail, MessageSquare } from "react-feather"

export const OTPSelector = (props) => {
  return <div>
    <Modal className='modal-dialog-centered' isOpen={true}>
      <ModalBody className=''>
        <Row className='p-1'>
          Select where to send OTP
        </Row>
        <Row className='  justify-content-around'>

          <Button onClick={() => props.selectOTP('W')}>
            <img src={whatsappIcon} height='24' width='24' className="mr-50" />
            WhatsApp
          </Button>
          <Button onClick={() => props.selectOTP('S')}>
            <MessageSquare className="mr-50" />
            SMS
          </Button>
          <Button onClick={() => props.selectOTP('M')}>
            <Mail className="mr-50" />
            Email
          </Button>
        </Row>
      </ModalBody>
    </Modal>
  </div>
}