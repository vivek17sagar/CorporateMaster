import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { trackPromise } from "react-promise-tracker";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import ApexBarChart from "../charts/apex/ApexBarChart";
import ApexLineChart from "../charts/apex/ApexLineChart";
import LineChart from "../charts/recharts/LineChart";
import DemographicSpouseRatio from "./demographicSpouseRatio";

const Demographics2 = (props) => {
  // const { colors } = useContext(ThemeColors)
  // const [data, setData] = useState(
  //     [
  //         { id: '0-18 Years', full_name: 1, email: 5, post: 517, age: '-', salary: 523 },
  //         { id: '9-25 Years', full_name: 63, email: 52, post: 182, age: '-', salary: 297 },
  //         { id: '26-35 Years', full_name: 270, email: 203, post: '-', age: '-', salary: 473 },
  //         { id: '36-45 Years', full_name: 116, email: 130, post: '-', age: 119, salary: 265 },
  //         { id: '45-55 Years', full_name: 157, email: 115, post: '-', age: 269, salary: 541 },
  //         { id: '56-65 Years', full_name: 61, email: 28, post: '-', age: 393, salary: 482 },
  //         { id: '66-70 Years', full_name: '-', email: '-', post: '-', age: 105, salary: 105 },
  //         { id: '71-75 Years', full_name: '-', email: '-', post: '-', age: 103, salary: 103 },
  //         { id: '78-79 Years', full_name: '-', email: '-', post: '-', age: 41, salary: 41 },
  //         { id: '80 Years & Above', full_name: '-', email: '-', post: '-', age: 43, salary: 43 },
  //         { id: 'Grand Total', full_name: 668, email: 533, post: 699, age: 973, salary: '2,873' }
  //     ]
  // )

  const compositionColumns = [
    {
      name: "AGE BAND",
      selector: "ageGroup",
      sortable: true,
      // maxWidth: '100px'
    },
    {
      name: "EMPLOYEE",
      selector: "EMPLOYEE",
      sortable: true,
      center: true,
      // ,
      // minWidth: '225px'
    },
    {
      name: "SPOUSE",
      selector: "SPOUSE",
      sortable: true,
      center: true,
      // ,
      // minWidth: '310px'
    },
    {
      name: "CHILD",
      selector: "CHILD",
      sortable: true,
      minWidth: "50px",
      center: true,
    },
    {
      name: "PARENT",
      selector: "PARENT",
      sortable: true,
      minWidth: "40px",
      center: true,
    },
    {
      name: "GRAND TOTAL",
      sortable: true,
      center: true,
      cell: (row) => {
        return (row.EMPLOYEE || 0) + (row.SPOUSE || 0);
      },
      // ,
      // minWidth: '175px'
    },
  ];

  const categories = ["Employees", "Spouse", "Children", "Parents", "Groups"];
  const series = [
    {
      data: [40, 20, 30, 10, 40],
    },
  ];

  const [coveredEmpAgeGroups, setCoveredEmpAgeGroups] = useState([]);
  const [coveredEmpAgeGroupData, setCoveredEmpAgeGroupData] = useState([]);
  const [coveredSpouseAgeGroups, setCoveredSpouseAgeGroups] = useState([]);
  const [coveredSpouseAgeGroupData, setCoveredSpouseAgeGroupData] = useState(
    []
  );
  const [ageWiseCount, setAgeWiseCount] = useState([]);
  useEffect(() => {
    trackPromise(
      apiConfig.post("/dashboardmembercoveredagegrouprelation").then((data) => {
        // console.log('--gender agewise group', data)
        const ageGroup = new Set();
        const groups = {};

        data?.forEach((e) => {
          ageGroup?.add(e.ageGroup);
          if (groups[e.ageGroup]) {
            groups[e.ageGroup][e.relation] = e.memberCount;
          } else {
            groups[e.ageGroup] = {
              [e.relation]: e.memberCount,
            };
          }
        });

        const result = Object?.entries(groups)?.map(([key, value]) => {
          return { ageGroup: key, ...value };
        });

        setAgeWiseCount(
          Object?.entries(groups)?.map(([key, value]) => {
            return { ageGroup: key, ...value };
          })
        );
      })
    );

    trackPromise(
      apiConfig
        .post("/dashboardemployeecoveredagegroupdistribution")
        .then((data) => {
          setCoveredEmpAgeGroups(data?.map((e) => e?.ageGroup));
          setCoveredEmpAgeGroupData([
            { data: data?.map((e) => e.memberCount) },
          ]);
        })
    );
    trackPromise(
      apiConfig
        .post("/dashboardspousecoveredagegroupdistribution")
        .then((data) => {
          setCoveredSpouseAgeGroups(data.map((e) => e.ageGroup));
          setCoveredSpouseAgeGroupData([
            { data: data.map((e) => e.memberCount) },
          ]);
        })
    );
  }, []);

  return (
    <Fragment>
      <Row>
        {/* <Col xs='12' lg='6'>
                    <ApexLineChart height={250} inputSeries={series} categories={categories} title={'Average of Age'} warning={colors.warning.main} />
                </Col> */}
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle>Composition of Covered Members</CardTitle>
            </CardHeader>
            {/* <CardBody> */}
            <DataTable
              noHeader
              data={ageWiseCount}
              columns={compositionColumns}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
            />
            {/* </CardBody> */}
          </Card>
        </Col>
        <Col xs="12" lg="6">
          <DemographicSpouseRatio />
        </Col>

        {/* Age-Band wise distribution of covered spouses */}
        <Col xs="12" md="6">
          <ApexBarChart
            height={245}
            categories={coveredSpouseAgeGroups}
            inputSeries={coveredSpouseAgeGroupData}
            title={"Age-Band Wise Distribution Of Covered Spouses"}
          ></ApexBarChart>
        </Col>

        {/* Age-Band wise distribution of covered employees */}
        <Col xs="12" md="6">
          <ApexBarChart
            height={245}
            categories={coveredEmpAgeGroups}
            inputSeries={coveredEmpAgeGroupData}
            title={"Age-Band Wise Distribution Of Covered Employees"}
          ></ApexBarChart>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Demographics2;
