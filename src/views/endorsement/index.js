import classnames from "classnames";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { useRTL } from "@hooks/useRTL";
import accepted from "@src/assets/images/icons/accepted.png";
import dashboard from "@src/assets/images/icons/dashboard.png";
import endorsement from "@src/assets/images/icons/endorsement.png";
import inProcess from "@src/assets/images/icons/in-process.png";
import rejected from "@src/assets/images/icons/rejected.png";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link, useHistory } from "react-router-dom";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Table from "../apps/user/list/Table";
import ApexBarChart from "../charts/apex/ApexBarChart";
import EndorsementAckNumber from "./endorsementAckNumber";
import NewEndorsement from "./newEndorsement";
import PaidEndorsement from "./paidEndorsement";
import UnpaidEndorsement from "./unpaidEndorsement";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";
import { noop } from "lodash";
import { error } from "jquery";

const Endorsement = () => {
  const history = useHistory();
  const [gridData, setGridData] = useState([]);
  const [endorsementMemberType, setEndorsementMemberType] = useState([]);
  const [endorsementMonthCount, setEndorsementMonthCount] = useState([]);
  const [index, setIndex] = useState(0);
  const [newEndorsementType, setNewEndorsementType] = useState(undefined);
  const [showNewEndorsement, setShowNewEndorsement] = useState(false);
  const [showNewUnpaidEndorsement, setShowNewUnpaidEndorsement] =
    useState(false);
  const [showNewPaidEndorsement, setShowNewPaidEndorsement] = useState(false);
  const [showEndorsementAckNumber, setShowEndorsementAckNumber] =
    useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCureentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Table Data
    trackPromise(
      apiConfig
        .post("/corporateendorsmentmemberdetails", {
          pageNo: 0,
          pageSize: pageSize,
        })
        .then((data) => {
          if (data) {
            data[0].then((result) => {
              setGridData(result);
            });
            setTotalPages(data[1]);
          }
        })
    ).catch(noop);

    trackPromise(
      apiConfig.post("/corporateendorsmentmembertypecount").then((data) => {
        data && setEndorsementMemberType(data);
      })
    ).catch(noop);

    trackPromise(
      apiConfig
        .post("/corporateendorsmentmembermonthcount")
        .then((result) => result && setEndorsementMonthCount(result))
        .catch((error) => {
          console.log(error);
        })
    ).catch(noop);
  }, []);

  // Running Table Api when pageNumber get Chnages
  useEffect(() => {
    // Table Data
    trackPromise(
      apiConfig
        .post("/corporateendorsmentmemberdetails", {
          pageNo: currentPage - 1,
          pageSize: pageSize,
        })
        .then((data) => {
          if (data) {
            data[0].then((result) => {
              setGridData(result);
            });
            setTotalPages(data[1]);
          }
        })
    ).catch(noop);
  }, [currentPage, pageSize]);

  const updatePageNumber = (pageNumber) => {
    setCureentPage(pageNumber);
  };

  const updateRowData = (NumberOfRows) => {
    setPageSize(NumberOfRows);
    setCureentPage(1);
  };

  const navigate = (path) => {
    history.push(path);
  };

  const statusObj = {
    "In-Process": "light-warning",
    Accepted: "light-success",
    inactive: "light-secondary",
  };

  const gridColumns = [
    {
      name: "ENDORSEMENT NO ",
      sortable: false,
      selector: "endorsmentNo",
      cell: (row) => {
        return (
          <div>
            {/* <div onClick={() => navigate(`/endorsement/track/${encodeURIComponent(row.endorsmentNo)}`)}> */}
            {/* <Link className='text-underline'> */}
            {row.endorsmentNo}
            {/* </Link> */}
          </div>
        );
      },
    },
    { name: "ENDORSEMENT TYPE ", sortable: false, selector: "endorsmentType" },
    { name: "MEMBER NAME", sortable: false, selector: "memberName" },
    { name: "ENDORSEMENT DATE", sortable: false, selector: "endorsmentDate" },
    // { name: 'REASON ', sortable: false, selector: 'reason' },
    // {
    //     name: 'STATUS',
    //     sortable: false,
    //     selector: 'status',
    //     cell: row => {
    //         return (
    //             <Badge className='col-6 text-capitalize' color={statusObj[row.status]} pill>
    //                 {row.status}
    //             </Badge>
    //         )
    //     }
    // }
  ];

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  };

  const endorsementMonthwiseOptions = () => {
    return {
      chart: {
        height: 400,
        type: "bar",
        stacked: true,
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
          colors: {
            // backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
            // barRadius: 10,
            endingShape: "rounded",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        horizontalAlign: "start",
      },
      colors: [columnColors.series1, columnColors.series2],
      stroke: {
        show: true,
        colors: ["transparent"],
      },
      grid: {},
      xaxis: {
        categories: endorsementMonthCount?.map((c) => c.monthName),
      },
      fill: {
        opacity: 1,
      },
    };
  };
  const [isRtl, setIsRtl] = useRTL();
  const { colors } = useContext(ThemeColors);
  const series = [
    {
      name: "Z India Pvt Ltd",
      data: [90, 120, 55, 100, 80, 90, 120, 55, 100, 80, 90, 120],
    },
  ];

  const updateNewEndorsement = (isNew, endorsementType) => {
    setShowNewEndorsement(false);
    if (isNew) {
      setNewEndorsementType(endorsementType);
      if (endorsementType === "paid") {
        setShowNewPaidEndorsement(true);
      } else {
        setShowNewUnpaidEndorsement(true);
      }
    } else {
      setShowNewPaidEndorsement(false);
      setShowNewUnpaidEndorsement(false);
    }
  };

  const submitEndorsementRequest = () => {
    setShowNewPaidEndorsement(false);
    setShowNewUnpaidEndorsement(false);
    setShowEndorsementAckNumber(true);
  };
  const getEndorsementTypes = () => {
    // console.log('--categ', categoryCount.map(c => c.endorsmentType))
    return endorsementMemberType?.map((c) => c.endorsmentType);
  };
  const getMonthSeries = () => {
    return [
      {
        data: endorsementMonthCount?.map((c) => c.change).map(Number),
      },
    ];
  };
  // const getEndorsementMonth = () => {
  //     return endorsementMemberType.map(c => c.monthName)
  // }
  const getSeries = () => {
    return [
      {
        data: endorsementMemberType?.map((c) => c.change).map(Number),
      },
    ];
  };
  return (
    <div>
      <Row className="justify-content-between">
        <div className="d-flex justify-content-start">
          <div
            className="font-weight-bold px-1 py-50 mb-1"
            style={{ borderRight: "2px solid lightgrey" }}
          >
            Endorsement
          </div>
          <Breadcrumb className="pl-0 pb-1">
            <BreadcrumbItem tag="li">
              <Link to="/">
                <img src={dashboard} width="20" height="20" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem tag="li">Endorsement</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {endorsementMemberType.length > 0 && (
          <div className="mr-2">
            <span
              className={classnames(
                "cursor-pointer",
                index === 0 && "disabled"
              )}
              onClick={() => setIndex(index - 1)}
              style={{ fontSize: "24px" }}
            >
              <strong>&lt;</strong>
            </span>
            <span
              className={classnames(
                "cursor-pointer pl-1",
                index === endorsementMemberType.length - 4 && "disabled"
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
        {endorsementMemberType?.slice(index, index + 4)?.map((c, i) => {
          return (
            <Col lg="3" sm="6" key={Math.floor(Math.random() * 10000000)}>
              <StatsHorizontal
                icon={<img src={endorsement} height="25" width="20" />}
                color="primary"
                stats={c.change.toString()}
                statTitle={c.endorsmentType}
              />
            </Col>
          );
        })}
        {/* Stats With Icons Horizontal
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={endorsement} width='80%' />} color='primary' stats='20' statTitle='Endorsement' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={accepted} width='80%' />} color='success' stats='10' statTitle='Accepted' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={rejected} width='80%' />} color='danger' stats='5' statTitle='Rejected' />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal icon={<img src={inProcess} width='80%' />} color='warning' stats='5' statTitle='In-process' />
                </Col> */}
        {/* Stats With Icons Horizontal */}
      </Row>
      <Row>
        <Col xs="12" lg="6">
          <ApexBarChart
            inputSeries={getSeries()}
            categories={getEndorsementTypes()}
            direction={isRtl ? "rtl" : "ltr"}
            title="Endorsement Reason"
            info={colors.info.main}
          />
        </Col>
        <Col xs="12" lg="6">
          <Card className="p-sm-50">
            <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
              <CardTitle tag="h4">Endorsement Monthwise</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={endorsementMonthwiseOptions()}
                series={getMonthSeries()}
                type="bar"
                height={294}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <div className="app-user-list">
            <Table
              label={"Endorsements"}
              data={gridData}
              columns={gridColumns}
              updatePageNumber={updatePageNumber}
              updateRowData={updateRowData}
              showFilter={false}
              totalCount={totalPages}
              addButtonLabel="New Endorsement"
              addHandler={() => setShowNewEndorsement(true)}
            />
          </div>
        </Col>
      </Row>
      {showNewEndorsement && (
        <NewEndorsement
          toggle={(isSubmit, endorsementType) =>
            updateNewEndorsement(isSubmit, endorsementType)
          }
        ></NewEndorsement>
      )}
      {showNewPaidEndorsement && (
        <PaidEndorsement
          submit={() => {
            submitEndorsementRequest();
          }}
          toggle={() => setShowNewPaidEndorsement(false)}
        />
      )}
      {showNewUnpaidEndorsement && (
        <UnpaidEndorsement
          submit={() => submitEndorsementRequest()}
          toggle={() => setShowNewUnpaidEndorsement(false)}
        />
      )}
      {showEndorsementAckNumber && (
        <EndorsementAckNumber
          toggle={() => setShowEndorsementAckNumber(false)}
        />
      )}
    </div>
  );
};

export default Endorsement;
