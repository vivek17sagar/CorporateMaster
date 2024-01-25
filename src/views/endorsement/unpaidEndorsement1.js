import classnames from 'classnames'
import { Fragment } from 'react'
import { ArrowRight } from 'react-feather'
import { useForm } from "react-hook-form"
import { Button, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

const UnpaidEndorsement1 = (props) => {
    const { register, errors, getValues, handleSubmit } = useForm()

    const onSubmit = () => {
        // trigger()
        // console.log(errors)
        // console.log(getValues())
        // if (isObjEmpty(errors)) {
        props.stepper.next()
        // }
    }

    return (
        <Fragment>
            <CardBody>
                <CardTitle tag='h4' className='mb-75'>
                    Unpaid Endorsement Details
                </CardTitle>
                <CardSubtitle className='text-muted'>
                    Enter your unpaid endorsement details
                </CardSubtitle>
            </CardBody>
            <CardBody>


                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for={`username`}>
                                Policy Holder Name
                            </Label>
                            <Input
                                name={`username`}
                                id={`username`}
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors[`username`] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='todayDate'>
                                Today Date
                            </Label>
                            <Input
                                name='todayDate'
                                id='todayDate'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['todayDate'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='phoneNo'>
                                Phone No
                            </Label>
                            <Input
                                name='phoneNo'
                                id='phoneNo'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['phoneNo'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='email'>
                                Email
                            </Label>
                            <Input
                                name='email'
                                id='email'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['email'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='address'>
                                Address
                            </Label>
                            <Input
                                name='address'
                                id='address'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['address'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='city'>
                                City
                            </Label>
                            <Input
                                name='city'
                                id='city'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['city'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='pincode'>
                                Pincode
                            </Label>
                            <Input
                                name='pincode'
                                id='pincode'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['pincode'] })}
                            />
                        </FormGroup>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button.Ripple type='submit' color='primary' className='btn-next'>
                            <span className='align-middle d-sm-inline-block d-none'>Next</span>
                            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                        </Button.Ripple>
                    </div>
                </Form>
            </CardBody>
        </Fragment>
    )
}
export default UnpaidEndorsement1