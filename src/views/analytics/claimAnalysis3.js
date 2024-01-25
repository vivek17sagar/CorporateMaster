import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";
import ApexBarChart from "../charts/apex/ApexBarChart";
import Chart from "react-apexcharts";
import LineChart from "../charts/recharts/LineChart";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";

const ClaimAnalysis3 = () => {
  const [bandWiseClaimData, setBandWiseClaimsData] = useState([]);
  const { colors } = useContext(ThemeColors);
  const tooltipShadow = "rgba(0, 0, 0, 0.25)",
    labelColor = "#6e6b7b",
    gridLineColor = "rgba(200, 200, 200, 0.2)",
    lineChartPrimary = "#666ee8",
    lineChartDanger = "#ff4961",
    warningColorShade = "#ffe802",
    warningLightColor = "#FDAC34",
    successColorShade = "#28dac6",
    primaryColorShade = "#836AF9",
    infoColorShade = "#299AFF",
    yellowColor = "#ffe800",
    greyColor = "#4F5D70",
    blueColor = "#2c9aff",
    blueLightColor = "#84D0FF",
    greyLightColor = "#EDF1F4";

  const statusWiseGridColumns = [
    { name: "CLAIM STATUS", selector: "status", sortable: true },
    {
      name: "NO. OF CLAIMS",
      selector: "noOfClaims",
      sortable: true,
      center: true,
    },
    {
      name: "CLAIM COST",
      selector: "cost",
      sortable: true,
      style: { "justify-content": "end" },
      cell: (row) => (
        <Row className="justify-content-end w-50">
          <div>{row.cost}</div>
        </Row>
      ),
    },
  ];
  const relationWiseClaimsColumns = [
    { name: "RELATIONSHIP", selector: "relationShipDesc", sortable: true },
    {
      name: "NO. OF CLAIMS",
      selector: "claimCount",
      sortable: true,
      center: true,
    },
    {
      name: "CLAIM COST",
      selector: "cost",
      sortable: true,
      style: { "justify-content": "end" },
      cell: (row) => (
        <Row className="justify-content-end w-50">
          <div>{row.claimAmount}</div>
        </Row>
      ),
    },
  ];

  const ratioData = {
    labels: [
      "7/12",
      "8/12",
      "9/12",
      "10/12",
      "11/12",
      "12/12",
      "13/12",
      "14/12",
      "15/12",
      "16/12",
      "17/12",
    ],
    datasets: [
      {
        data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
        backgroundColor: successColorShade,
        borderColor: "transparent",
        barThickness: 15,
      },
    ],
  };

  const options = {
    elements: {
      rectangle: {
        borderWidth: 2,
        borderSkipped: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    legend: {
      display: false,
    },
    tooltips: {
      // Updated default tooltip UI
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 8,
      shadowColor: tooltipShadow,
      backgroundColor: "#fff",
      titleFontColor: "#000",
      bodyFontColor: "#000",
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: true,
            color: gridLineColor,
            zeroLineColor: gridLineColor,
          },
          scaleLabel: {
            display: false,
          },
          ticks: {
            fontColor: labelColor,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: gridLineColor,
            zeroLineColor: gridLineColor,
          },
          ticks: {
            stepSize: 100,
            min: 0,
            max: 400,
            fontColor: labelColor,
          },
        },
      ],
    },
  };

  const [incidenceRatioProjection, setIncidenceRatioProjection] = useState([
    {
      relation: "Employee",
      currentMembers1: "668",
      currentMembers2: "10",
      eopClaims: "38",
      currentIncidence: "1%",
      claimCost: "5%",
    },
    {
      relation: "Spouse",
      currentMembers1: "533",
      currentMembers2: "18",
      eopClaims: "68",
      currentIncidence: "3%",
      claimCost: "12%",
    },
    {
      relation: "Child",
      currentMembers1: "699",
      currentMembers2: "0",
      eopClaims: "0",
      currentIncidence: "0%",
      claimCost: "0%",
    },
    {
      relation: "Parent",
      currentMembers1: "973",
      currentMembers2: "20",
      eopClaims: "76",
      currentIncidence: "2%",
      claimCost: "7%",
    },
    {
      relation: "Grand Total",
      currentMembers1: "2873",
      currentMembers2: "48",
      eopClaims: "183",
      currentIncidence: "2%",
      claimCost: "6%",
    },
  ]);

  const incidenceRatioProjectionColumns = [
    { name: "RELATION", sortable: true, selector: "relation" },
    { name: "CURRENT MEMBERS", sortable: true, selector: "currentMembers1" },
    { name: "CURRENT MEMBERS", sortable: true, selector: "currentMembers2" },
    { name: "EOP CLAIMS", sortable: true, selector: "eopClaims" },
    { name: "CURRENT INCIDENCE", sortable: true, selector: "currentIncidence" },
    { name: "CLAIM COST", sortable: true, selector: "claimCost" },
  ];

  const [statusWiseGridData, setStatusWiseGridData] = useState([
    // { status: 'Settled', noOfClaims: '20', cost: '11111' },
    { status: "Reimbursement", noOfClaims: "20", cost: "222,222" },
    { status: "Cashless", noOfClaims: "14", cost: "333,333" },
    // { status: 'Rejected', noOfClaims: '08', cost: '444444' },
    { status: "Grand Total", noOfClaims: "52", cost: "555,555" },
  ]);

  const series5Column = () => {
    return [
      {
        name: JSON.parse(localStorage.getItem("userData")).corporateName,
        data: bandWiseClaimData.map((e) =>
          Number(e.cmpClaimAmount.toString().replace(/,/g, ""))
        ),
      },
      {
        name: "Industry",
        data: bandWiseClaimData.map((e) =>
          Number(e.indClaimAmount.toString().replace(/,/g, ""))
        ),
      },
    ];
  };

  const series2Column = () => {
    // console.log('asdasasda', JSON.parse(localStorage.getItem('userData')).corporateName,)
    // debugger;
    return [
      {
        name: JSON.parse(localStorage.getItem("userData")).corporateName,
        data: bandWiseClaimData.map((e) => e.cmpCount),
      },
      {
        name: "Industry",
        data: bandWiseClaimData.map((e) => e.indCount),
      },
    ];
  };

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  };

  const averageClaimChartOptions = () => ({
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
        barHeight: "20%",
        horizontal: true,
        colors: {
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
          ],
          backgroundBarRadius: 10,
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
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: bandWiseClaimData?.map((x) => x.claimCost),
    },
    fill: {
      opacity: 1,
    },
  });
  const averageClaimChartOptions2Column = () => ({
    chart: {
      type: "bar",
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "20%",
        colors: {
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
          ],
          backgroundBarRadius: 10,
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
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: bandWiseClaimData?.map((x) => x.claimCost),
    },
    fill: {
      opacity: 1,
    },
  });

  const bandWiseClaimColumns = [
    { name: "CLAIM COST", selector: "claimCost", sortable: false },
    {
      name: "NO. OF CLAIMS",
      selector: "cmpCount",
      sortable: true,
      center: true,
    },
    {
      name: "CLAIM AMOUNT",
      selector: "cost",
      sortable: true,
      style: { "justify-content": "end" },
      cell: (row) => (
        <Row className="justify-content-end w-50">
          <div>{row.cmpClaimAmount}</div>
        </Row>
      ),
    },
  ];

  const [relationWiseClaimsData, setRelationWiseClaimsData] = useState([]);
  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/dashboardclaimrelationwise", { policyNo: "" })
        .then((data) => {
          // console.log('--relationwise claim', data);
          setRelationWiseClaimsData(data);
        })
    );
    trackPromise(
      Promise.all([
        apiConfig.post("/corporateclaimcountbycost"),
        apiConfig.post("/corporateclaimcountbycostall"),
      ]).then(([company, industry]) => {
        const x = industry.map((ind) => {
          const matchingCompanyObj = company.find(
            (c) => c.claimCost == ind.claimCost
          );
          return {
            claimCost: ind.claimCost,
            indCount: ind.claimCount,
            indClaimAmount: ind.claimAmount,
            cmpCount:
              (matchingCompanyObj && matchingCompanyObj.claimCount) || 0,
            cmpClaimAmount:
              (matchingCompanyObj && matchingCompanyObj.claimAmount) || 0,
          };
        });
        // console.log('---cost all', x);
        setBandWiseClaimsData(x);
      })
    );
  }, []);

  return (
    <Fragment>
      <Row className="claim-analytics">
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Relationship wise Claim Analysis</CardTitle>
            </CardHeader>
            <DataTable
              noHeader
              data={relationWiseClaimsData}
              columns={relationWiseClaimsColumns}
              className="react-dataTable ratio-table relationship-table mb-2"
              sortIcon={<ChevronDown size={10} />}
            />
          </Card>
        </Col>

        <Col xs="12" lg="6">
          <Card>
            <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
              <CardTitle tag="h4">Average of claim count </CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={averageClaimChartOptions2Column()}
                series={series2Column()}
                type="bar"
                height={350}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
              <CardTitle tag="h4">Average of claim cost</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={averageClaimChartOptions()}
                series={series5Column()}
                type="bar"
                height={350}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Cost Wise Claim Summary</CardTitle>
            </CardHeader>
            <DataTable
              noHeader
              data={bandWiseClaimData}
              columns={bandWiseClaimColumns}
              className="react-dataTable ratio-table  bandwise-table mb-2"
              sortIcon={<ChevronDown size={10} />}
            />
          </Card>
        </Col>
        {/* <Col xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>Overall cashless claims account for 38% of the total claim cost for Heinz India Pvt. Ltd. This is below industry. </li>
                                <li>Average claim cost for cashless claims is below industry and reimbursement claims is above industry. </li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col> */}
        <Col lg="6" xs="12"></Col>
        <Col xs="12" lg="6">
          {/* <Card>
                        <CardHeader>
                            <CardTitle>
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>Most of the claims reported are in below 50K amount band. </li>
                                <li>For Average claim cost, only settled claims are considered. </li>
                            </ul>
                        </CardBody>
                    </Card> */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default ClaimAnalysis3;
