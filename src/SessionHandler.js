import logo from "@src/assets/images/icons/loader.gif";
import { handleLogout } from "@store/actions/auth";
import axios from "axios";
import "lodash";
import { Fragment } from "preact";
import { useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";
import { Modal } from "reactstrap";
import ModalBody from "reactstrap/lib/ModalBody";
7;

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-body">
      <span>Session has expired, please login again.</span>
    </div>
  </Fragment>
);

export const SessionHandler = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  axios.interceptors.request.use((req) => {
    setError(false);
    return req;
  });
  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (a) => {
      const msg = _.get(a, "response.data.message", "");
      if (msg.indexOf("Invalid") >= 0 && msg.indexOf("token") >= 0) {
        setError(true);
        dispatch(handleLogout());
        if (!error) {
          toast.error(<ToastContent />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      }
      return Promise.reject(a.response.data);
    }
  );
  return (
    <div style={{ fontSize: "50px" }}>
      <Modal className="modal-dialog-centered" isOpen={!!promiseInProgress}>
        <ModalBody className="p-0">
          <div className="fallback-spinner">
            <img className="fallback-logo" src={logo} width="75" alt="logo" />
            <div className="loading"></div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
