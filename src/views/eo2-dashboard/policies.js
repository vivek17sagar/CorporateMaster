import { Fragment, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { Settings } from "react-feather";
import { trackPromise } from "react-promise-tracker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  CardSubtitle,
} from "reactstrap";
import { apiConfig } from "../../@core/api/serviceConfig";
import { PolicyTiles } from "./policyTiles";

const Policies = (props) => {
  const getOptions = (data) => {
    return {
      series: data ? data.data : [],
      options: {
        labels: ["a", "b", "c"],
        chart: {
          type: "bar",
          width: 43,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            colors: ["#000"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: data ? data?.categories : [],
        },
      },
    };
  };
  const [options, setOptions] = useState(getOptions());

  const [policyGenderCount, setPolicyGenderCount] = useState([]);
  const [policyCategoryData, setPolicyCategoryData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(undefined);
  useEffect(() => {
    trackPromise(
      apiConfig.post("/corporatepolicycategoriesgender").then((data) => {
        setPolicyGenderCount([...data]);
        setSelectedCat(data[0]);
      })
    );
  }, []);

  useEffect(() => {
    trackPromise(
      apiConfig
        .post(
          "/corporateMainBenefitUtilisationCategory",
          undefined,
          undefined,
          { policyCode: "policyCode" }
        )
        .then((data) => {
          setPolicyCategoryData(data);
        })
        .catch(() => {
          console.error("Policy Category Data Not Available");
        })
    );
  }, []);

  useEffect(() => {
    if (selectedCat && policyCategoryData?.length > 0) {
      const currentCatData = policyCategoryData?.filter(
        (elem) => elem.category === selectedCat.schemeName
      );
      setOptions(
        getOptions({
          categories: currentCatData?.map((elem) => elem.benefit),
          data: [
            {
              name: "Consumed",
              data: currentCatData?.map((elem) =>
                Number(elem?.consumed?.replaceAll(",", ""))
              ),
            },
            {
              name: "Balance",
              data: currentCatData?.map((elem) =>
                Number(elem?.balance?.replaceAll(",", ""))
              ),
            },
            {
              name: "Max Limit",
              data: currentCatData?.map((elem) =>
                Number(elem.maxLimit?.replaceAll(",", ""))
              ),
            },
          ],
        })
      );
    }
  }, [selectedCat, policyCategoryData]);

  const colors = [
    "#28c76f",
    "#28c76faa",
    "#ff9f43",
    "#ff9f43aa",
    "#7367f0",
    "#7367f0aa",
    "#ea5455",
    "#ea5455aa",
  ];

  return (
    <Card>
      <CardHeader className="align-items-start">
        <CardTitle className="mb-25" tag="h4">
          Policy Categories
        </CardTitle>
        <div className="d-flex overflow-auto p-0">
          {policyGenderCount?.map((policy, index) => {
            return (
              <Fragment key={Math.floor(Math.random() * 100000000)}>
                <Col lg="3">
                  <PolicyTiles
                    heading={policy.schemeName}
                    color1={colors[(2 * index) % colors.length]}
                    color2={colors[((2 * index) % colors.length) + 1]}
                    maleCount={policy.maleCount}
                    femaleCount={policy.femaleCount}
                  />
                </Col>
              </Fragment>
            );
          })}
        </div>
        <div className="d-flex justify-content-around pt-1">
          <CardTitle> Policy Usage </CardTitle>
          <CardSubtitle className="mt-0">
            {selectedCat && (
              <span className="ml-5 mr-2"> {selectedCat?.schemeName}</span>
            )}
          </CardSubtitle>
        </div>
      </CardHeader>
      <CardBody className="pb-0">
        <ReactApexChart
          options={options?.options}
          series={options?.series}
          type="bar"
          height={255}
        />
      </CardBody>
    </Card>
  );
};
export default Policies;
