import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col,
} from "reactstrap";
import Chart from "react-apexcharts";
import { Circle } from "react-feather";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";

const CommonDiseases = (props) => {
  const [data, setData] = useState(null);

  const [options, setOptions] = useState({
    // labels: ['Heart Attacks', 'Covid', 'Typhoid'],
    plotOptions: {
      radialBar: {
        size: 150,
        hollow: {
          size: "20%",
        },
        track: {
          // strokeWidth: '100%',
          // margin: 15
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
            label: "Total",
            fontSize: "0.75rem",
            colors: "#5e5873",
            fontWeight: "500",

            formatter(a, b, c, d, e) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return a.config.series.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
    colors: [
      props.primary,
      props.warning,
      props.danger,
      props.primary,
      props.warning,
    ],
    stroke: {
      lineCap: "round",
    },
    chart: {
      // dropShadow: {
      //   enabled: true,
      //   blur: 3,
      //   left: 1,
      //   top: 1,
      //   opacity: 0.1
      // }
    },
  });

  const [diseases, setDiseases] = useState([]);

  const [series, setSeries] = useState([]);
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
              result?.sort((a, b) => {
                return b.occurances - a.occurances;
              });

              let commonDiseases = result?.splice(0, 5);
              setDiseases(commonDiseases);
              setSeries(commonDiseases?.map((e) => e.occurances));
              // console.log('--sub sc', commonDiseases.map(d => d.disease.substring(0,d.disease.toLowerCase().indexOf('includes'))))

              setOptions(
                Object.assign({}, options, {
                  labels: commonDiseases?.map(
                    (d) => " " + d.icdcode + "  " + d.disease
                  ),
                })
              );
            });
          }
        })
    );

    return () => {
      setDiseases([]);
      setSeries([]);
    };
  }, []);

  const getOptions = () => {
    return options;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Common Diseases</CardTitle>
        {/* <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu right>
            {data.last_days.map(item => (
              <DropdownItem className='w-100' key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            {" "}
            <Chart
              options={getOptions()}
              series={series}
              type="radialBar"
              height={265}
            />
          </Col>

          <Col>
            {" "}
            {diseases?.map((elem, index) => {
              return (
                <div
                  className="d-flex justify-content-between my-1"
                  key={Math.floor(Math.random() * 1000000)}
                >
                  <div className="d-flex align-items-center text-truncate">
                    <Circle
                      size={15}
                      style={{ color: options.colors[index] }}
                    />
                    <span
                      className="font-weight-bold mx-75"
                      title={elem.disease}
                      style={{
                        fontSize: "12px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {elem.icdcode} {elem.disease}
                    </span>
                  </div>
                  <span>{elem.occurances}</span>
                </div>
              );
            })}
          </Col>
        </Row>

        {/* <div className='d-flex justify-content-between mb-1'>
            <div className='d-flex align-items-center'>
              <Circle size={15} className='text-warning' />
              <span className='font-weight-bold ml-75'>Covid</span>
            </div>
            <span>{data.chart_info.pending}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <Circle size={15} className='text-danger' />
              <span className='font-weight-bold ml-75'>Typhoid</span>
            </div>
            <span>{data.chart_info.rejected}</span>
          </div> */}
      </CardBody>
    </Card>
  );
  // : <Fragment></Fragment>
};
export default CommonDiseases;
