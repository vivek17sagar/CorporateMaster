import logo from "@src/assets/images/icons/loader.gif";
// ** React Imports
// ** Styles
import "@styles/react/apps/app-users.scss";
import { Fragment, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// ** Reactstrap
import { Col, Row } from "reactstrap";
import { apiConfig } from "../../../../@core/api/serviceConfig";
import EmergencyContact from "./EmergencyContact";
import FamilyDetails from "./FamilyDetails";
import PersonalInformation from "./PersonalInformation";
import PlanCard from "./PlanCard";
import UserInfoCard from "./UserInfoCard";

const UserView = (props) => {
  // ** Vars
  const store = useSelector((state) => state.users),
    dispatch = useDispatch(),
    { id } = useParams();

  const [user, setUser] = useState();
  const [familyDetails, setFamilyDetails] = useState([]);
  // ** Get suer on mount
  useEffect(() => {
    // dispatch(getUser(parseInt(id)))
    trackPromise(
      apiConfig
        .post("/corporateemployeeprofile", { memberPolicyID: id })
        .then((data) => {
          setUser(data);
        })
        .catch(() => setUser(undefined))
    );
    trackPromise(
      apiConfig
        .post("/corporateemployeefamily", { memberPolicyID: id })
        .then((data) => {
          setFamilyDetails(data);
        })
        .catch(() => setFamilyDetails(undefined))
    );
  }, []);

  return user ? (
    <div className="app-user-view">
      <Row>
        <Col xl="9" lg="8" md="7">
          <UserInfoCard user={user} />
        </Col>
        <Col xl="3" lg="4" md="5">
          <PlanCard user={user} />
        </Col>
      </Row>
      <Row>
        {/* <Col md="4">
          <UserTimeline />
          <PersonalInformation user={user} />
        </Col> */}

        <Col md="12">
          {/* <EmergencyContact user={store.selectedUser} /> */}
          {/* <PermissionsTable /> */}
          <FamilyDetails data={familyDetails} />
        </Col>
      </Row>
      <Row>
        <Col sm="12">{/* <InvoiceList /> */}</Col>
      </Row>
    </div>
  ) : (
    <Fragment></Fragment>
  );
};
export default UserView;
