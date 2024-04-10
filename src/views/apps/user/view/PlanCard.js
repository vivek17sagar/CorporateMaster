// ** Reactstrap
import { Fragment, useState } from "react";
import {
  CardSubtitle,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import PolicyDetailsEdit from "./PolicyDetailsEdit";

const PlanCard = ({ user }) => {
  const [openModal, setOpenModal] = useState(undefined);
  return (
    <Fragment>
      <Card className="plan-card border-primary">
        <CardHeader className="pt-75 pb-0">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <CardTitle tag="h4" className="mb-75">
                Current Policy
              </CardTitle>
              <CardSubtitle tag="h5" className="text-muted">
                {user.policyCode}
              </CardSubtitle>
            </div>
            <div>
              {/* <Col className='d-flex justify-content-end'> */}
              <Badge id="plan-expiry-date" color="light-secondary">
                {/* INR 5 Lakh */}
              </Badge>
            </div>
            {/* </Col> */}
          </div>
        </CardHeader>
        <CardBody>
          <ul className="list-unstyled my-1">
            <li>
              {/* <span className='align-middle'>Term 5-62 Years</span> */}
            </li>
            <li className="my-25">
              <span className="align-middle">
                {user.policyStartDate} - {user.policyEndDate}
              </span>
            </li>
            <li>
              <span className="align-middle">
                Family Members - {user.policyMember || "NA"}
              </span>
            </li>
          </ul>
          <div className="d-flex justify-content-between">
            {/* <Button className='text-center' disabled color='primary'  onClick={() => setOpenModal(true)}>
              Upgrade Plan
            </Button>
            <Button className='ml-1 text-center' disabled color='warning'>
              Share Policy
            </Button> */}
          </div>
        </CardBody>
      </Card>
      {openModal && <PolicyDetailsEdit toggle={() => setOpenModal(false)} />}
    </Fragment>
  );
};

export default PlanCard;
