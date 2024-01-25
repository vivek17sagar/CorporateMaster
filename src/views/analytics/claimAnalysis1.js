import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";
import ApexBarChart from "../charts/apex/ApexBarChart";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";

const ClaimAnalysis1 = () => {
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
    { name: "CLAIM STATUS", selector: "claimStatus", sortable: true },
    {
      name: "NO. OF CLAIMS",
      selector: "noOfClaim",
      sortable: true,
      center: true,
    },
    {
      name: "CLAIM COST",
      selector: "cost",
      sortable: true,
      style: { "justify-content": "end" },
      cell: (row) => (
        <Row className=" justify-content-end w-50">
          <div>{row.claimAmount}</div>
        </Row>
      ),
    },
  ];

  const [data, setData] = useState([
    // { status: 'Settled', noOfClaims: '20', cost: '11,111' },
    // { status: 'Outstanding', noOfClaims: '20', cost: '222,222' },
    // { status: 'Cashless Received pending for statement', noOfClaims: '14', cost: '333,333' },
    // { status: 'Rejected', noOfClaims: '08', cost: '444,444' },
    // { status: 'Grand Total', noOfClaims: '52', cost: '55,555' }
  ]);

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

  const [particularData, setParticularData] = useState([
    { particular: "Data as on", values: "05 August 2015" },
    { particular: "Policy Inception Date", values: "01 May 2015" },
    { particular: "Policy Expiry Date", values: "30 April 2016" },
    { particular: "Total No. of Days from policy inception", values: "96" },
    {
      particular:
        "Total Claim Cost (Total Settled Amt. + Total Claimed Amt. for Outstanding)",
      values: "1,909,138",
    },
    {
      particular: "Total Premium Paid Till date (Exclusive of Taxes)",
      values: "6,586,762",
    },
    { particular: "Earned Premium as on date", values: "1,732,409" },
    { particular: "End of Policy Claim Cost", values: "7,552,005" },
  ]);
  const particularColumns = [
    { name: "PARTICULAR", selector: "particular", sortable: true },
    { name: "VALUES", selector: "values", sortable: true, cell: () => "-" },
  ];
  const ratioSeries = [
    {
      data: [700, 350, 480],
    },
  ];

  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/claimstatuswisecountamount", { policyNo: "" })
        .then((data) => {
          setData(data);
        })
    );
  }, []);

  return (
    <Fragment>
      <Row className="claim-analytics">
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Status Wise Claim Summary</CardTitle>
            </CardHeader>
            {/* <CardBody className='ratio-table'> */}
            <DataTable
              noHeader
              data={data}
              columns={statusWiseGridColumns}
              className="ratio-table react-dataTable"
              sortIcon={<ChevronDown size={10} />}
            />
            {/* </CardBody> */}
          </Card>
          {/* <ApexBarChart height={200} inputSeries={ratioSeries} categories={['YTD Ratio', ['Ratio on Earned', 'Premium'], 'EOP Ratio']} title={'Claim Ratios'}></ApexBarChart> */}
        </Col>
        <Col sm="6" lg="6">
          <DataTable
            noHeader
            data={particularData}
            columns={particularColumns}
            className="react-dataTable ratio-particular table-striped"
            sortIcon={<ChevronDown size={10} />}
          />
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

                                <li>End of Policy (EOP) claim cost is calculated at 380 days.</li>
                                <li>Claimed amounts are taken as claim cost for outstanding, Cashless received pending for settlement and rejected claims.</li>
                                <li>In subsequent slides, only settled, outstanding and Cashless received pending for settlement claims are considered.</li>
                                <li>All Amounts are in INR.</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col> */}
      </Row>
    </Fragment>
  );
};

export default ClaimAnalysis1;
