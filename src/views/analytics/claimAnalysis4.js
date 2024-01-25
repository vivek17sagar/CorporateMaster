import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";
import ApexBarChart from "../charts/apex/ApexBarChart";
import Chart from "react-apexcharts";
import LineChart from "../charts/recharts/LineChart";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";
import Table from "../apps/user/list/Table";
const ClaimAnalysis4 = () => {
  const claimCauseColumns = [
    {
      name: "DISEASE",
      sortable: true,
      selector: "disease",
      minWidth: "400px",
      cell: (row) => {
        return (
          <Row className="pl-3">
            {row.icdcode} {row.disease}
          </Row>
        );
      },
    },
    {
      name: "NO. OF CLAIMS",
      sortable: true,
      selector: "occurances",
      center: true,
    },
    {
      name: "CLAIM COST",
      sortable: true,
      selector: "amount",
      // style: { 'justify-content': 'end' },
      cell: (row) => (
        <Row className="justify-content-end w-25">
          <div>{row.amount}</div>
        </Row>
      ),
    },
    // { name: 'NO. OF CLAIMS(IN%)', sortable: true, selector: 'claimPercent', center: true },
    // { name: 'GRAND TOTAL', sortable: true, selector: 'total', center: true }
  ];

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [claimCauseData, setClaimCauseData] = useState([
    // { category: "Diseases of the digestive system", noOfClaims: '12', claimCost: '428,062', claimPercent: '25%', total: '22%' },
    // { category: "Diseases of the genitourinary system", noOfClaims: '7', claimCost: '336,039', claimPercent: '15%', total: '18%' },
    // { category: "Diseases of the circulatory system", noOfClaims: '5', claimCost: '303,275', claimPercent: '10%', total: '16%' },
    // { category: "Diseases of the respiratory system", noOfClaims: '5', claimCost: '241,469', claimPercent: '10%', total: '13%' },
    // { category: "Injury, poisoning and certain other consequences of external causes", noOfClaims: '3', claimCost: '218,969', claimPercent: '6%', total: '11%' },
    // { category: "Pregnancy, childbirth and the puerperium", noOfClaims: '5', claimCost: '193,317', claimPercent: '10%', total: '10%' },
    // { category: "Diseases of the eye and adnexa", noOfClaims: '2', claimCost: '66,210', claimPercent: '4%', total: '3%' },
    // { category: "Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified", noOfClaims: '5', claimCost: '65,005', claimPercent: '10%', total: '3%' },
    // { category: "Certain infectious and parasitic diseases", noOfClaims: '2', claimCost: '34,128', claimPercent: '4%', total: '2%' },
    // { category: "Factors influencing health status and contact with health services", noOfClaims: '1', claimCost: '14,652', claimPercent: '2%', total: '1%' },
    // { category: "Endocrine, nutritional and metabolic diseases", noOfClaims: '1', claimCost: '8,012', claimPercent: '2%', total: '0.4%' },
    // { category: "Grand Total", noOfClaims: '48', claimCost: '1,909,138', claimPercent: '100%', total: '100%' }
  ]);

  const coveredMembersColumns = [
    { name: "DISEASE CATEGORY", sortable: true, selector: "category" },
    {
      name: "NO. OF CLAIMS",
      sortable: true,
      selector: "noOfClaims",
      center: true,
    },
    {
      maxWidth: "20%",
      name: "CLAIM COST",
      sortable: true,
      selector: "cost",
      maxWidth: "20%",
      center: true,
      style: { "justify-content": "end" },
      cell: (row) => (
        <Row className="justify-content-end w-75 pr-5">
          <div>{row.cost}</div>
        </Row>
      ),
    },
  ];

  const coveredMembersData = [
    {
      category: "Diseases of the digestive system",
      noOfClaims: "04",
      cost: "162,072",
    },
    {
      category: "Diseases of the circulatory system",
      noOfClaims: "02",
      cost: "88,495",
    },
    {
      category:
        "Injury, poisoning and certain other consequences of external causes",
      noOfClaims: "01",
      cost: "168,979",
    },
    {
      category: "Diseases of the genitourinary system",
      noOfClaims: "01",
      cost: "75,000",
    },
    {
      category: "Diseases of the respiratory system",
      noOfClaims: "01",
      cost: "24,807",
    },
    {
      category:
        "Factors influencing health status and contact with health services",
      noOfClaims: "01",
      cost: "14,652",
    },
    { category: "Grand Total", noOfClaims: "10", cost: "534,005" },
  ];

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  };

  const averageClaimChartOptions = {
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
        columnWidth: "5%",
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
      labels: {
        rotate: 0,
      },
      categories: [
        ["Diseases of the", "respiratory system"],
        [
          "Injury, poisoning and",
          "certain other consequences",
          "of external causes",
        ],
        ["Diseases of the", "circulatory system"],
        ["Diseases of the", "genitourinary system"],
        ["Diseases of the", "digestive system"],
        [
          "Factors influencing",
          "health status and",
          "contact with health services",
        ],
      ],
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Z India Pvt Ltd",
      data: [90, 120, 55, 100, 80, 40],
    },
    {
      name: "Industry",
      data: [85, 100, 30, 40, 95, 35],
    },
  ];

  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/commonDiseases", {
          pageNo: currentPage - 1,
          pageSize: pageSize,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => setClaimCauseData(result));
            setTotalPages(data[1]);
          }
        })
    );
  }, [currentPage, pageSize]);

  const updatePageNumber = (pageNumber) => {
    console.log("pageNumber ==> ", pageNumber);
    setCurrentPage(pageNumber);
  };
  const updateRowData = (rowNumber) => {
    setCurrentPage(1);
    setPageSize(rowNumber);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Causes Of Claims</CardTitle>
        </CardHeader>
        {/* 
        <DataTable
          noHeader
          data={claimCauseData}
          columns={claimCauseColumns}
          className="react-dataTable table-striped"
          sortIcon={<ChevronDown size={10} />}
        /> */}

        <Table
          noHeader
          data={claimCauseData}
          columns={claimCauseColumns}
          className="react-dataTable table-striped"
          sortIcon={<ChevronDown size={10} />}
          updatePageNumber={updatePageNumber}
          updateRowData={updateRowData}
          totalCount={totalPages}
        />
      </Card>
      {/* <Card>
                <CardHeader>
                    <CardTitle>Composition Of Covered Members</CardTitle>
                </CardHeader>
                <DataTable
                    noHeader
                    data={coveredMembersData}
                    columns={coveredMembersColumns}
                    className='react-dataTable table-striped'
                    sortIcon={<ChevronDown size={10} />}
                />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Causes of Claims</CardTitle>
                </CardHeader>
                <CardBody>
                    <Chart options={averageClaimChartOptions} series={series} type='bar' height={400} />
                </CardBody>
            </Card> */}
    </Fragment>
  );
};

export default ClaimAnalysis4;
