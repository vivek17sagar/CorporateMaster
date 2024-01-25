import { Fragment } from 'react'
import { ArrowLeft } from 'react-feather'
import { Controller, useForm } from "react-hook-form"
import { Button, CardBody, CardSubtitle, CardTitle, Col, CustomInput, Form, FormGroup, Label, Row } from "reactstrap"

const PaidEndorsement3 = (props) => {
    const { register, errors, getValues, control, handleSubmit } = useForm()

    const onSubmit = () => {
        // trigger()
        // console.log(errors)
        // console.log(getValues())
        // if (isObjEmpty(errors)) {
        props.close()
        // }
    }

    return (
        <Fragment>
            <CardBody>
                <CardTitle tag='h4' className='mb-75'>
                    Upload Documents
                </CardTitle>
                <CardSubtitle className='text-muted'>
                    Upload your Paid Endorsement Documents
                </CardSubtitle>
            </CardBody>
            <CardBody>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <FormGroup tag={Col} md='6'>
                            <Controller
                                name='document1'
                                control={control}
                                render={props => {
                                    return (
                                        <Fragment>
                                            <Label className='form-label' for={`document1`}>
                                                Document 1
                                            </Label>
                                            <CustomInput type='file' id='document1' name={props.name} />
                                        </Fragment>
                                    )
                                }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Controller
                                name='document2'
                                control={control}
                                render={props => {
                                    return (
                                        <Fragment>
                                            <Label className='form-label' for={`document2`}>
                                                Document 2
                                            </Label>
                                            <CustomInput type='file' id='document2' name={props.name} />
                                        </Fragment>
                                    )
                                }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Controller
                                name='document3'
                                control={control}
                                render={props => {
                                    return (
                                        <Fragment>
                                            <Label className='form-label' for={`document3`}>
                                                Document 3
                                            </Label>
                                            <CustomInput type='file' id='document3' name={props.name} />
                                        </Fragment>
                                    )
                                }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} md='6'>
                            <Controller
                                name='document4'
                                control={control}
                                render={props => {
                                    return (
                                        <Fragment>
                                            <Label className='form-label' for={`document4`}>
                                                Document 4
                                            </Label>
                                            <CustomInput type='file' id='document4' name={props.name} />
                                        </Fragment>
                                    )
                                }}
                            />
                        </FormGroup>
                    </Row>
                    <div className='d-flex justify-content-between'>
                        <Button.Ripple onClick={() => props.stepper.previous()} color='primary' className='btn-next'>
                            <ArrowLeft className='mr-1' />
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button.Ripple>
                        <Button.Ripple type='submit' color='primary' className='btn-next'>
                            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                        </Button.Ripple>
                    </div>
                </Form>
            </CardBody>
        </Fragment>
    )
}
export default PaidEndorsement3