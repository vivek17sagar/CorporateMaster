import { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Chart from "react-apexcharts";
import * as Icon from "react-feather";
import { apiConfig } from "../../@core/api/serviceConfig";
import { trackPromise } from "react-promise-tracker";

const ActiveAdmissions = (props) => {
  const [data, setData] = useState(null);
  const colors = [
    "#007bff",
    "#28a745",
    "#6f42c1",
    "#ffc107",
    "#17a2b8",
    "#dc3545",
    "#fd7e14",
    "#e83e8c",
    "#20c997",
    "#007bff",
    "#28a745aa",
    "#6f42c1aa",
    "#ffc107aa",
    "#17a2b8aa",
    "#dc3545aa",
    "#fd7e14aa",
    "#e83e8caa",
    "#20c997aa",
  ];
  const [options, setOptions] = useState({
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
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
    labels: ["Employees", "Spouse", "Children", "Parents"],
    dataLabels: {
      enabled: true,
      formatter(val, opt) {
        return series[opt.seriesIndex];
      },
    },

    legend: { show: false },
    stroke: { width: 0 },
    colors: colors,
  });
  const [series, setSeries] = useState([0, 0, 0, 0]);

  useEffect(() => {
    trackPromise(
      apiConfig.post("/activeclaimhospitalisationrelationwise").then((data) => {
        setSeries(data?.map((e) => e.hospitalised));
        setOptions(
          Object.assign({}, options, {
            labels: data?.map((e) => e.relationDesc),
          })
        );
        data.forEach((data, i) => {
          data.icon = "Square";
          data.iconColor = colors[i % colors.length];
        });
        setData(data);
      })
    );

    return () => {
      setSeries([0, 0, 0, 0]);
      setData(null);
    };
  }, []);

  const renderChartInfo = () => {
    return data?.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames("d-flex justify-content-between mr-1", {
            "mb-1": index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Icon.Square color={item.iconColor} />
            <span className="font-weight-bold ml-75 mr-25">
              {item.relationDesc}
            </span>
            {/* <span>- {item.usage}</span> */}
          </div>
          <div>
            <span>{item.calimAmount}</span>
            {/* {item.upDown > 0 ? ( */}
            {/* <Icon.ArrowUp size={14} className='ml-25 text-success' /> */}
            {/* ) : ( */}
            {/* <Icon.ArrowDown size={14} className='ml-25 text-danger' /> */}
            {/* )} */}
          </div>
        </div>
      );
    });
  };

  return data !== null ? (
    <Card className="p-sm-25">
      <CardHeader className="align-items-end">
        <CardTitle tag="h4">Active Admissions</CardTitle>
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
        <Chart options={options} series={series} type="donut" height={250} />
        <div className="overflow-auto" style={{ height: "11vh" }}>
          {renderChartInfo()}
        </div>
      </CardBody>
    </Card>
  ) : null;
};
export default ActiveAdmissions;
