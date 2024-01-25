import calendarIcon from '@src/assets/images/icons/calendar.png'
import camera from '@src/assets/images/icons/camera.png'
import profilePhoto from '@src/assets/images/icons/profilePhoto.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { useState } from 'react'
import { ArrowRight } from "react-feather"
import Flatpickr from 'react-flatpickr'
import { useForm } from 'react-hook-form'
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap"

const NewProfileDetails = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()
    const onSubmit = () => {
        // console.log('submit')
        props.stepper.next()
    }

    return (

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs='12'>
                    <h4>Profile Details</h4>
                </Col>
                <Col xs='12' className='text-muted'>
                    <h5>Enter Your Profile Details</h5>
                </Col>
            </Row>
            <Row>
                <Col xs='3' className='p-0'>
                    <Row className='px-1'>
                        <Col lg='3'>
                            <div class='d-flex justify-content-center mt-1 flex-wrap'>

                                <div>
                                    <img src={profilePhoto} width='85' height='85' />
                                </div>
                                <div style={
                                    {
                                        position: 'absolute',
                                        top: '75px',
                                        left: '50px'
                                    }
                                }>
                                    <img src={camera} height='20' width='20' />
                                </div>
                                <div class='text-center font-small-2'>
                                    <span>Upload Image</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg='9'>
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
                            <FormGroup>
                                <Label className='form-label' for='empId'>
                                    Employee Id
                                </Label>
                                <Input
                                    name={'empId'}
                                    id={'empId'}
                                    className={classnames({ 'is-invalid': errors[`empId`] })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col lg='12'>
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
                </Col>
                <Col xs='3'>
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
                <Col xs='3'>
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
                <Col xs='3'>
                    <FormGroup>
                        <Label className='form-label' for='policy'>
                            Policy
                        </Label>
                        <Select
                            name={'policy'}
                            id={'policy'}
                            className={classnames({ 'is-invalid': errors[`policy`] })}
                        />
                    </FormGroup>
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
            </Row>
            <Row>
                <Col className='d-flex justify-content-end'>
                    <Button.Ripple color='primary' className='ml-1' type='submit'>
                        Next
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </Col>
            </Row>
        </Form>
    )
}
export default NewProfileDetails