import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import dashboard from "@src/assets/images/icons/dashboard.png";
import femaleIcon from "@src/assets/images/icons/female.png";
import maleIcon from "@src/assets/images/icons/male.png";
import users from "@src/assets/images/icons/users.png";
import { selectThemeColors } from "@utils";
import { useEffect, useState } from "react";
import { DownloadCloud } from "react-feather";
import { Link, useHistory } from "react-router-dom";
// ** Third Party Components
import Select from "react-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import Table from "../apps/user/list/Table";
import { trackPromise } from "react-promise-tracker";
import { handleFilterTabs } from "../../redux/actions/handleFilter";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const Employees = (props) => {
  const dispatch = useDispatch();
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [smartCardCount, setSmartCardCount] = useState(0);

  const [plansList, setPlansList] = useState([]);
  const [schemesList, setSchemesList] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({ value: "" });
  const [currentScheme, setCurrentScheme] = useState({ value: "" });

  const [empName, setEmpName] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [empCode, setEmpCode] = useState("");
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    trackPromise(
      apiConfig.post("/corporateemployeegendercount").then((data) => {
        setMaleCount(data.employeeGenderMaleCount);
        setFemaleCount(data.employeeGenderFemaleCount);
        setTotalEmployees(
          data.employeeGenderMaleCount + data.employeeGenderFemaleCount
        );
      })
    );
    trackPromise(
      apiConfig.post("/corporatesmartcatdholdercount").then((data) => {
        setSmartCardCount(data.smartCardCount);
      })
    );

    trackPromise(
      apiConfig.post("/plans").then((data) => {
        setPlansList(
          [{ label: "Select Plan", value: "" }].concat(
            data.map((e) => {
              e.label = e.planName;
              e.value = e.planId;
              return e;
            })
          )
        );
        setCurrentPlan({ label: "Select Plan", value: "" });
      })
    );
    return () => {
      setMaleCount(0);
      setFemaleCount(0);
      setTotalEmployees(0);
      setSmartCardCount(0);
      setPlansList([]);
      setCurrentPlan({ value: "" });
    };
  }, []);
  useEffect(() => {
    if (currentPlan?.value) {
      trackPromise(
        apiConfig
          .post("/schemes", {
            planID: currentPlan?.value,
          })
          .then((data) => {
            setSchemesList(
              [{ value: "", label: "Select Scheme" }].concat(
                data.map((e) => {
                  return {
                    label: e.schemeName,
                    value: e.schemeId,
                  };
                })
              )
            );
          })
          .catch(() => {
            setSchemesList([]);
          })
      );
    } else {
      setSchemesList([]);
    }
  }, [currentPlan?.value]);

  // useEffect(() => {
  //   setPageNo(1);
  // }, [empName, empCode]);

  useEffect(() => {
    trackPromise(
      apiConfig
        .post(
          "/corporateemployees",
          {
            pageNo: pageNo,
            pageSize: perPage,
            planID: currentPlan?.value,
            employeeCode: empCode,
            employeeName: empName,
            schemeID:
              currentPlan?.label !== "Select Plan" ? currentScheme?.value : "",
          },
          undefined,
          undefined,
          { returnFull: true }
        )
        .then((data) => {
          // console.log('--employees', data);

          setData(data?.result);
          setTotalCount(data?.totalPages);
        })
        .catch(() => {
          setTotalCount(0);
          setData([]);
        })
    );
  }, [
    currentPlan?.value,
    currentScheme?.value,
    empName,
    empCode,
    pageNo,
    perPage,
  ]);

  const history = useHistory();

  const newEmployee = (e) => {
    history.push("/employees/new");
  };

  const handlePagination = (data) => {
    if(data.perPage){
    setPerPage(data?.perPage);
    setPageNo(0)
  }
    if(data.selected != undefined){
    setPageNo(data?.selected);
  }
  };

  const updateRowData = (rowPerPage) => {
    setPerPage(1);
    setPageNo(rowPerPage);
  };

  return (
    <div>
      <Row>
        <div
          className="font-weight-bold px-1 py-50 mb-1"
          style={{ borderRight: "2px solid lightgrey" }}
        >
          Employees
        </div>

        <Breadcrumb className="pl-0 pb-1">
          <BreadcrumbItem tag="li">
            <Link to="/">
              <img src={dashboard} width="20" height="20" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag="li">Employees</BreadcrumbItem>
        </Breadcrumb>
      </Row>
      <Row>
        {/* Stats With Icons Horizontal */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<img src={users} height="20" width="35" />}
            color="primary"
            stats={totalEmployees.toString()}
            statTitle="Employees"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<img src={maleIcon} height="25" width="12" />}
            color="success"
            stats={maleCount.toString()}
            statTitle="Male"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<img src={femaleIcon} height="25" width="15" />}
            color="danger"
            stats={femaleCount.toString()}
            statTitle="Female"
          />
        </Col>
        <Col
          lg="3"
          sm="6"
          tag={Link}
          to="/dashboard/ecards"
          className="cursor-pointer"
        >
          <StatsHorizontal
            icon={<DownloadCloud size={21} />}
            color="success"
            stats={smartCardCount.toString()}
            statTitle="Smart Card Issued"
          />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>
      <Row>
        <Col xs="12">
          <div className="app-user-list">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Search Filter</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <Label>Employee Name</Label>
                      <Input
                        name="name"
                        value={empName}
                        onChange={(e) => {
                          setEmpName(e.target.value);
                          setPageNo(1);
                          dispatch(handleFilterTabs(true));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Employee Code</Label>
                      <Input
                        name="name"
                        value={empCode}
                        onChange={(e) => {
                          setEmpCode(e.target.value);
                          setPageNo(1);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="my-md-0 my-1" md="3">
                    <FormGroup>
                      <Label>Select Plan</Label>
                      <Select
                        theme={selectThemeColors}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={plansList}
                        value={currentPlan}
                        onChange={(data) => {
                          if (data?.label === "Select Plan") {
                            setCurrentScheme({ value: "" });
                          }
                          setCurrentPlan(data);
                          setPageNo(1);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Select Category</Label>
                      <Select
                        theme={selectThemeColors}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={schemesList}
                        value={currentScheme}
                        onChange={(data) => {
                          setCurrentScheme(data);
                          setPageNo(1);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Table
              showFilter={false}
              pageNo={pageNo}
              data={data}
              totalCount={totalCount}
              addHandler={newEmployee}
              handlePagination={handlePagination}
              updateRowData={updateRowData}
            />
            <ReactPaginate
              breakLabel="..."
              nextLabel=" "
              activeClassName="active"
              onPageChange={handlePagination}
              // pageRangeDisplayed={1}
              pageCount={totalCount}
              // pageCount={pageCount}
              previousLabel=" "
              renderOnZeroPageCount={null}
              // onPageActive={currentPage}

              // previousLabel={""}
              // nextLabel={"next"}
              // pageRangeDisplayed={5}
              // pageCount={2}
              // activeClassName="active"
              // onPageChange={handlepage2} // Call the handlePageChange function when page changes
              // renderOnZeroPageCount={null}
              pageClassName={"page-item"}
              nextLinkClassName={"page-link"}
              nextClassName={"page-item next"}
              previousClassName={"page-item prev"}
              previousLinkClassName={"page-link"}
              pageLinkClassName={"page-link"}
              containerClassName={
                "pagination react-paginate justify-content-end my-2 pr-1"
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Employees;
