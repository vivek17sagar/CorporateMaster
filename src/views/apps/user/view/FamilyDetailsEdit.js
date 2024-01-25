import calendarIcon from '@src/assets/images/icons/calendar.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import classnames from 'classnames'
import { useState } from 'react'
import { Gift } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

const FamilyDetailsEdit = (props) => {

    const { register, errors, getValues, handleSubmit } = useForm()
    const [picker, setPicker] = useState(new Date())
    return (
        <Modal className='modal-lg modal-dialog-centered' isOpen={true}>
            <ModalHeader toggle={props.toggle}>
                Family Details
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
                        <Col xs='6'>
                            <FormGroup>
                                <Label className='form-label' for='dateOfBirth'>
                                    Date Of Birth
                                </Label>
                                <InputGroup>
                                    <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
                                    <InputGroupAddon addonType='append'>
                                        <InputGroupText>
                                            <img src={calendarIcon} height='14' width='14'/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
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
export default FamilyDetailsEdit