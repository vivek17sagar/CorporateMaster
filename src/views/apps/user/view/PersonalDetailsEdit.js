import classnames from "classnames"
import DataTable from "react-data-table-component"
import { Edit2, Trash } from "react-feather"
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from "reactstrap"

const PersonalDetailsEdit = (props) => {

    const { register, errors, getValues, handleSubmit } = useForm()

    return (
        <Modal className='modal-lg modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={props.toggle}>
                Personal Details
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='nationality'>
                                    Nationality
                                </Label>
                                <Select
                                    name={'nationality'}
                                    id={'nationality'}
                                    className={classnames({ 'is-invalid': errors[`nationality`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='religion'>
                                    Religion
                                </Label>
                                <Select
                                    name={'religion'}
                                    id={'religion'}
                                    className={classnames({ 'is-invalid': errors[`religion`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='maritalStatus'>
                                    Marital Status
                                </Label>
                                <Select
                                    name={'maritalStatus'}
                                    id={'maritalStatus'}
                                    className={classnames({ 'is-invalid': errors[`maritalStatus`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='employmentOfWife'>
                                    Employment Of Wife
                                </Label>
                                <Select
                                    name={'employmentOfWife'}
                                    id={'employmentOfWife'}
                                    className={classnames({ 'is-invalid': errors[`employmentOfWife`] })}
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
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='noOfChild'>
                                    No. of Child
                                </Label>
                                <Select
                                    name={'noOfChild'}
                                    id={'noOfChild'}
                                    className={classnames({ 'is-invalid': errors[`noOfChild`] })}
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
export default PersonalDetailsEdit