import calendarIcon from '@src/assets/images/icons/calendar.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { useForm } from 'react-hook-form'
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

const ProfileDetailsEdit = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()
    return (
        <Modal className='modal-lg modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={props.toggle}>
                Profile Details
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='firstName'>
                                    First Name
                                </Label>
                                <Input
                                    name={'firstName'}
                                    id={'firstName'}
                                    className={classnames({ 'is-invalid': errors[`firstName`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='lastName'>
                                    Last Name
                                </Label>
                                <Input
                                    name={'lastName'}
                                    id={'lastName'}
                                    className={classnames({ 'is-invalid': errors[`lastName`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='designation'>
                                    Designation
                                </Label>
                                <Select
                                    name={'designation'}
                                    id={'designation'}
                                    className={classnames({ 'is-invalid': errors[`designation`] })}
                                />
                            </FormGroup>
                        </Col>
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
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='dateOfBirth'>
                                    Date of Birth
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
                                <Label className='form-label' for='dateOfJoin'>
                                    Date of Join
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
                                <Label className='form-label' for='email'>
                                    Email
                                </Label>
                                <Input
                                    type='email'
                                    name={'email'}
                                    id={'email'}
                                    className={classnames({ 'is-invalid': errors[`email`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='gender'>
                                    Gender
                                </Label>
                                <Select
                                    name={'gender'}
                                    id={'gender'}
                                    className={classnames({ 'is-invalid': errors[`gender`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='12'>
                            <FormGroup>
                                <Label className='form-label' for='address'>
                                    Address
                                </Label>
                                <Input
                                    name={'address'}
                                    id={'address'}
                                    className={classnames({ 'is-invalid': errors[`address`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='city'>
                                    City
                                </Label>
                                <Input
                                    name={'city'}
                                    id={'city'}
                                    className={classnames({ 'is-invalid': errors[`city`] })}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='pincode'>
                                    Pincode
                                </Label>
                                <Input
                                    name={'pincode'}
                                    id={'pincode'}
                                    className={classnames({ 'is-invalid': errors[`pincode`] })}
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
export default ProfileDetailsEdit