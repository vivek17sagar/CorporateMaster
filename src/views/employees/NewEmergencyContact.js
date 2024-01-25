import classnames from 'classnames'
import { ArrowLeft, ArrowRight, Gift } from "react-feather"
import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap"

const NewEmergencyContact = (props) => {

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
                    <h4>Emergency Contact</h4>
                </Col>
                <Col xs='12' className='text-muted'>
                    <h5>Enter Your Contact Details</h5>
                </Col>
            </Row>

            <Row>
                <Col xs='4'>
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
                <Col xs='4'>
                    <FormGroup>
                        <Label className='form-label' for='relation'>
                            Relationship
                        </Label>
                        <Select
                            name={'relation'}
                            id={`relation${props.id}`}
                            className={classnames({ 'is-invalid': errors[`relation`] })}
                        />
                    </FormGroup>
                </Col>
                <Col xs='4'>
                    <FormGroup>
                        <Label className='form-label' for='contact'>
                            Contact
                        </Label>
                        <Input
                            placeholder='+91 98979098970'
                            name={'contact'}
                            id={`contact${props.id}`}
                            className={classnames({ 'is-invalid': errors[`contact`] })}
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
export default NewEmergencyContact