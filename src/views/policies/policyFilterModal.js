import { useState } from "react";
import Select from "react-select";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const PolicyFilterModal = (props) => {
  const [coverType, setCoverType] = useState("health");

  return (
    <div>
      <Modal isOpen={true} className="modal-dialog-centered">
        <ModalHeader toggle={() => props.toggleModal()}>
          Add New Policy (Other than eOxegen)
        </ModalHeader>
        <ModalBody>
          <h3>Select Plan</h3>
          <Col xs="12" className="pt-sm-1">
            <Label className="col-12 p-0 font-weight-bold font-medium-4">
              All
            </Label>
            <Input
              type="radio"
              name="type"
              value="all"
              checked={coverType === "all"}
              onChange={() => {
                setCoverType("all");
                props.toggleModal();
              }}
            />
          </Col>
          <Col xs="12" className="pt-sm-1">
            <Label className="col-12 p-0 font-weight-bold font-medium-4">
              Health Cover
            </Label>
            <Input
              type="radio"
              name="type"
              value="health"
              checked={coverType === "health"}
              onChange={() => {
                setCoverType("health");
                props.toggleModal();
              }}
            />
          </Col>
          <Col xs="12" className="pt-sm-1">
            <Label className="col-12 p-0 font-weight-bold font-medium-4">
              Life Cover
            </Label>
            <Input
              type="radio"
              name="type"
              value="life"
              checked={coverType === "life"}
              onChange={() => {
                setCoverType("life");
                props.toggleModal();
              }}
            />
          </Col>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PolicyFilterModal;
