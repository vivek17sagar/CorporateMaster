import classnames from 'classnames'
import { Fragment } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useForm } from "react-hook-form"
import { Button, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

const PaidEndorsement2 = (props) => {
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
                    Paid Endorsement Details
                </CardTitle>
                <CardSubtitle className='text-muted'>
                    Enter your Paid Endorsement details
                </CardSubtitle>
            </CardBody>
            <CardBody>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for={`name`}>
                                Name
                            </Label>
                            <Input
                                name={`name`}
                                id={`name`}
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors[`name`] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='relationship'>
                                Relationship
                            </Label>
                            <Input
                                name='relationship'
                                id='relationship'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['relationship'] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for={`dob`}>
                                Date Of Birth
                            </Label>
                            <Input
                                name={`dob`}
                                id={`dob`}
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors[`dob`] })}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='phoneNo'>
                                Phone No.
                            </Label>
                            <Input
                                name='phoneNo'
                                id='phoneNo'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['phoneNo'] })}
                            />
                        </FormGroup>
                    </Row>
                    <div className='d-flex justify-content-between'>
                        <Button.Ripple onClick={() => props.stepper.previous()} color='primary' className='btn-next'>
                            <ArrowLeft className='mr-1' />
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button.Ripple>
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
export default PaidEndorsement2