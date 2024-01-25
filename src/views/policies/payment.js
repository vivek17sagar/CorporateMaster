import bhim from '@src/assets/images/icons/bhim.png'
import calendarIcon from '@src/assets/images/icons/calendar.png'
import dashboard from '@src/assets/images/icons/dashboard.png'
import gPay from '@src/assets/images/icons/google.png'
import paypal from '@src/assets/images/icons/paypal.png'
import phonePe from '@src/assets/images/icons/phone-pe.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from 'classnames'
import { Fragment, useState } from "react"
import { CheckCircle } from "react-feather"
import Flatpickr from 'react-flatpickr'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap'

const PolicyPayment = (props) => {
    const [picker, setPicker] = useState(new Date())
    const { register, errors, getValues, handleSubmit } = useForm()
    const [paymentType, setPaymentType] = useState('phonePe')
    const [paymentMode, setPaymentMode] = useState('card')
    return (
        <div>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    Policy Payment
                </div>
                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        <Link to='/policies'>
                            Policies
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        Payment
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Checkout
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs='12' lg='6'>
                            <CardTitle className='mb-25'>
                                PLAN DETAILS
                            </CardTitle>
                            <hr />
                            <Row>
                                <Col xs='6' className='px-2'>
                                    <Label>
                                        Policy Plan
                                    </Label>
                                    <h5>
                                        Family Floater Plan
                                    </h5>

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
                                    <FormGroup>
                                        <Label className='form-label' for='members'>
                                            Members
                                        </Label>
                                        <Select
                                            name={'members'}
                                            id={'members'}
                                            classNamePrefix='select'
                                            className={classnames('react-select', { 'is-invalid': errors[`members`] })}
                                        />
                                    </FormGroup>

                                </Col>
                                <Col xs='6' className='px-2'>
                                    <Label>
                                        Policy Term
                                    </Label>
                                    <h5>
                                        5-62 Year
                                    </h5>
                                    <FormGroup>
                                        <Label className='form-label' for='newExpiryDate'>
                                            New Expiry Date
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
                                    <FormGroup>
                                        <Label>
                                            Amount to be paid
                                        </Label>
                                        <InputGroup className='mt-50 font-weight-bold font-medium-3'>
                                            INR 5,00,000
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <CardBody className='w-100'>
                                    <Col xs='12' className='bg-warning rounded-lg text-white'>

                                        <Row >
                                            <Col xs='12' className='my-50'>
                                                <span >Do you have a promocode ?</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs='9'>
                                                <Input />
                                            </Col>
                                            <Col xs='3'>

                                                <Button color='danger'>Apply</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs='12' className='my-50'>
                                                <CheckCircle size={14} />
                                                <span className='pl-1'>
                                                    Coupon Applied
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Row className='pt-50 pl-1 text-muted'>
                                        <Col xs='12'>
                                            Terms and conditions may apply*
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardBody className='pt-0'>
                                    <h4 className='pl-1'>
                                        PRICE DETAILS
                                    </h4>
                                    <Col xs='12'>
                                        <Row className='pt-1 d-flex justify-content-between'>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                Total Price
                                            </Col>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                <span className='float-right'>
                                                    INR 5,00,000
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className='pt-1 d-flex justify-content-between'>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                Coupon Discount
                                            </Col>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                <span className='float-right text-success'>
                                                    - INR 2,000
                                                </span>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className='d-flex justify-content-between'>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                Total Amount
                                            </Col>
                                            <Col xs='6' className='font-weight-bold font-medium-1'>
                                                <span className='float-right'>
                                                    INR 4,98,000
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </CardBody>
                            </Row>
                        </Col>
                        <Col xs='12' lg='6'>
                            <CardTitle className='mb-25'>
                                PAYMENT
                            </CardTitle>
                            <hr />
                            <Row>
                                <Col xs='12' className='px-2'>
                                    <h4>Wallet Payment</h4>

                                    <Row className='pl-2 mt-1'>
                                        <Col xs='6' lg='3'>
                                            <FormGroup>
                                                <Input type='radio' name='type' value='phonePe' checked={paymentType === 'phonePe'} onChange={() => setPaymentType('phonePe')} />
                                                <Label>
                                                    <span className='pr-25'>
                                                        PhonePe
                                                    </span>
                                                    <img src={phonePe} height='20' width='20' />
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col xs='6' lg='2'>
                                            <FormGroup>
                                                <Input type='radio' name='type' value='gPay' checked={paymentType === 'gPay'} onChange={() => setPaymentType('gPay')} />
                                                <Label>
                                                    <img src={gPay} height='20' width='20' />
                                                    <span className='pl-25'>
                                                        Pay
                                                    </span>
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col xs='6' lg='2'>
                                            <FormGroup>
                                                <Input type='radio' name='type' value='bhim' checked={paymentType === 'bhim'} onChange={() => setPaymentType('bhim')} />
                                                <Label>
                                                    <img src={bhim} height='20' width='20' />
                                                    <span className='pl-25'>
                                                        BHIM
                                                    </span>
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col xs='6' lg='3'>
                                            <FormGroup>
                                                <Input type='radio' name='type' value='paypal' checked={paymentType === 'paypal'} onChange={() => setPaymentType('paypal')} />
                                                <Label>
                                                    <img src={paypal} height='20' width='30' />
                                                    <span className='pl-25'>
                                                        Paypal
                                                    </span>
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col xs='6' lg='2'>
                                            <FormGroup>
                                                <Input type='radio' name='type' value='offline' checked={paymentType === 'offline'} onChange={() => setPaymentType('offline')} />
                                                <Label>
                                                    <span className='pl-25'>
                                                        offline
                                                    </span>
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className='px-2'>
                                        You are choosing a payment through PhonePe UPI
                                    </div>
                                </Col>
                                <CardBody xs='12' className='my-2 mx-2 py-1 rounded-lg bg-primary text-white'>
                                    <Row className='pl-2 text-white'>
                                        <Col xs='5'>
                                            <FormGroup>
                                                <Input type='radio' value='card' name='mode' checked={paymentMode === 'card'} onChange={() => setPaymentMode('card')} />
                                                <Label className='text-white'>Debit Card / Credit Card</Label>
                                            </FormGroup>

                                        </Col>
                                        <Col xs='6'>
                                            <FormGroup>
                                                <Input type='radio' value='offline' name='mode' checked={paymentMode === 'offline'} onChange={() => setPaymentMode('offline')} />
                                                <Label className='text-white'>Offline</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <span>
                                        You are choosing a payment option. Please fill the details of your card.
                                    </span>
                                </CardBody>
                                {paymentMode === 'offline' && <Fragment>
                                    <CardBody>
                                        <h4>
                                            OFFLINE DETAILS
                                        </h4>
                                        <FormGroup>
                                            <Label>Transaction Type</Label>
                                            <Select
                                                className='react-select'
                                                classNamePrefix='select' />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Transaction Number</Label>
                                            <Input />
                                        </FormGroup>
                                        <Row className='pr-0 d-flex justify-content-between'>

                                            <FormGroup className='col-6'>
                                                <Label>Transaction Date</Label>
                                                <Input />
                                            </FormGroup>
                                            <FormGroup className='col-6'>
                                                <Label>Bank Name</Label>
                                                <Select
                                                    className='react-select'
                                                    classNamePrefix='select' />
                                            </FormGroup>
                                        </Row>
                                        <div>
                                            <Button color='primary' className='col-12'>Request</Button>
                                        </div>
                                    </CardBody>
                                </Fragment>
                                }
                                {paymentMode === 'card' && <Fragment>
                                    <CardBody>
                                        <h4>
                                            CARD DETAILS
                                        </h4>
                                        <FormGroup>
                                            <Label>Name on Card</Label>
                                            <Input />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Card Number</Label>
                                            <Input />
                                        </FormGroup>
                                        <Row className='d-flex justify-content-between'>

                                            <FormGroup className='col-6'>
                                                <Label>Valid Through</Label>
                                                <Input />
                                            </FormGroup>
                                            <FormGroup className='col-6'>
                                                <Label>CVV (3 Digit)</Label>
                                                <Select
                                                    className='react-select'
                                                    classNamePrefix='select' />
                                            </FormGroup>
                                        </Row>
                                        <div>
                                            <Button color='primary' className='col-12'>Pay</Button>
                                        </div>
                                    </CardBody>
                                </Fragment>
                                }
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div >
    )
}
export default PolicyPayment