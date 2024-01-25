import { useState } from "react"
import Select from "react-select"
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

const RequestPolicy = (props) => {
    const [coverType, setCoverType] = useState('health')
    return (
        <div>
            <Modal isOpen={true} className='modal-lg modal-dialog-centered'>
                <ModalHeader toggle={() => props.toggleModal()}>
                    Request New Policy
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs='12'>
                            <Row>

                                <Col xs='6'>
                                    <Label className='font-weight-bold font-medium-4'>
                                        Policy
                                    </Label>
                                </Col>
                                <Col xs='6'>
                                    <Input />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='pt-sm-1'>
                            <Label className='col-12 p-0 font-weight-bold font-medium-4' >
                                Health Cover
                            </Label>
                            <Input type='radio' name='type' value='health' checked={coverType === 'health'} onChange={() => setCoverType('health')} />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                OPD
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Cashless
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Home Service
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Medicine Claim
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12' className='pt-sm-1'>
                            <Label className='col-12 p-0 font-weight-bold font-medium-4'>
                                Life Cover
                            </Label>
                            <Input type='radio' name='type' value='life' checked={coverType === 'life'} onChange={() => setCoverType('life')} />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Accident
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Lorem Ipsum
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Lorem Ipsum
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Lorem Ipsum
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Row>
                                <Col xs='6'>
                                    <Label className='font-weight-bold font-medium-4'>
                                        Approximate Members
                                    </Label>
                                </Col>
                                <Col xs='6'>
                                    <Input />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs='12' className='mt-1'>
                            <Row>
                                <Col xs='6'>
                                    <Label className='font-weight-bold font-medium-4'>
                                        Additional Family Members
                                    </Label>
                                </Col>
                                <Col xs='6'>
                                    <Row>
                                        <Col xs='6'>
                                            <Select className='react-select' classNamePrefix='select'placeholder='Adult' />
                                        </Col>
                                        <Col xs='6'>
                                            <Select className='react-select' classNamePrefix='select'placeholder='Children' />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                </ModalBody>
                <ModalFooter className='d-flex justify-content-start'>
                    <Button color='primary'>Cancel</Button>
                    <Button className='ml-1' onClick={() => props.toggleModal()} color='primary'>Request</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default RequestPolicy


// Request New Policy
// Policy
// Health Cover
// opo
// Cashless
// Home Service
// Medicine claim
// Life Cover
// Accident
// Lorem ipsum
// Lorem ipsum
// Lorem ipsum
// 
// O
// Adults
// v
// Childrens
// Cancel
// Download