import { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import whatsappIcon from "@src/assets/images/icons/whatsapp.png";
import InputPasswordToggle from "@components/input-password-toggle";

// import { Mail, MessageSquare } from "react-feather"

export const OTPInput = (props) => {
  const [otp, setOtp] = useState("");
  return (
    <div>
      <Modal className="modal-dialog-centered" isOpen={true}>
        <ModalBody className="p-1">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="mb-0">Enter OTP</Label>
                <InputPasswordToggle
                  name="otp"
                  value={otp}
                  onChange={(c) => {
                    setOtp(c.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <Button className="mt-2" onClick={() => props.selectOTP(otp)}>
                Continue
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};
