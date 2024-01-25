import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import ApexBarChart from "../charts/apex/ApexBarChart";

const Demographics3 = (props) => {
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

  const [data, setData] = useState([
    {
      data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150],
    },
  ]);
  const series = [
    {
      data: [700, 350],
    },
  ];
  const [ageWiseCount, setAgeWiseCount] = useState([]);
  useEffect(() => {
    trackPromise(
      apiConfig.post("/dashboardmembercoveredagegrouprelation").then((data) => {
        // console.log('--gender agewise group', data)
        const ageGroup = new Set();
        const groups = {};
        data.forEach((e) => {
          ageGroup.add(e.ageGroup);
          if (groups[e.ageGroup]) {
            groups[e.ageGroup][e.relation] = e.memberCount;
          } else {
            groups[e.ageGroup] = {
              [e.relation]: e.memberCount,
            };
          }
        });
        const ageGroups = Object.entries(groups)?.map(([key, value]) => {
          return {
            ageGroup: key,
            total: Object.values(value).reduce((a, b) => a + b, 0),
          };
        });

        setAgeWiseCount(ageGroups);

        setInputOptions(
          Object.assign(
            {},
            { ...inputOptions },
            { xaxis: { categories: ageGroups?.map((x) => x.ageGroup) } }
          )
        );
        setData([{ data: ageGroups.map((x) => x.total) }]);
      })
    );
  }, []);

  const [inputOptions, setInputOptions] = useState({
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        // horizontal: true,
        columnWidth: "20%",
        barHeight: "30%",
        endingShape: "rounded",
        // colors: []
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
    colors: colors.primary.main,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        ["0-18", "Years"],
        ["9-25", "Years"],
        ["26-35", "Years"],
        ["36-45", "Years"],
        ["46-55", "Years"],
        ["56-65", "Years"],
        ["65-70", "Years"],
        ["71-75", "Years"],
        ["76-79", "Years"],
        ["80 Years", "& above"],
      ],
    },
    yaxis: {
      // opposite: direction === 'rtl'
    },
  });
  const [coveredChildAgeGroups, setCoveredChildAgeGroups] = useState([]);
  const [coveredChildAgeGroupData, setCoveredChildAgeGroupData] = useState([]);
  const [coveredDepAgeGroups, setCoveredDepAgeGroups] = useState([]);
  const [coveredDepAgeGroupData, setCoveredDepAgeGroupData] = useState([]);

  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/dashboardchildcoveredagegroupdistribution")
        .then((data) => {
          setCoveredChildAgeGroups(data.map((e) => e.ageGroup));
          setCoveredChildAgeGroupData([
            { data: data.map((e) => e.memberCount) },
          ]);
        })
    );
    trackPromise(
      apiConfig
        .post("/dashboarddependentcoveredagegroupdistribution")
        .then((data) => {
          setCoveredDepAgeGroups(data.map((e) => e.ageGroup));
          setCoveredDepAgeGroupData([{ data: data.map((e) => e.memberCount) }]);
        })
    );
  }, []);
  return (
    <Fragment>
      <Row>
        <Col xs="12" lg="6">
          <ApexBarChart
            title="Composition of covered members"
            inputOptions={inputOptions}
            inputSeries={data}
            height={520}
          ></ApexBarChart>
        </Col>

        <Col xs="12" lg="6">
          {coveredChildAgeGroupData.length ? (
            <ApexBarChart
              height={150}
              inputSeries={coveredChildAgeGroupData}
              categories={coveredChildAgeGroups}
              title={"Age-band wise distrbution of covered children"}
            ></ApexBarChart>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  Age-band wise distrbution of covered children
                </CardTitle>
              </CardHeader>
              <CardBody className="justify-content-center d-flex">
                No Data Found
              </CardBody>
            </Card>
          )}
          <ApexBarChart
            height={150}
            inputSeries={coveredDepAgeGroupData}
            categories={coveredDepAgeGroups}
            title={"Age-band wise distrbution of covered Dependents"}
          ></ApexBarChart>
          {/* <ApexBarChart height={250} categories={['36-45 Years', '46-55 Years', '56-65 Years', '66-70 Years', '70 Years & above'].reverse()} title={'Age-band wise distrbution of covered Parents'}></ApexBarChart> */}
        </Col>
      </Row>
    </Fragment>
  );
};
export default Demographics3;
