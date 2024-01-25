import InputPasswordToggle from '@components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSkin } from '@hooks/useSkin';
import eo2Logo from '@src/assets/images/icons/logo.png';
import { handleLogout } from '@store/actions/auth';
import '@styles/base/pages/page-auth.scss';
import { isUserLoggedIn } from '@utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { trackPromise } from 'react-promise-tracker';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { Button, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import * as yup from 'yup';
import { apiConfig } from '../../../@core/api/serviceConfig';
import { OTPSelector } from '../../apps/OTPSelector';


const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const [step, setStep] = useState(1);
  const SignupSchema = yup.object().shape({
    'searchvalue': yup.string().required(),
    'OTP': yup.string().required(),
    'password': yup.string().required(),
    'confirmpassword': yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], 'Passwords must match')
  })

  const { register, errors, handleSubmit, trigger, getValues, clearErrors , reset} = useForm({
    resolver: yupResolver(SignupSchema)
  })
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    trigger();

    trackPromise(apiConfig.post('/changeCorporatePassword', data, undefined, undefined, { ignoreDefaults: true }).then(() => {
      toast.success(
        <span>Your Password has been successfully changed. Login using new password</span>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      dispatch(handleLogout())
    }).catch((err) => {

      toast.error(
        <span>{err && err.message || 'Unable to change password'}</span>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }));
  }
  const generateOTP = (value) => {
    if (!getValues().searchvalue) {
      toast.error(
        <span>Please enter username</span>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      return;
    }
    trackPromise(apiConfig.post('/forwardCorporatePassword', {
      searchvalue: getValues().searchvalue
    }, undefined, undefined, { ignoreDefaults: true }).then((res) => {
      toast.success(
        <span>{(res && res.message) || 'OTP is generated'}</span>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }).catch((err) => {
      toast.error(
        <span>{(err && err.message) || 'Unable to generate OTP'}</span>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }));
  }
  const submitOTP = () => {
    trigger();
    const values = getValues();
    if (values.OTP && values.searchvalue) {
      setStep(2)
      // reset({'password': '','confirmpassword':''})
      clearErrors();
    }

  }
  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/'>
            <img src={eo2Logo} />
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login V2' />
            </div>
          </Col>
          <Col className='align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                Forgot Password? 🔒
              </CardTitle>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* {step === 1 && <> */}
                  <Row className={step === 2 ? 'hidden' : ''}>
                    <Col sm=''>
                      <FormGroup>
                        <Label>Username</Label>
                        <Input
                          type='text'
                          htmlFor='searchvalue'
                          name='searchvalue'
                          innerRef={register({ required: true })}
                          className={classnames('input-group-merge', {
                            'is-invalid': errors['searchvalue']
                          })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className={step === 2 ? 'hidden' : ''}>
                    <Col sm=''>
                      <FormGroup>
                        <Label className='mb-0'>OTP</Label>
                        <Input
                          label='OTP'
                          htmlFor='OTP'
                          name='OTP'
                          innerRef={register({ required: true })}
                          className={classnames('input-group-merge', {
                            'is-invalid': errors['OTP']
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <div className='mr-1 mt-2'>
                      <Button color='primary' onClick={generateOTP}>Generate OTP</Button>
                    </div>
                  </Row>
                  <Row className={step === 2 ? 'hidden' : ''}>
                    <Col className='mt-1' sm='12'>
                      <Button.Ripple type='button' onClick={submitOTP} className='mr-1' color='primary'>
                        Submit
                      </Button.Ripple>
                      <Button.Ripple color='secondary' outline>
                        <Link to='/login'>
                          Cancel
                        </Link>
                      </Button.Ripple>
                    </Col>
                  </Row>
                {/* </>}
                {step === 2 && <> */}
                  <Row className={step === 1 ? 'hidden' : ''}>
                    <Col sm=''>
                      <FormGroup>
                        <Label>Password</Label>
                        <Input
                          label='New Password'
                          type='password'
                          htmlFor='password'
                          name='password'
                          innerRef={register({ required: true })}
                          className={classnames('input-group-merge', {
                            'is-invalid': errors['password']
                          })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className={step === 1 ? 'hidden' : ''}>
                    <Col sm=''>
                      <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input
                          type='password'
                          label='Confirm Password'
                          htmlFor='confirmpassword'
                          name='confirmpassword'
                          innerRef={register({ required: true })}
                          className={classnames('input-group-merge', {
                            'is-invalid': errors['confirmpassword']
                          })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className={step === 1 ? 'hidden' : ''}>
                    <Col className='mt-1' sm='12'>
                      <Button.Ripple type='submit' onClick={handleSubmit(onSubmit)} className='mr-1' color='primary'>
                        Reset Password
                      </Button.Ripple>
                      <Button.Ripple color='secondary' onClick={() => setStep(1)} outline>
                        {/* <Link to='/login'> */}
                          Back
                        {/* </Link> */}
                      </Button.Ripple>
                    </Col>
                  </Row>
                {/* </>} */}
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
