import { toast, Slide } from "react-toastify";
7;
import Avatar from "@components/avatar";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import add from "@src/assets/images/icons/add.png";
import dashboard from "@src/assets/images/icons/dashboard.png";
import filter from "@src/assets/images/icons/filter.png";
import heartCare from "@src/assets/images/icons/heart-care.png";
import personInsurance from "@src/assets/images/icons/person-insurance.png";
import plus from "@src/assets/images/icons/plus.png";
import policy from "@src/assets/images/icons/policy.png";
import { createRef, Fragment, useEffect, useRef, useState } from "react";
import { Download } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import Table from "../apps/user/list/Table";
import NewPolicy from "./newPolicy";
import PolicyFilterModal from "./policyFilterModal";
import RequestPolicy from "./RequestPolicy";
import classnames from "classnames";
import { trackPromise } from "react-promise-tracker";

const Policies = () => {
  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary",
      ],
      color = states[stateNum];

    return (
      <Avatar
        color={color || "primary"}
        className="mr-1"
        content={row.planName[0]}
        initials
      />
    );
  };

  const [categoryCount, setCategoryCount] = useState([]);

  const [masterPolicyData, setMasterPolicyData] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const [modal, toggleModal] = useState(false);
  const [requestPolicyModal, setRequestPolicyModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCureentPage] = useState(1);

  const handlePolicyPaginate = (metadata) => {
    setPolicyData([
      ...masterPolicyData?.slice(
        (metadata.page - 1) * metadata.perPage,
        metadata.page * metadata.perPage
      ),
    ]);
  };

  useEffect(() => {
    handlePolicyPaginate({ page: 1, perPage: 10 });
  }, [masterPolicyData]);

  useEffect(() => {
    // corporatecategoryeisemembercount
    trackPromise(
      apiConfig
        .post("/corporatecategoryeisemembercount", {
          pageNo: 0,
          pageSize: 10,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => setCategoryCount(result));
            console.log(data[1]);
          }
        })
    );

    // trackPromise(
    //   apiConfig.post("/corporatepolicycategoriescount").then((data) => {
    //     //console.log(data);
    //   })
    // );

    //  policyDetails
    trackPromise(
      apiConfig
        .post("/policyDetails")
        .then((data) => {
          // console.log('----policies data', data);
          data && setMasterPolicyData(data);
        })
        .catch((e) => {
          // console.log('--policyerror', e);
          toast.error(
            <Fragment>
              <div className="toastify-body" style={{ fontSize: "1.5rem" }}>
                <span>Error while fetching data, try again.</span>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          );
        })
    );
  }, []);

  const history = useHistory();

  const navigateToPayment = () => {
    history.push("/policies/payment");
  };

  const policyColumns = [
    // {
    //     name: 'PLAN CODE',
    //     sortable: true,
    //     selector: 'planCode'
    //     // cell: row => (
    //     //     <div className='d-flex justify-content-left align-items-center'>
    //     //         {/* {renderClient(row)} */}
    //     //         <div className='d-flex flex-column'>
    //     //             <span className='font-weight-bold'>{row.planCode}</span>
    //     //         </div>
    //     //     </div>
    //     // )
    // },
    {
      name: "POLICY CODE",
      sortable: true,
      selector: "policyCode",
      center: true,
    },
    { name: "PLAN NAME", sortable: true, selector: "planName", center: true },
    { name: "MEMBERS ", sortable: true, selector: "members", center: true },
    // { name: 'TYPE', sortable: true, selector: 'type' },
    { name: "INCEPTION DATE", sortable: true, selector: "policyInceptionDate" },
    {
      name: "EXPIRY DATE",
      sortable: true,
      cell: (row) => {
        return (
          <Fragment>
            {row.policyUpto === "EXPIRED" ? (
              <Fragment>
                <Row className="text-center">
                  <Col className="mb-n1">
                    <div style={{ color: "red" }}>Expired</div> <br />
                  </Col>
                  {/* <Col xs='8' onClick={() => navigateToPayment()}>
                                    <div class='cursor-pointer rounded-lg p-sm-50 text-white bg-danger'>
                                        <Link to='/policies/payment'>
                                            Renew
                                        </Link>
                                    </div>
                                </Col> */}
                </Row>
              </Fragment>
            ) : (
              row.policyExpiredDate
            )}
          </Fragment>
        );
      },
    },
    // {
    //     name: 'REPORT',
    //     sortable: true,
    //     cell: (row) => {
    //         return (
    //             <Download />
    //         )
    //     }
    // }
  ];

  const createNewPolicy = (e) => {
    e.preventDefault();
    toggleModal(true);
  };
  const requestNewPolicy = (e) => {
    e.preventDefault();
    setRequestPolicyModal(true);
  };

  return (
    <div>
      <Row className="justify-content-between">
        <div className="d-flex justify-content-start">
          <div
            className="font-weight-bold px-1 py-50 mb-1"
            style={{ borderRight: "2px solid lightgrey" }}
          >
            Policies
          </div>
          <Breadcrumb className="pl-0 pb-1">
            <BreadcrumbItem tag="li">
              <Link to="/">
                <img src={dashboard} width="20" height="20" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem tag="li">Policies</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {categoryCount.length > 0 && (
          <div className="mr-2">
            <span
              className={classnames(
                "cursor-pointer",
                index === 0 && "disabled"
              )}
              onClick={() => setIndex(index - 1)}
              style={{ fontSize: "24px" }}
            >
              <strong>&lt; </strong>
            </span>
            <span
              className={classnames(
                "cursor-pointer pl-1",
                index === categoryCount?.length - 4 && "disabled"
              )}
              onClick={() => setIndex(index + 1)}
              style={{ fontSize: "24px" }}
            >
              <strong>&gt; </strong>
            </span>
          </div>
        )}
      </Row>
      <Row>
        {categoryCount?.slice(index, index + 4)?.map((c, i) => {
          return (
            <Col lg="3" sm="6" key={i}>
              <StatsHorizontal
                icon={<img src={policy} height="25" width="20" />}
                color="primary"
                stats={c.memberCount.toString()}
                statTitle={c.categoryName}
              />
            </Col>
          );
        })}
        {/* Stats With Icons Horizontal */}
        {/* <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={heartCare} height='25' width='25' />} color='success' stats={0} statTitle='Health Cover' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={personInsurance} height='25' width='25' />} color='danger' stats={0} statTitle='Life Cover' />
                </Col> */}
        {/* <Col lg='3' sm='6' onClick={requestNewPolicy}>
                    <StatsHorizontal className='cursor-pointer' icon={<img src={add} height='25' width='25' />} bgColor='bg-primary' stats='Request Policy' statTitle='' />
                </Col> */}
        {/* Stats With Icons Horizontal */}
      </Row>
      <Row>
        <Col xs="12">
          {/* <InvoiceList></InvoiceList> */}
          <Table
            headerComponent={
              // <CardHeader className='pl-3'>
              //     <CardTitle>
              //         <Row>
              //             No. Of Policies
              //             <img className='cursor-pointer' onClick={() => setShowFilterModal(true)} src={filter} height='25' width='25' />
              //             <img className='cursor-pointer' onClick={createNewPolicy} src={plus} height='25' width='25' />
              //         </Row>
              //     </CardTitle>
              // </CardHeader>
              <Fragment />
            }
            handlePagination={handlePolicyPaginate}
            showFilter={false}
            data={policyData}
            totalCount={masterPolicyData?.length}
            columns={policyColumns}
            hideAddButton={true}
          />
        </Col>
      </Row>
      {modal && <NewPolicy toggleModal={toggleModal} />}
      {requestPolicyModal && (
        <RequestPolicy toggleModal={setRequestPolicyModal} />
      )}
      {showFilterModal && (
        <PolicyFilterModal toggleModal={setShowFilterModal} />
      )}
    </div>
  );
};

export default Policies;
