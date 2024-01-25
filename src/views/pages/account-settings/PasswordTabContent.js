import InputPasswordToggle from "@components/input-password-toggle";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleLogout } from "@store/actions/auth";
import classnames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import * as yup from "yup";
import { apiConfig } from "../../../@core/api/serviceConfig";
import { OTPSelector } from "../../apps/OTPSelector";
import { toast, Slide } from "react-toastify";

const PasswordTabContent = () => {
  const SignupSchema = yup.object().shape({
    searchvalue: yup.string().required(),
    OTP: yup.string().required(),
    password: yup.string().required(),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], "Passwords must match"),
  });

  // const crypto = require('../../../@core/api/AES');
  // const algoKey = process.env.REACT_APP_ALGO_KEY;
  // const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const { register, errors, handleSubmit, trigger, getValues } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    trigger();

    // const encKey = crypto.CryptoJS.enc.Base64.parse(publicKey);
    // const encIV = crypto.CryptoJS.enc.Base64.parse(algoKey);
    // const pwdUtf8 = crypto.CryptoJS.enc.Utf8.parse(data.password);
    // const encPassword = crypto.CryptoJS.AES.encrypt(pwdUtf8.toString(), encKey, { mode: crypto.CryptoJS.mode.CBC, padding: crypto.CryptoJS.pad.Pkcs7, iv: encIV }).ciphertext.toString(crypto.CryptoJS.enc.Base64);
    // const cnfpwdUtf8 = crypto.CryptoJS.enc.Utf8.parse(data.confirmpassword);
    // const cnfencPassword = crypto.CryptoJS.AES.encrypt(cnfpwdUtf8.toString(), encKey, { mode: crypto.CryptoJS.mode.CBC, padding: crypto.CryptoJS.pad.Pkcs7, iv: encIV }).ciphertext.toString(crypto.CryptoJS.enc.Base64);

    trackPromise(
      apiConfig
        .post("/changeCorporatePassword", data, undefined, undefined, {
          ignoreDefaults: true,
        })
        .then(() => {
          toast.success(
            <span>
              Your Password has been successfully changed. Login using new
              password
            </span>,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
          dispatch(handleLogout());
        })
        .catch(() => {
          toast.error(<span>Unable to change password</span>, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000,
          });
        })
    );
  };
  const generateOTP = (value) => {
    if (!getValues().searchvalue) {
      toast.error(<span>Please enter username</span>, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }
    trackPromise(
      apiConfig
        .post(
          "/forwardCorporatePassword",
          {
            searchvalue: getValues().searchvalue,
          },
          undefined,
          undefined,
          { ignoreDefaults: true }
        )
        .then((res) => {
          toast.success(
            <span>{(res && res.message) || "OTP is generated"}</span>,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        })
        .catch((err) => {
          toast.error(
            <span>{(err && err.message) || "Unable to generate OTP"}</span>,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        })
    );
  };

  const [step, setStep] = useState(1);

  const submitOTP = () => {
    trigger();
    const values = getValues();
    if (values.OTP && values.searchvalue) {
      setStep(2);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className={step === 2 ? "hidden" : ""}>
        <Col sm="6">
          <FormGroup>
            <Label>Username</Label>
            <Input
              htmlFor="searchvalue"
              name="searchvalue"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["searchvalue"],
              })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className={step === 1 ? "hidden" : ""}>
        <Col sm="6">
          <FormGroup>
            <InputPasswordToggle
              label="New Password"
              htmlFor="password"
              name="password"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["password"],
              })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className={step === 1 ? "hidden" : ""}>
        <Col sm="6">
          <FormGroup>
            <InputPasswordToggle
              label="Confirm Password"
              htmlFor="confirmpassword"
              name="confirmpassword"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["confirmpassword"],
              })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className={step === 2 ? "hidden" : ""}>
        <Col sm="6">
          <FormGroup>
            <Label className="mb-0">OTP</Label>
            <Input
              label="OTP"
              htmlFor="OTP"
              name="OTP"
              innerRef={register({ required: true })}
              className={classnames("input-group-merge", {
                "is-invalid": errors["OTP"],
              })}
            />
          </FormGroup>
        </Col>
        <Col sm="2" className="mt-2">
          <Button color="primary" onClick={generateOTP}>
            Generate OTP
          </Button>
        </Col>
      </Row>
      <Row className={step === 2 ? "hidden" : ""}>
        <Col className="mt-1" sm="12">
          <Button.Ripple
            type="button"
            onClick={submitOTP}
            className="mr-1"
            color="primary"
          >
            Submit
          </Button.Ripple>
        </Col>
      </Row>

      <Row className={step === 1 ? "hidden" : ""}>
        <Col className="mt-1" sm="12">
          <Button.Ripple
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="mr-1"
            color="primary"
          >
            Update Password
          </Button.Ripple>
          <Button.Ripple color="secondary" onClick={() => setStep(1)} outline>
            Back
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  );
};

export default PasswordTabContent;
