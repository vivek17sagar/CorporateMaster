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

  const colors = [
    props?.danger,
    props?.primary,
    props?.success,
    props?.warning,
  ];
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

    trackPromise(
      apiConfig.post("/corporateclaimrccl").then((data) => {
        setRCCLData(data);
      })
    ).catch(noop);

    return () => {
      setRCCLData([]);
      setDiseases([]);
    };
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
    return () => {
      setPastClaimsData([]);
      setTotalPages(0);
    };
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
    bg: "#ffff",
  };

  const getRCCLOptions = () => ({
    chart: {
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
          // backgroundBarColors: [
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          //   columnColors.bg,
          // ],

          backgroundBarColors: Array.from(
            { length: rcclData?.length },
            () => columnColors.bg
          ),
        },
      },
    },
    dataLabels: {
      enabled: true,
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
      categories:
        rcclData.length > 0
          ? rcclData?.map((c) => c.monthName + " " + c.year).filter(Boolean)
          : ["Mar 2024"],
    },
    fill: {
      opacity: 1,
    },
  });
  const getRCCLSeries = () => [
    {
      name: "Cashless",
      data:
        rcclData?.length > 0
          ? rcclData?.map((c) => {
              return c.preAuth || 0;
            })
          : 0,
    },
    {
      name: "Reimbursement",
      data:
        rcclData?.length > 0
          ? rcclData?.map((c) => {
              return c.reimbursement || 0;
            })
          : 0,
    },
  ];

  const getDonutSeries = () => {
    if (diseases && diseases.length > 0) {
      return diseases.map((d) => {
        return Number(d?.amount?.replace(/,/g, ""));
      });
    }

    // If diseases is not properly initialized or empty, return default values
    return [57000, 520000, 800000, 30000];
  };

  const getUtilizationOptions = () => {
    return {
      chart: {
        type: "donut",
        height: 300,
      },
      labels:
        diseases.length > 0
          ? diseases?.map((d) => {
              return " " + d.icdcode + "  " + d.disease;
            })
          : ["Team A", "Team B", "Team C", "Team D"],
      series: getDonutSeries(),

      // plotOptions: {
      //   pie: {
      //     donut: {
      //       size: "70%",
      //     },
      //   },
      // },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: false,
      },
      colors: colors,
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Claim Amount",
                formatter: function (w) {
                  const seriesTotals = w?.globals?.seriesTotals;

                  if (!seriesTotals || !Array.isArray(seriesTotals)) {
                    return "N/A";
                  }

                  const result = seriesTotals.reduce(
                    (sum, newVal) => sum + newVal,
                    0
                  );
                  const unit =
                    result < 1000000
                      ? { divider: 1000, unit: "K" }
                      : { divider: 1000000, unit: "Mn" };

                  return `${(result / unit.divider).toFixed(3)} ${unit.unit}`;
                },
              },
            },
          },
        },
      },
    };
  };

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

    // trackPromise(
    //   apiConfig.post("/corporateclaimrccl").then((data) => {
    //     setRCCLData(data);
    //   })
    // );
  };

  return (
    <div>
      <FilterPanel onFilterChange={onFilterChange}></FilterPanel>
      <Row>
        <Col xs="12" lg="6">
          {rcclData.length > 0 && (
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
          )}
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
                height={322}
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
