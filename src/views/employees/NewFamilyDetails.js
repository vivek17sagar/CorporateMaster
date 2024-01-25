import calendarIcon from '@src/assets/images/icons/calendar.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from "react-feather"
import Flatpickr from 'react-flatpickr'
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap"

const NewFamilyDetails = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()

    const onSubmit = () => {
        // console.log('submit')
        props.close()
    }

    const next = () => {
        props.stepper.next()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs='12'>
                    <h4>Family Details</h4>
                </Col>
                <Col xs='12' className='text-muted'>
                    <h5>Enter Your Family Details</h5>
                </Col>
            </Row>

            <Row>
                <Col xs='3'>
                    <FormGroup>
                        <Label className='form-label' for='name'>
                            Name
                        </Label>
                        <Input
                            name={'name'}
                            id={`name${props.id}`}
                            className={classnames({ 'is-invalid': errors[`name`] })}
                        />
                    </FormGroup>
                </Col>
                <Col xs='3'>
                    <FormGroup>
                        <Label className='form-label' for='relationship'>
                            Relationship
                        </Label>
                        <Select
                            name={'relationship'}
                            id={`relationship${props.id}`}
                            className={classnames({ 'is-invalid': errors[`relationship`] })}
                        />
                    </FormGroup>
                </Col>

                <Col xs='3'>
                    <FormGroup>
                        <Label className='form-label' for='dob'>
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
                <Col xs='3'>
                    <FormGroup>
                        <Label className='form-label' for='phone'>
                            Phone Number
                        </Label>
                        <Input
                            placeholder='+91 98979098970'
                            name={'phone'}
                            id={`phone${props.id}`}
                            className={classnames({ 'is-invalid': errors[`phone`] })}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className='d-flex justify-content-between'>
                <Col>
                    {props.showPrevious && <Button.Ripple color='primary' onClick={() => props.stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-1' />
                        Previous
                    </Button.Ripple>}
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button.Ripple color='warning' className='ml-1' type='submit'>
                        Save
                    </Button.Ripple>

                    {props.showNext && <Button.Ripple color='primary' className='ml-1' onClick={next}>
                        Next
                        <ArrowRight size={14} className='align-middle ml-1'></ArrowRight>
                    </Button.Ripple>}
                </Col>
            </Row>
        </Form>
    )
}
export default NewFamilyDetails