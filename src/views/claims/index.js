import dashboard from "@src/assets/images/icons/dashboard.png";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import ActiveAdmission from "./activeAdmission";
import Analysis from "./analysis";
import PastClaims from "./pastClaims";

const Claims = () => {
  const [active, setActive] = useState("activeAdmission");
  const { colors } = useContext(ThemeColors);
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div>
      <Row>
        <div
          className="font-weight-bold px-1 py-50 mb-1"
          style={{ borderRight: "2px solid lightgrey" }}
        >
          Claims
        </div>
        <Breadcrumb className="pl-0 pb-1">
          <BreadcrumbItem tag="li">
            <Link to="/">
              <img src={dashboard} width="20" height="20" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag="li">Claims</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={active === "activeAdmission"}
              onClick={() => {
                toggle("activeAdmission");
              }}
            >
              Active Admission
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "pastClaims"}
              onClick={() => {
                toggle("pastClaims");
              }}
            >
              Past Claims
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "analysis"}
              onClick={() => {
                toggle("analysis");
              }}
            >
              Analysis
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="py-50" activeTab={active}>
          <TabPane tabId="activeAdmission">
            <ActiveAdmission />
          </TabPane>
          <TabPane tabId="pastClaims">
            <PastClaims
              primary={colors.primary.main}
              warning={colors.warning.main}
              danger={colors.danger.main}
              success={colors.success.main}
            ></PastClaims>
          </TabPane>
          <TabPane tabId="analysis">
            <Analysis></Analysis>
          </TabPane>
        </TabContent>
      </Fragment>
    </div>
  );
};

export default Claims;
