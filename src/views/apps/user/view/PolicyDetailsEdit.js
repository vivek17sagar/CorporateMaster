import calendarIcon from '@src/assets/images/icons/calendar.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

const PolicyDetailsEdit = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()


    return (
        <Modal className='modal-lg modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={props.toggle}>
                Policy Details
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='policyPlan'>
                                    Policy Plan
                                </Label>
                                <Select
                                    name={'policyPlan'}
                                    id={'policyPlan'}
                                    className={classnames({ 'is-invalid': errors[`policyPlan`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className='form-label' for='policyTerm'>
                                    Policy Term
                                </Label>
                                <Select
                                    name={'policyTerm'}
                                    id={'policyTerm'}
                                    className={classnames({ 'is-invalid': errors[`policyTerm`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='policyStartDate'>
                                    Policy Start Date
                                </Label>
                                <InputGroup>
                                    <InputGroup>
                                        <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText>
                                                <img src={calendarIcon} height='14' width='14' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='expiryDate'>
                                    Expiry Date
                                </Label>
                                <InputGroup>
                                    <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                                    <InputGroupAddon addonType='append'>
                                        <InputGroupText>
                                            <img src={calendarIcon} height='14' width='14' />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='familyMembers'>
                                    Family Members
                                </Label>
                                <Select
                                    name={'familyMembers'}
                                    id={'familyMembers'}
                                    className={classnames({ 'is-invalid': errors[`familyMembers`] })}
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
                <Button.Ripple onClick={() => props.toggle()} color='primary'>
                    Save
                </Button.Ripple>
            </ModalFooter>
        </Modal>
    )
}
export default PolicyDetailsEdit