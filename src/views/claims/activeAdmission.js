// ** React Imports
// ** Custom Components
import Avatar from "@components/avatar";
import Timeline from "@components/timeline";
import { useRTL } from "@hooks/useRTL";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { useContext, useEffect, useState } from "react";
import { Download, Folder, Info, MapPin, MoreVertical } from "react-feather";
// ** Third Party Components
import {
  Badge,
  Button,
  Col,
  CustomInput,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
  Row,
} from "reactstrap";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import InvoiceList from "../apps/invoice/list";
import ApexBarChart from "../charts/apex/ApexBarChart";
import ApexScatterCharts from "../charts/apex/ApexScatterCharts";
// ** Store & Actions
import FilterPanel from "./filterPanel";
import ClaimsGrid from "./claimsGrid";
import { apiConfig } from "../../@core/api/serviceConfig";
import { enumNumberMember } from "@babel/types";
import { trackPromise } from "react-promise-tracker";

const ActiveAdmission = () => {
  const [isRtl, setIsRtl] = useRTL();

  // ** Theme Colors
  const { colors } = useContext(ThemeColors);

  const [activeAdmissionData, setActiveAdmissionData] = useState([]);
  const [monthwiseData, setMonthwiseData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);

  const [filter, setFilter] = useState({
    memberShipNo: "",
    employeeCode: "",
    memberName: "",
    policyNo: "",
  });

  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary",
      ],
      color = states[stateNum];

    if (row?.avatar?.length) {
      return (
        <Avatar className="mr-50" img={row.avatar} width="32" height="32" />
      );
    } else {
      return (
        <Avatar
          color={color}
          className="mr-50"
          content={row.client ? row.client.name : "John Doe"}
          initials
        />
      );
    }
  };

  // const [monthClaimCategories, setMonthClaimCategories] = useState([]);
  // const [inputSeries, setInputSeries] = useState([]);

  useEffect(() => {
    trackPromise(
      apiConfig.post("/dashboardclaimmonthwise").then((result) => {
        result && setMonthwiseData(result);
      })
    );

    // apiConfig.post('/dashboardclaimmonthwise', undefined, undefined, { insuranceID: 'insuranceId' }).then(data => {
    //   console.log('--claims', data);
    //   const formattedData = data.map(x => {
    //     return { ...x, month: Number(x.monthNo) }
    //   }).sort((a, b) => {
    //     return b.month - a.month
    //   });

    //   setMonthClaimCategories(formattedData.map(e => e.monthName));
    //   setInputSeries([{
    //     data: formattedData.map(e => {
    //       return Number(e.claimAmount.replace(/,/g, ''));
    //     })
    //   }])
    // })
  }, []);

  useEffect(() => {
    trackPromise(
      apiConfig
        .post("/activeAdmission", {
          ...filter,
          pageNo: currentPage - 1,
          pageSize: rowPerPage,
        })
        .then((data) => {
          if (data) {
            data[0]?.then((result) => {
              setActiveAdmissionData(result);
            });
            setTotalPages(data[1]);
          }
        })
        .catch(() => {
          setActiveAdmissionData([]);
        })
    );
  }, [filter, currentPage, rowPerPage]);

  const series = [
    {
      name: "Life Cover Claims",
      data: [
        [14, 170],
        [15, 100],
        [16, 170],
        [17, 170],
        [18, 140],
        [19, 150],
        [20, 120],
        [21, 170],
        [22, 230],
        [23, 130],
        [24, 130],
      ],
    },
    {
      name: "Health Cover Claims",
      data: [
        [14, 220],
        [15, 280],
        [16, 230],
        [17, 280],
        [18, 320],
        [19, 250],
        [20, 350],
        [21, 280],
        [22, 300],
        [23, 120],
        [24, 320],
      ],
    },
  ];

  const onFilterChange = (filters) => {
    setCurrentPage(1);
    setRowPerPage(10);
    setFilter({ ...filters });
    // trackPromise(
    //   apiConfig
    //     .post("/activeAdmission", { ...filters, pageNo: 0, pageSize: 10 })
    //     .then((data) => {
    //       if (data) {
    //         data[0]?.then((result) => {
    //           setActiveAdmissionData(result);
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       setActiveAdmissionData([]);
    //     })
    // );
  };

  const getMonthwiseNumber = () => {
    return [{ data: monthwiseData?.map((m) => m.noOfClaim) }];
  };

  const getMonthwiseAmount = () => {
    return [
      {
        data: monthwiseData?.map((m) =>
          Number(m.claimAmount.replace(/,/g, ""))
        ),
      },
    ];
  };

  const getMonths = () => monthwiseData?.map((m) => m.monthName);

  const updatePageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateRowData = (numberOfRow) => {
    setRowPerPage(numberOfRow);
    setCurrentPage(1);
  };

  return (
    <div>
      <FilterPanel onFilterChange={onFilterChange}></FilterPanel>
      <Row>
        <Col sm="12">
          <ClaimsGrid
            data={activeAdmissionData}
            title="Active Admission"
            updatePageNumber={updatePageNumber}
            updateRowData={updateRowData}
            totalCount={totalPages}
          />
        </Col>

        <Col sm="12" lg="6">
          <ApexBarChart
            inputSeries={getMonthwiseNumber()}
            height={390}
            categories={getMonths()}
            direction={isRtl ? "rtl" : "ltr"}
            title="Overall Claim Count"
            info={colors.info.main}
          />

          {/* <ApexScatterCharts
            propsSeries={series}
            direction={isRtl ? "rtl" : "ltr"}
            primary={colors.primary.main}
            success={colors.success.main}
            warning={colors.warning.main}
          /> */}
        </Col>
        <Col xs="12" lg="6">
          <ApexBarChart
            inputSeries={getMonthwiseAmount()}
            height={390}
            categories={getMonths()}
            direction={isRtl ? "rtl" : "ltr"}
            title="Overall Claim Cost"
            info={colors.info.main}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ActiveAdmission;
