import classnames from 'classnames'
import { isObjEmpty } from '@utils'
import { Controller, useForm } from "react-hook-form"
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Fragment } from 'react'

const UnpaidEndorsement2 = (props) => {
    const { register, errors, handleSubmit, control } = useForm()

    const onSubmit = () => {
        // trigger()
        // console.log(errors)
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
                Upload your unpaid endorsement documents
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
                        <ArrowLeft className='mr-1'/>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button.Ripple>
                    <Button.Ripple type='submit' color='primary' className='btn-next ml-1'>
                        <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                    </Button.Ripple>
                </div>
            </Form>
            </CardBody>
        </Fragment>
    //     <div>
    //         <div className='font-medium-3 font-wight-bold'>Upload Documents</div>
    //         <div className='pb-1'>Upload your unpaid endorsement documents</div>

    //         <Form onSubmit={handleSubmit(onSubmit)}>
    //             <Row>
    //                 <FormGroup tag={Col} md='6'>
    //                     <Controller
    //                         name='document1'
    //                         control={control}
    //                         render={props => {
    //                             return (
    //                                 <Fragment>
    //                                     <Label className='form-label' for={`document1`}>
    //                                         Document 1
    //                                     </Label>
    //                                     <CustomInput type='file' id='document1' name={props.name} />
    //                                 </Fragment>
    //                             )
    //                         }}
    //                     />
    //                 </FormGroup>
    //                 <FormGroup tag={Col} md='6'>
    //                     <Controller
    //                         name='document2'
    //                         control={control}
    //                         render={props => {
    //                             return (
    //                                 <Fragment>
    //                                     <Label className='form-label' for={`document2`}>
    //                                         Document 2
    //                                     </Label>
    //                                     <CustomInput type='file' id='document2' name={props.name} />
    //                                 </Fragment>
    //                             )
    //                         }}
    //                     />
    //                 </FormGroup>
    //                 <FormGroup tag={Col} md='6'>
    //                     <Controller
    //                         name='document3'
    //                         control={control}
    //                         render={props => {
    //                             return (
    //                                 <Fragment>
    //                                     <Label className='form-label' for={`document3`}>
    //                                         Document 3
    //                                     </Label>
    //                                     <CustomInput type='file' id='document3' name={props.name} />
    //                                 </Fragment>
    //                             )
    //                         }}
    //                     />
    //                 </FormGroup>
    //                 <FormGroup tag={Col} md='6'>
    //                     <Controller
    //                         name='document4'
    //                         control={control}
    //                         render={props => {
    //                             return (
    //                                 <Fragment>
    //                                     <Label className='form-label' for={`document4`}>
    //                                         Document 4
    //                                     </Label>
    //                                     <CustomInput type='file' id='document4' name={props.name} />
    //                                 </Fragment>
    //                             )
    //                         }}
    //                     />
    //                 </FormGroup>
    //             </Row>
    //             <div className='d-flex justify-content-end'>
    //                 <Button.Ripple type='submit' color='primary' className='btn-next'>
    //                     <span className='align-middle d-sm-inline-block d-none'>Submit</span>
    //                     <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
    //                 </Button.Ripple>
    //             </div>
    //         </Form>
    //     </div>
    )
}
export default UnpaidEndorsement2