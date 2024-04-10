import Chart from "react-apexcharts";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";
import { noop } from "lodash";

const GenderGraphTile = (props) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Male", "Female"],

    dataLabels: {
      enabled: false,
    },
    legend: { show: false, position: "left" },
    stroke: { width: 0 },
    colors: [props.primary, props.warning],
  };

  return (
    <Row className="my-25">
      <Col xs="12">
        <Row className="justify-content-center">
          <Col xs="4">
            <Row>
              <Col xs="12" className="p-0">
                {props.category}
              </Col>
              <Col xs="6" className="p-0">
                <span
                  className="bullet square mr-50"
                  style={{ backgroundColor: props.primary }}
                ></span>
                <span>Male</span>
              </Col>
              <Col xs="6">
                {Math.round(
                  (props.males / (props.males + props.females)) * 100
                )}
                %
              </Col>
              <Col xs="6" className="p-0">
                <span
                  className="bullet square mr-50"
                  style={{ backgroundColor: props.warning }}
                ></span>
                <span>Female</span>
              </Col>
              <Col xs="6">
                {Math.round(
                  (props.females / (props.males + props.females)) * 100
                )}
                %
              </Col>
            </Row>
          </Col>
          <Col xs="2">
            <Chart
              options={options}
              series={[props.males, props.females]}
              type="donut"
              height={95}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Demographics1 = (props) => {
  const colors = [
    props.colors.primary.main,
    props.colors.info.main,
    props.colors.danger.main,
    props.colors.warning.main,
    props.colors.success.main,
  ];
  const colors_lighter = [
    props.colors.primary.lighter,
    props.colors.info.lighter,
    props.colors.danger.lighter,
    props.colors.warning.lighter,
    props.colors.success.lighter,
  ];
  const [currentCount, setCurrentCount] = useState([]);
  const [data, setData] = useState([
    // { relationship: "Employee", currentMembers: '668', inceptionMembers: '647', percent: '3%' },
    // { relationship: "Spouse", currentMembers: '533', inceptionMembers: '520', percent: '3%' },
    // { relationship: "Children", currentMembers: '699', inceptionMembers: '687', percent: '2%' },
    // { relationship: "Parent", currentMembers: '973', inceptionMembers: '920', percent: '6%' },
    // { relationship: "Grand Total", currentMembers: '2,873', inceptionMembers: '2,774', percent: '14%' }
  ]);
  const coveredMembersColumns = [
    {
      name: "RELATIONSHIP",
      selector: "relationship",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "CURRENT MEMBERS",
      selector: "currentMembers",
      sortable: true,
      center: true,
      minWidth: "150px",
    },
    {
      name: "INCEPTION MEMBERS",
      selector: "inceptionMembers",
      sortable: true,
      center: true,
      minWidth: "150px",
    },
    { name: "%", selector: "percent", sortable: true, minWidth: "50px" },
  ];
  const genderWiseMembersColumns = [
    {
      name: "RELATIONSHIP",
      selector: "relationShip",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "MALE",
      selector: "maleCount",
      sortable: true,
      center: true,
      minWidth: "100px",
    },
    {
      name: "FEMALE",
      selector: "femaleCount",
      sortable: true,
      center: true,
      minWidth: "100px",
    },
    {
      name: "CURRENT Count",
      selector: "currentMemberCount",
      sortable: true,
      minWidth: "100px",
    },
  ];

  const [genderData, setGenderData] = useState([]);
  const [options, setOptions] = useState({
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: false,
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
    labels: ["Employees", "Spouse", "Children", "Parent"],
    dataLabels: {
      enabled: true,
      // formatter(val, opt) {
      //     return `${parseInt(val)}`
      // }
    },

    legend: { show: true, position: "bottom" },
    stroke: { width: 0 },
    colors: colors,
  });
  const [series, setSeries] = useState([3, 5, 7, 10]);

  useEffect(() => {
    trackPromise(
      Promise.all([
        apiConfig.post("/corporatecurentemployeerelation"),
        apiConfig.post("/corporateinceptionemployeerelation"),
        apiConfig.post("/corporateemployeesbyrelationshipgender"),
      ]).then(([current, inception, genderData]) => {
        setGenderData(genderData);

        setData(
          current?.map((obj) => {
            const relationship = obj?.relationShip;
            const currentMembers = obj?.currentMemberCount;

            const inceptionMembers = inception?.find((elem) => {
              return elem?.relationShip == relationship;
            })?.currentMemberCount;

            const percent =
              (((currentMembers - inceptionMembers) / inceptionMembers) * 100)
                ?.toFixed(2)
                ?.toString() + "%";

            return {
              relationship,
              currentMembers,
              inceptionMembers: inceptionMembers ? inceptionMembers : "-",
              percent: inceptionMembers ? percent : "-",
            };
          })
        );
        setCurrentCount(current);
        setOptions(
          Object.assign(
            {},
            { ...options },
            { labels: current.map((c) => c.relationShip) }
          )
        );
        setSeries(current?.map((c) => c.currentMemberCount));
      })
    ).catch(noop);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h3">
                Relationship Wise Composition Of Covered Members
              </CardTitle>
            </CardHeader>
            {/* <CardBody> */}

            <Row>
              <Col lg="6">
                <DataTable
                  noHeader
                  data={data}
                  columns={coveredMembersColumns}
                  className="react-dataTable"
                  sortIcon={<ChevronDown size={10} />}
                />
              </Col>
              <Col lg="6">
                {/* </CardBody> */}
                <Chart
                  options={options}
                  series={series}
                  type="donut"
                  height={320}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h3">
                Gender Wise Composition Of Covered Members
              </CardTitle>
            </CardHeader>
            {/* <CardBody className='p-2'> */}

            <DataTable
              noHeader
              data={genderData}
              columns={genderWiseMembersColumns}
              className="react-dataTable"
              style={{ height: "32rem" }}
              sortIcon={<ChevronDown size={10} />}
            />
            {/* </CardBody> */}
          </Card>
        </Col>

        <Col xs="12" lg="6">
          <Card style={{ display: "none", border: "1px solid red" }}>
            <CardBody>
              {genderData?.map((count, index) => {
                return (
                  <GenderGraphTile
                    key={Math.floor(Math.random() * 100000)}
                    males={count.maleCount}
                    females={count.femaleCount}
                    category={count.relationShip}
                    primary={colors[index % colors.length]}
                    warning={colors_lighter[index % colors.length]}
                  ></GenderGraphTile>
                );
              })}
              {/* <GenderGraphTile males={24} category='Spouse' primary={props.colors.cyan.main} warning={props.colors.blue.main}></GenderGraphTile>
                            <GenderGraphTile males={42} category='Children' primary={props.colors.danger.main} warning={props.colors.danger.lighter}></GenderGraphTile>
                            <GenderGraphTile males={59} category='Parent' primary={props.colors.warning.main} warning={props.colors.warning.lighter}></GenderGraphTile> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Demographics1;
