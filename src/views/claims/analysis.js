import { useRTL } from "@hooks/useRTL";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { selectThemeColors } from "@utils";
import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { trackPromise } from "react-promise-tracker";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import ApexAreaCharts from "../charts/apex/ApexAreaCharts";
import ApexBarChart from "../charts/apex/ApexBarChart";
import ApexLineChart from "../charts/apex/ApexLineChart";

const Analysis = () => {
  const context = useContext(ThemeColors);
  const [isRtl, setIsRtl] = useRTL();
  const [diseases, setDiseases] = useState([]);

  const [series, setSeries] = useState([]);

  const [familyWiseOptions, setFamilyWiseOptions] = useState({
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        endingShape: "rounded",
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      // opposite: direction === 'rtl'
    },
  });

  const [familySeries, setFamilySeries] = useState([
    {
      data: [],
    },
  ]);

  const [ageGroupCategories, setAgeGroupCategories] = useState([]);
  const [ageGroupSeries, setAgeGroupSeries] = useState([{ data: [] }]);

  const [monthwiseSeries, setMonthwiseSeries] = useState([
    {
      data: [],
    },
  ]);
  const [monthwiseCategories, setMonthwiseCategories] = useState([]);

  const [commonDiseaseOptions, setCommonDiseaseOptions] = useState({
    labels: [],
    legend: {
      show: true,
      position: "bottom",
    },
    colors: [
      "#007bff",
      "#28a745",
      "#6f42c1",
      "#ffc107",
      "#17a2b8",
      "#dc3545",
      "#fd7e14",
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "20%",
        },
        track: {
          strokeWidth: "100%",
          margin: 10,
        },
        dataLabels: {
          value: {
            fontSize: "1rem",
            colors: "#5e5873",
            fontWeight: "500",
            offsetY: 5,
          },
          total: {
            show: true,
            label: "Claim Amount",
            fontSize: "1.286rem",
            colors: "#5e5873",
            fontWeight: "500",

            formatter: (a) => {
              // return diseases
              //   .map((d) => Number(d.amount.replace(/,/g, "")))
              //   .reduce((a, b) => {
              //     return a + b;
              //   }, 0);

              return "4000";
            },
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
  });

  useEffect(() => {
    trackPromise(
      apiConfig.post("/dashboardclaimmonthwise").then((data) => {
        // debugger;
        setMonthwiseSeries([
          { data: data.map((d) => Number(d.claimAmount.replace(/,/g, ""))) },
        ]);
        setMonthwiseCategories(data.map((d) => d.monthName));
      })
    );
    trackPromise(
      apiConfig.post("/dashboardclaimrelationwise").then((data) => {
        setFamilyWiseOptions(
          Object.assign(
            {},
            { xaxis: { categories: data?.map((e) => e?.relationShipDesc) } }
          )
        );
        setFamilySeries([
          { data: data.map((x) => Number(x.claimAmount.replace(/,/g, ""))) },
        ]);
      })
    );
    trackPromise(
      apiConfig.post("/dashboardclaimagewise").then((data) => {
        setAgeGroupCategories(data.map((e) => e.ageGroup));
        setAgeGroupSeries([
          { data: data?.map((x) => Number(x.claimAmount.replace(/,/g, ""))) },
        ]);
      })
    );

    trackPromise(
      apiConfig
        .post("/commonDiseases", {
          pageSize: 10,
          pageNo: 0,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => {
              result?.sort((a, b) => {
                return (
                  Number(b?.amount.replace(/,/g, "")) -
                  Number(a?.amount.replace(/,/g, ""))
                );
              });
              let commonDiseases = result?.splice(0, 5);
              const totalAmount = commonDiseases
                ?.map((d) => Number(d?.amount?.replace(/,/g, "")))
                ?.reduce((a, b) => {
                  return a + b;
                }, 0);
              // setDiseases(commonDiseases);
              setSeries(
                commonDiseases?.map((d) =>
                  (
                    Number(d.amount?.replace(/,/g, "") / totalAmount) * 100
                  ).toFixed(2)
                )
              );
              setCommonDiseaseOptions(
                _.merge(
                  {},
                  { ...commonDiseaseOptions },
                  {
                    labels: commonDiseases.map(
                      (d) => "  " + d.icdcode + "  " + d.disease
                    ),
                    plotOptions: {
                      radialBar: {
                        dataLabels: { total: { formatter: () => totalAmount } },
                      },
                    },
                  }
                )
              );
            });
          }
        })
    );

    return () => {
      setMonthwiseSeries([
        {
          data: [],
        },
      ]);
      setMonthwiseCategories([]);
      setFamilySeries([
        {
          data: [],
        },
      ]);
      setAgeGroupCategories([]);
      setAgeGroupSeries([
        {
          data: [],
        },
      ]);
      setDiseases([]);
      setSeries([]);
    };
  }, []);

  const getOptions = () => commonDiseaseOptions;
  return (
    <div>
      {/*<Card>
         <CardHeader>
          <CardTitle tag='h4'>Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label>Policy Type</Label>
              <Select
              // isClearable={false}
              // theme={selectThemeColors}
              // className='react-select'
              // classNamePrefix='select'
              // options={roleOptions}
              // value={currentRole}
              />
            </Col>
            <Col md='4'>
               <div className='d-flex align-items-center'>
                <Calendar size={14} />
                <DatePicker />
              </div> 
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle>Mostly Claimed Diseases</CardTitle>
            </CardHeader>
            <CardBody>
              <Chart
                options={getOptions()}
                series={series}
                type="radialBar"
                height={500}
              />
              {/* <Chart options={options} series={series} type='radialBar' height={350} /> */}
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs='12' lg='6'>
          <ApexLineChart height={315} categories={['Accounts', 'Marketing', 'IT', "GST", 'Income Tax', 'Others']} inputSeries={departmentWiseSeries} title={'Department Wise Claims'} direction={isRtl ? 'rtl' : 'ltr'} warning={context.colors.warning.main} />
        </Col> */}
        <Col xs="12" lg="6">
          <ApexBarChart
            inputOptions={familyWiseOptions}
            inputSeries={familySeries}
            height={475}
            title={"Relation Wise Claims Amount"}
          ></ApexBarChart>
        </Col>
        <Col xs="12" lg="6">
          <ApexLineChart
            inputSeries={monthwiseSeries}
            categories={monthwiseCategories}
            title={"Month Wise Claims Amount"}
            height={320}
            direction={isRtl ? "rtl" : "ltr"}
            warning={context.colors.primary.main}
          />
        </Col>
        <Col xs="12" lg="6">
          <ApexBarChart
            info={context.colors.warning.main}
            inputSeries={ageGroupSeries}
            categories={ageGroupCategories}
            height={350}
            title={"Age Wise Claims Amount"}
          ></ApexBarChart>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
