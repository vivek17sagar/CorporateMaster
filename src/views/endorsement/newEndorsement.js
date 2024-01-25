import { useState } from "react"
import Select from "react-select"
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

const NewEndorsement = (props) => {
    const [endorsementType, setEndorsementType] = useState('unpaid')

    const submitForm = () => {

        props.toggle(true, endorsementType)
    }
    return (
        <div>
            <Modal isOpen={true} >
                <ModalHeader toggle={() => props.toggle()}>
                    New Endorsement
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs='12'>
                            <Label>Select Employee Id</Label>
                            <Select
                                className='react-select'
                                classNamePrefix='select' />
                        </Col>
                        <Col xs='12' className='pt-sm-1'>
                            <Label className='col-12 p-0 font-weight-bold font-medium-4' >
                                Unpaid Endorsement
                            </Label>
                            <Input type='radio' name='type' value='unpaid' checked={endorsementType === 'unpaid'} onChange={() => setEndorsementType('unpaid')} />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Name
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Email
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Phone
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Address
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12' className='pt-sm-1'>
                            <Label className='col-12 p-0 font-weight-bold font-medium-4'>
                                Paid Endorsement
                            </Label>
                            <Input type='radio' name='type' value='paid' checked={endorsementType === 'paid'} onChange={() => setEndorsementType('paid')} />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Premium Amount
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Premium Monthwise
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Change in Nominee
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                        <Col xs='12'>
                            <Label className='col-12'>
                                Family Members
                            </Label>
                            <Input type='checkbox' />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter className='d-flex justify-content-start'>
                    <Button onClick={() => props.toggle()} color='primary'>Cancel</Button>
                    <Button onClick={() => submitForm()} color='primary'>Submit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default NewEndorsement