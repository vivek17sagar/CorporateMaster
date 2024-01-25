import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleFilter,
  handleFilterTabs,
} from "../../redux/actions/handleFilter";

const FilterPanel = (props) => {
  const dispatch = useDispatch();
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" },
  ];

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  const [policyNo, setPolicyNo] = useState("");
  const [memberName, setMemberName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [memberShipNo, setMemberShipNo] = useState("");

  useEffect(() => {
    props.onFilterChange &&
      props.onFilterChange({
        policyNo,
        memberName,
        employeeCode,
        memberShipNo,
      });

    dispatch(handleFilterTabs(true));
  }, [policyNo, memberName, employeeCode, memberShipNo]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>Policy No</Label>
              <Input
                onChange={(event) => {
                  setPolicyNo(event.target.value);
                  // filterChanged()
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="3">
              <Label>Member Name</Label>
              <Input
                value={memberName}
                onChange={(event) => {
                  setMemberName(event.target.value);
                  // setTimeout(() => {filterChanged()},0);
                }}
              />
            </Col>
            <Col md="3">
              <Label>Employee Code</Label>
              <Input
                onChange={(event) => {
                  setEmployeeCode(event.target.value);
                  // filterChanged()
                }}
              />
            </Col>
            {/* </Row>
          <Row className='mt-2'> */}

            <Col md="3">
              <Label>Membership Number</Label>
              <Input
                onChange={(event) => {
                  setMemberShipNo(event.target.value);
                  // filterChanged()
                }}
              />
            </Col>

            {/* <Col className='my-md-0 my-1' md='4'>
              <Label>Location</Label>
              <Select
                // theme={selectThemeColors}
                // isClearable={false}
                className='react-select'
                classNamePrefix='select'
              // options={planOptions}
              // value={currentPlan}
              // onChange={data => {
              //   setCurrentPlan(data)
              //   dispatch(
              //     getData({
              //       page: currentPage,
              //       perPage: rowsPerPage,
              //       role: currentRole.value,
              //       currentPlan: data.value,
              //       status: currentStatus.value,
              //       q: searchTerm
              //     })
              //   )
              // }}
              />
            </Col> */}
            {/* <Col md='4'>
              <Label>Status</Label>
              <Select
                // theme={selectThemeColors}
                // isClearable={false}
                className='react-select'
                classNamePrefix='select'
              // options={statusOptions}
              // value={currentStatus}
              // onChange={data => {
              //   setCurrentStatus(data)
              //   dispatch(
              //     getData({
              //       page: currentPage,
              //       perPage: rowsPerPage,
              //       role: currentRole.value,
              //       currentPlan: currentPlan.value,
              //       status: data.value,
              //       q: searchTerm
              //     })
              //   )
              // }}
              />
            </Col> */}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default FilterPanel;
