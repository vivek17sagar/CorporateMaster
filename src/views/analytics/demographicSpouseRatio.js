import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import { noop } from "lodash";

const DemographicSpouseTile = (props) => {
  const { key, value, color, progress } = props?.data;
  console.log(props)

  return (
    <div className="mt-2 mb-50">
      <CardTitle className="mb-0 font-medium-3">{key}</CardTitle>
      <span>{value}</span>
      <Progress
        color={color}
        className={`avg-session-progress`}
        value={progress}
      />
    </div>
  );
};

const DemographicSpouseRatio = (props) => {
  const [empSpouseRatio, setEmpSpouseRatio] = useState({});
  const [empChildRatio, setEmpChildRatio] = useState({});
  const [empDepRatio, setEmpDepRatio] = useState({});

  useEffect(() => {
    trackPromise(
      apiConfig.post("/dashboardemployeespouseratio").then((data) => {
        setEmpSpouseRatio(data[0]);
      })
    ).catch(noop);
    trackPromise(
      apiConfig.post("/dashboardemployeechildratio").then((data) => {
        setEmpChildRatio(data[0]);
      })
    ).catch(noop);
    trackPromise(
      apiConfig.post("/dashboardemployeedependentratio").then((data) => {
        setEmpDepRatio(data[0]);
      })
    ).catch(noop);
  }, []);

  const [ratioData, setRatioData] = useState([
    {
      key: "Employee Spouse Ratio",
      value: "1 : 0.80",
      progress: "60",
      color: "warning",
    },
    {
      key: "Employee Child Ratio",
      value: "1 : 0.80",
      progress: "40",
      color: "primary",
    },
    {
      key: "Employee Dependents Ratio",
      value: "1 : 0.80",
      progress: "90",
      color: "success",
    },
    {
      key: "Employee All Department",
      value2: "1 : 0.80",
      progress: "20",
      color: "danger",
    },
  ]);

  console.log(empChildRatio)
  useEffect(() => {
    setRatioData([
      {
        key: "Employee Spouse Ratio",
        value: `${empSpouseRatio.employeepercentage} : ${empSpouseRatio.spousepercentage}`,
        progress: ` ${empSpouseRatio.spousepercentage}`,
        color: "warning",
      },
      {
        key: "Employee Child Ratio",
        value: `${empChildRatio.employeepercentage} : ${empChildRatio.childpercentage}`,
        progress: `${empChildRatio.childpercentage}`,
        color: "primary",
      },
      {
        key: "Employee Dependents Ratio",
        value: `${empDepRatio.employeepercentage} : ${empDepRatio.dependentpercentage}`,
        progress: `${empDepRatio.dependentpercentage}`,
        color: "success",
      },
    ]);
  }, [empChildRatio, empDepRatio, empSpouseRatio]);

  // const renderRatioTile = () => {
  //     return spouseData.map((row, index) => {
  //         return <DemographicSpouseTile key={index} data={row}></DemographicSpouseTile>
  //     })
  // }

  return (
    <Card>
      <CardBody>
        {ratioData?.map((row, index) => {
          return (
            <DemographicSpouseTile
              key={index}
              data={row}
            ></DemographicSpouseTile>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default DemographicSpouseRatio;
