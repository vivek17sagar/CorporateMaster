import calendarIcon from '@src/assets/images/icons/calendar.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { useState } from 'react'
import { ArrowLeft } from "react-feather"
import Flatpickr from 'react-flatpickr'
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap"

const NewPolicyDetails = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()

    const onSubmit = () => {
        // console.log('submit')
        props.close()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs='12'>
                    <h4>Policy Details</h4>
                </Col>
                <Col xs='12' className='text-muted'>
                    <h5>Enter Your Policy Details</h5>
                </Col>
            </Row>

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
                <Col xs='6'>
                    <FormGroup>
                        <Label className='form-label' for='policyType'>
                            Policy Type
                        </Label>
                        <Select
                            name={'policyType'}
                            id={'policyType'}
                            className={classnames({ 'is-invalid': errors[`policyType`] })}
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
                        <Label className='form-label' for='renewalOn'>
                            Renewal On
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
            <Row className='d-flex justify-content-between'>
                <Button.Ripple color='primary' className='ml-1' onClick={() => props.stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle mr-1'></ArrowLeft>
                    Previous
                </Button.Ripple>
                <Button.Ripple color='warning' className='ml-1' type='submit'>
                    Save
                </Button.Ripple>
            </Row>
        </Form>
    )
}
export default NewPolicyDetails