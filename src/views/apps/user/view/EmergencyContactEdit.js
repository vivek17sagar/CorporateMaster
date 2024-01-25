import classnames from 'classnames'
import DataTable from "react-data-table-component"
import { Edit2, Trash } from "react-feather"
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from "reactstrap"

const EmergencyContactEdit = (props) => {

    const { register, errors, getValues, handleSubmit } = useForm()

    return (
        <Modal className='modal-lg modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={props.toggle}>
                Emergency Contact Details
            </ModalHeader>
            <ModalBody>
                <Form>

                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='name'>
                                    Name
                                </Label>
                                <Input
                                    name={'name'}
                                    id={'name'}
                                className={classnames({ 'is-invalid': errors[`name`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='relationship'>
                                    Relationship
                                </Label>
                                <Select
                                    name={'relationship'}
                                    id={'relationship'}
                                className={classnames({ 'is-invalid': errors[`relationship`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='phone'>
                                    Phone
                                </Label>
                                <Input
                                    placeholder='+91 98979098970'
                                    name={'phone'}
                                    id={'phone'}
                                className={classnames({ 'is-invalid': errors[`phone`] })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter className='d-flex justify-content-start'>
                <Button.Ripple color='primary'>
                    Cancel
                </Button.Ripple>
                <Button.Ripple color='primary' onClick={() => props.toggle()}>
                    Save
                </Button.Ripple>
            </ModalFooter>
        </Modal>
    )
}
export default EmergencyContactEdit