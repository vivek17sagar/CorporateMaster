import maleIcon from "@src/assets/images/icons/male.png";
import femaleIcon from "@src/assets/images/icons/female.png";
import Chart from "react-apexcharts";
import { User, Users } from "react-feather";
import { Card } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

export const PolicyTiles = ({
  heading,
  maleCount,
  femaleCount,
  color1,
  color2,
}) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    labels: ["Male", "Female"],
    stroke: { width: 0, show: true, curve: "smooth" },
    colors: [color1, color2],
    fill: { colors: [color1, color2] },
    grid: {
      padding: {
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        donut: {
          size: "80%",
          labels: {
            show: false,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
  };

  return (
    <div className="d-flex align-items-center">
      <div>
        <span className="card-text font-small-2 mb-50">{heading}</span>
        <div>
          <span className="mr-25" style={{ color: color1 }}>
            <svg
              fill={color1}
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="18"
              viewBox="0 0 13.5 36"
            >
              <path
                id="Icon_awesome-male"
                data-name="Icon awesome-male"
                d="M6.75,0a4.5,4.5,0,1,1-4.5,4.5A4.5,4.5,0,0,1,6.75,0m3.375,10.125h-.8a6.179,6.179,0,0,1-5.153,0h-.8A3.375,3.375,0,0,0,0,13.5v9.563A1.687,1.687,0,0,0,1.688,24.75H2.813v9.563A1.687,1.687,0,0,0,4.5,36H9a1.687,1.687,0,0,0,1.688-1.687V24.75h1.125A1.687,1.687,0,0,0,13.5,23.063V13.5A3.375,3.375,0,0,0,10.125,10.125Z"
              />
            </svg>

            <span className="pl-25">{maleCount}</span>
          </span>
          <span style={{ color: color2 }}>
            <svg
              fill={color2}
              xmlns="http://www.w3.org/2000/svg"
              width="8.4"
              height="18"
              viewBox="0 0 16.875 36"
            >
              <path
                id="Icon_awesome-female"
                data-name="Icon awesome-female"
                d="M9,0A4.5,4.5,0,1,1,4.5,4.5,4.5,4.5,0,0,1,9,0m8.387,24.9L14.012,11.4a1.687,1.687,0,0,0-1.637-1.278h-.8a6.179,6.179,0,0,1-5.153,0h-.8A1.687,1.687,0,0,0,3.988,11.4L.613,24.9A1.688,1.688,0,0,0,2.25,27H6.188v7.313A1.687,1.687,0,0,0,7.875,36h2.25a1.687,1.687,0,0,0,1.688-1.687V27H15.75A1.688,1.688,0,0,0,17.387,24.9Z"
                transform="translate(-0.563)"
              />
            </svg>
            <span className="pl-25">{femaleCount}</span>
          </span>
        </div>
      </div>
      <div>
        <Chart
          className="pt-1"
          options={options}
          series={[maleCount, femaleCount]}
          type="donut"
          height={50}
          width={50}
        />
      </div>
    </div>
  );
};
