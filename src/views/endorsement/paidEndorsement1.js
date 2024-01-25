import classnames from 'classnames'
import { Fragment } from 'react'
import { ArrowRight } from 'react-feather'
import { useForm } from "react-hook-form"
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

const PaidEndorsement1 = (props) => {
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
                    Paid Endorsement
                </CardTitle>
                <CardSubtitle className='text-muted'>
                    Enter your Paid Endorsement details
                </CardSubtitle>
            </CardBody>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for={`username`}>
                                Premium Frequency
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
                                Nominee
                            </Label>
                            <Input
                                name='todayDate'
                                id='todayDate'
                                // innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['todayDate'] })}
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
export default PaidEndorsement1