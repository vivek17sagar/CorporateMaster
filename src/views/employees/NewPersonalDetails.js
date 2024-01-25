import classnames from 'classnames'
import { Fragment } from 'react'
import { ArrowLeft, ArrowRight, Gift } from "react-feather"
import { useForm } from 'react-hook-form'
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import profilePhoto from '@src/assets/images/icons/profilePhoto.png'
import camera from '@src/assets/images/icons/camera.png'


const NewPersonalDetails = (props) => {

    const { register, errors, getValues, handleSubmit } = useForm()
    const onSubmit = () => {
        // console.log('submit')
        props.stepper.next()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs='12'>
                    <h4>Personal Details</h4>
                </Col>
                <Col xs='12' className='text-muted'>
                    <h5>Enter Your Personal Details</h5>
                </Col>
            </Row>

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
                            Employment Of Spouse
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
            {/* <Row> */}
                <Row className='d-flex justify-content-between'>
                    <Button.Ripple color='primary' className='ml-1' onClick={() =>  props.stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-1'></ArrowLeft>
                        Previous
                    </Button.Ripple>
                    <Button.Ripple color='primary' className='ml-1' type='submit'>
                        Next
                        <ArrowRight size={14} className='align-middle ml-1'></ArrowRight>
                    </Button.Ripple>
                </Row>
            {/* </Row> */}
        </Form>
    )
}
export default NewPersonalDetails