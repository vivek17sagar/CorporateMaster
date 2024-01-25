import { noop } from "jquery";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { trackPromise } from "react-promise-tracker";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import InvoiceList from "../apps/invoice/list";
import ClaimsGrid from "./claimsGrid";
import FilterPanel from "./filterPanel";

const PastClaims = (props) => {
  const [diseases, setDiseases] = useState([]);

  const [pastClaimsData, setPastClaimsData] = useState([]);
  const [rcclData, setRCCLData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCureentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState({
    memberShipNo: "",
    employeeCode: "",
    memberName: "",
    policyNo: "",
  });
  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/commonDiseases", {
          pageNo: 0,
          pageSize: 10,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => {
              const value = result?.sort((a, b) => {
                return b.occurances - a.occurances;
              });

              let commonDiseases = result?.splice(0, 4);
              // console.log('----', commonDiseases)
              setDiseases(commonDiseases);
              // setSeries(commonDiseases.map(e => e.occurances))
              // console.log('--sub sc', commonDiseases.map(d => d.disease.substring(0,d.disease.toLowerCase().indexOf('includes'))))
              // setOptions(Object.assign({}, options, { labels: commonDiseases.map(d => d.disease) }))
            });
          }
        })
    ).catch(noop);
  }, []);

  // This useEffect Runs when the pageNo and pageSize changes
  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/pastClaim", {
          ...filter,
          pageNo: currentPage - 1,
          pageSize: pageSize,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => setPastClaimsData(result));
            setTotalPages(data[1]);
          }
        })
        .catch(() => {
          setPastClaimsData([]);
        })
    );
  }, [filter, currentPage, pageSize]);

  const updatePageNumber = (pageNumber) => {
    setCureentPage(pageNumber);
  };

  const updateRowData = (NumberOfRows) => {
    setPageSize(NumberOfRows);
    setCureentPage(1);
  };

  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  };

  const getRCCLOptions = () => ({
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
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
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
      categories: rcclData?.map((c) => c.monthName + " " + c.year), // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    fill: {
      opacity: 1,
    },
  });

  const getRCCLSeries = () => [
    {
      name: "Cashless",
      data: rcclData?.map((c) => c.preAuth),
    },
    {
      name: "Reimbursement",
      data: rcclData?.map((c) => c.reimbursement),
    },
  ];

  const getUtilizationOptions = () => ({
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Claim Amount",
              formatter: (w) => {
                const result = w?.globals?.seriesTotals?.reduce(
                  (sum, newVal) => {
                    return sum + newVal;
                  },
                  0
                );
                return `${(result / 100000).toFixed(2)} Lakhs`;
              },
            },
          },
        },
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },

    labels: diseases?.map((d) => " " + d.icdcode + "  " + d.disease), // ['Hospitalization', 'Medicine', 'Maternity', 'Pathology'],
    dataLabels: {
      enabled: false,
      // formatter(val, opt) {
      //     return `${parseInt(val)}`
      // }
    },

    legend: { show: true, position: "bottom" },
    stroke: { width: 0 },
    colors: [
      props.primary,
      columnColors.series1,
      columnColors.series2,
      columnColors.bg,
    ],
  });

  const getDonutSeries = () =>
    diseases?.map((d) => Number(d?.amount?.replace(/,/g, "")));

  const onFilterChange = (filters) => {
    setCureentPage(1);
    setPageSize(10);
    setFilter({ ...filters });
    // trackPromise(
    //   apiConfig
    //     .post("/pastClaim", { ...filters, pageNo: 0, pageSize: 10 })
    //     .then((data) => {
    //       if (data) {
    //         data[0]?.then((result) => setPastClaimsData(result));
    //       }
    //     })
    //     .catch(() => {
    //       setPastClaimsData([]);
    //     })
    // );

    trackPromise(apiConfig.post("/corporateclaimrccl").then(setRCCLData));
  };

  return (
    <div>
      <FilterPanel onFilterChange={onFilterChange}></FilterPanel>
      <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
              <CardTitle tag="h4">Cashless vs Reimbursement Claims</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={getRCCLOptions()}
                series={getRCCLSeries()}
                type="bar"
                height={300}
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" lg="6">
          <Card>
            <CardHeader className="align-items-end">
              <CardTitle>Top Benefits Utilized</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={getUtilizationOptions()}
                series={getDonutSeries()}
                type="donut"
                height={320}
              />
            </CardBody>
          </Card>
        </Col>
        <Col sm="12">
          <ClaimsGrid
            title="Past Claims"
            data={pastClaimsData}
            isPastClaim={true}
            totalCount={totalPages}
            updatePageNumber={updatePageNumber}
            updateRowData={updateRowData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PastClaims;
