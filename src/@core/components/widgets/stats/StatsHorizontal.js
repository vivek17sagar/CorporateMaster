// ** Third Party Components
import PropTypes from "prop-types";
import { useState } from "react";
import { Card, CardBody } from "reactstrap";

const StatsHorizontal = ({
  changeSelectedCardColor,
  handleClickOnComponent,
  icon,
  bgColor,
  color,
  stats,
  statTitle,
  className,
  ...rest
}) => {
  return (
    <Card
      className="cursor-pointer"
      style={{
        transition: "all 0.5s ease-in-out",
        backgroundColor: changeSelectedCardColor === statTitle && "#7b6ff1",
        color: changeSelectedCardColor === statTitle && "#fff",
        boxShadow:
          changeSelectedCardColor === statTitle && "0 8px 16px #00000029",
      }}
      onClick={() => handleClickOnComponent(statTitle)}
    >
      <CardBody className={className}>
        <div className="stats-horizontal d-flex justify-content-between align-items-center">
          <div>
            <h2
              className="font-weight-bolder mb-0"
              style={{ color: changeSelectedCardColor === statTitle && "#fff" }}
            >
              {stats}
            </h2>
            <p className="card-text">{statTitle}</p>
          </div>
          <div
            className={`avatar avatar-stats p-50 m-0 ${
              bgColor
                ? bgColor
                : color
                ? `bg-light-${color}`
                : "bg-light-primary"
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsHorizontal;

// ** PropTypes
StatsHorizontal.propTypes = {
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  stats: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
};
