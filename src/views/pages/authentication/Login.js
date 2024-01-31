import google from "@src/assets/images/icons/google.png";
import eo2Logo from "@src/assets/images/icons/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useContext, Fragment } from "react";
import classnames from "classnames";
import Avatar from "@components/avatar";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Slide } from "react-toastify";
import { handleLogin } from "@store/actions/auth";
import { AbilityContext } from "@src/utility/context/Can";
import { apiConfig } from "../../../@core/api/serviceConfig";
import { OTPSelector } from "../../apps/OTPSelector";
import { Link, useHistory } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser, isObjEmpty } from "@utils";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";
import _ from "lodash";
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
// import '@src/core/api/AES';
import "@styles/base/pages/page-auth.scss";
import { OTPInput } from "../../apps/OTPInput";
import { trackPromise } from "react-promise-tracker";

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to eOxegen. Now you
        can start to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const Login = (props) => {
  const algoKey = process.env.REACT_APP_ALGO_KEY;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const requiredOTP = process.env.REACT_APP_REQUEST_OTP;
  const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
  const [skin, setSkin] = useSkin();
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [captchaConfirmed, setCaptchaConfirmed] = useState(false);
  const [error, setError] = useState();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const crypto = require("../../../@core/api/AES");
  const { register, errors, handleSubmit } = useForm();

  const setUserCache = (res) => {
    dispatch(handleLogin(res));

    const data = res;
    // ability.update(res.data.userData.ability)
    history.push(getHomeRouteForLoggedInUser(data.role));
    toast.success(
      <ToastContent
        name={data.corporateName || "User"}
        role={data.role || "admin"}
      />,
      { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    );
  };

  const onOTPInput = (otp) => {
    setShowOTPInput(false);
    trackPromise(
      apiConfig
        .post(
          "/validatecorporateloginotp",
          {
            searchvalue: email,
            OTP: otp,
          },
          undefined,
          undefined,
          { ignoreDefaults: true }
        )
        .then((data) => {
          setUserCache(data);
        })
        .catch((err) => {
          setError(
            _.get(err, "response.data.message") || "Wrong username or password!"
          );
        })
    );
  };

  const login = () => {
    if (isObjEmpty(errors)) {
      const encKey = crypto.CryptoJS.enc.Base64.parse(publicKey);
      const encIV = crypto.CryptoJS.enc.Base64.parse(algoKey);
      const pwdUtf8 = crypto.CryptoJS.enc.Utf8.parse(password);

      const encPassword = crypto.CryptoJS.AES.encrypt(
        pwdUtf8.toString(),
        encKey,
        {
          mode: crypto.CryptoJS.mode.CBC,
          padding: crypto.CryptoJS.pad.Pkcs7,
          iv: encIV,
        }
      ).ciphertext.toString(crypto.CryptoJS.enc.Base64);

      useJwt // .login({ email: encEmail, password: encPwd })
        .login({ email, password: encPassword, requiredOTP })
        .then((res) => {
          if (requiredOTP === "Y") {
            setShowOTPInput(true);
          } else {
            setUserCache(res);
          }
        })
        .catch((err) => {
          setError(
            _.get(err, "response.data.message") || "Wrong username or password!"
          );
        });
    }
  };

  const onCaptchaChange = () => {
    setCaptchaConfirmed(true);
  };
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  const onSubmit = (data) => {
    // if (!captchaConfirmed) {
    //   setError("Please complete the CAPTCHA");
    //   return;
    // }
    login();
  };

  const logoStyle = {
    maxWidth: "127px",
    height: "40px",
  };

  return (
    <div className="auth-wrapper auth-v2">
      {showOTPInput && <OTPInput selectOTP={onOTPInput} />}
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={eo2Logo} style={logoStyle} alt="logo" />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Welcome to eOxegen Corporate Portal
            </CardTitle>
            <CardText className="mb-2">Please sign-in to your account</CardText>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Username
                </Label>

                <Input
                  autoFocus
                  type="text"
                  value={email}
                  id="login-email"
                  name="login-email"
                  placeholder="username"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["login-email"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id="login-password"
                  name="login-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classnames("input-group-merge", {
                    "is-invalid": errors["login-password"],
                  })}
                  innerRef={register({
                    required: true,
                    validate: (value) => value !== "",
                  })}
                />
              </FormGroup>
              <FormGroup>
                {/* <ReCAPTCHA sitekey={captchaKey} onChange={onCaptchaChange} /> */}
              </FormGroup>
              <span className="text-danger">{error}</span>

              <Button.Ripple type="submit" color="primary" block>
                Sign in
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2">
              <span className="mr-25 font-small-1">
                By clicking here, you agree to our
              </span>
              <Link>
                <span className="font-small-5 text-underline">
                  Customer Agreement
                </span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
