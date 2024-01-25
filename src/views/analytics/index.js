import dashboard from "@src/assets/images/icons/dashboard.png";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { Fragment, useState } from "react";
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
import ClaimAnalysis from "./claimAnalysis";
import Demographics from "./demographics";

const Analytics = () => {
  const [active, setActive] = useState("demographics");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Row>
        <div
          className="font-weight-bold px-1 py-50 mb-1"
          style={{ borderRight: "2px solid lightgrey" }}
        >
          Analytics
        </div>
        <Breadcrumb className="pl-0 pb-1">
          <BreadcrumbItem tag="li">
            <Link to="/">
              <img src={dashboard} width="20" height="20" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag="li">Analytics</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === "demographics"}
            onClick={() => {
              toggle("demographics");
            }}
          >
            Demographics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "claimAnalysis"}
            onClick={() => {
              toggle("claimAnalysis");
            }}
          >
            Claim Analysis
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="demographics">
          <Demographics></Demographics>
        </TabPane>
        <TabPane tabId="claimAnalysis">
          <ClaimAnalysis></ClaimAnalysis>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default Analytics;
