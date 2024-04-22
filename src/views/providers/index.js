import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import dashboard from "@src/assets/images/icons/dashboard.png";
import hospital from "@src/assets/images/icons/hospital.png";
import labs from "@src/assets/images/icons/labs.png";
import providersIcon from "@src/assets/images/icons/providerStats.png";
import used from "@src/assets/images/icons/used.png";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useEffect, useState } from "react";
import { MapPin } from "react-feather";
import { Link } from "react-router-dom";
// ** Third Party Components
import Select from "react-select";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import Table from "../apps/user/list/Table";
import { apiConfig } from "../../@core/api/serviceConfig";
import classnames from "classnames";
import { trackPromise } from "react-promise-tracker";
import { noop } from "lodash";
import location_1 from "../../assets/images/svg/location_1.png";
import call from "../../assets/images/svg/call.png";
import email from "../../assets/images/svg/email.png";
import MainPaginationComponent from "./pagination";
import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";

import clinic from "../../assets/images/icons/clinic.jpg";
import doctor from "../../assets/images/icons/doctor.jpg";
import pharmacy from "../../assets/images/icons/pharmacy.jpg";

import others from "../../assets/images/icons/others.jpg";
import ReactPaginate from "react-paginate";
const CardComponent = ({ data }) => {
  return data.map((obj) => {
    return (
      <Card
        className="shadow-lg provider_individual_card"
        key={obj?.providerName}
        style={{
          width: "500px",
          height: "250px",
          borderRadius: "1.375rem",
        }}
      >
        <section style={{ width: "100%", height: "100%" }}>
          {/* Section - 1 / Provider  Name */}
          <div
            className="provider_card_details_section_1"
            style={{
              width: "100%",
              borderBottom: "1px solid lightgrey",
              padding: "15px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#7b6ff1",
            }}
          >
            {obj?.providerName}
          </div>

          {/* Section - 2 / Details */}

          <div
            className="provider_card_details_section_2"
            style={{
              height: "60%",
              display: "grid",
              borderBottom: "1px solid lightgray",
              gridTemplateColumns: "1fr 1fr",
              justifyItems: "center",
              width: "100%",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {" "}
                {obj?.providerCity}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <img src={call} alt="contact" /> {obj?.providerContactNo}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {" "}
                <img src={location_1} alt="location" />
                {obj?.providerLocation}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {" "}
                <img src={email} alt="email" />
                {obj?.providerEmail}
              </span>
            </div>
          </div>
        </section>
      </Card>
    );
  });
};

const Providers = () => {
  const [statsData, setStatsData] = useState({
    activeProviderCount: 0,
    blacklistedProviderCount: 0,
    hospitalProviderCount: 0,
    labProviderCount: 0,
    clinicProviderCount: 0,
    doctorProviderCount: 0,
    otherProviderCount: 0,
    pharmacyProviderCount: 0,
  });
  const [deafultProviderNameValue, setDefaultProviderNameValue] = useState({
    providerName: "",
    countyName: "",
    cityName: "",
  });
  const [finalSearchValues, setFinalSearchValues] = useState(null);
  const [location, setLocation] = useState([]);
  // const [providerTypes, setProviderTypes] = useState([]);
  const netwrokOptions = [
    { label: "Network", value: "N" },
    { label: "Non Network", value: "NN" },
  ];

  const [providerData, setProviderData] = useState([]);
  // { hospitalName: 'All India Institue of Medical Science', hospitalAddress: 'Grant Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '06', activeCases: '02' },
  // { hospitalName: 'Chritian Medical College', hospitalAddress: 'Chami Road, Mumbai - 400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '03', activeCases: '01' },
  // { hospitalName: 'Lal Pathology', hospitalAddress: 'Manpado Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Laboratory', caseTillDate: '05', activeCases: '02' },
  // { hospitalName: 'Lilavati Hospital', hospitalAddress: 'Manpada Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital.', caseTillDate: '0', activeCases: '0' },
  // { hospitalName: 'Chritian Medical College', hospitalAddress: 'Manpada Road, Mumbai-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'In-Network', providerType: 'Hospital', caseTillDate: '0', activeCases: '0' },
  // { hospitalName: 'Care Bloodbank', hospitalAddress: 'Manpada Road, Mumbal-400000', schedule: 'Open 24 Hrs', contact: '+91 213657895', network: 'Out-Network', providerType: 'Blood Bank', caseTillDate: '0', activeCases: '0' }

  const providerColumns = [
    {
      name: "HOSPITAL NAME",
      sortable: true,
      minWidth: "300px",
      cell: (row) => {
        const mapPin = {
          color: "red",
        };
        return (
          <div>
            <div>
              <span className="font-small-2 font-weight-bold ">
                {row.providerName}
              </span>
            </div>
            <div>
              <MapPin style={mapPin} size={15} />
              <span className="font-small-1">
                {" "}
                {row.providerLocation}, {row.providerCity}
              </span>
            </div>
          </div>
        );
      },
    },
    // { name: 'SCHEDULE', selector: 'schedule', sortable: false },
    { name: "CONTACT", selector: "providerContactNo", sortable: false },
    {
      name: "NETWORK",
      sortable: false,
      cell: (row) => {
        return (
          <Badge
            className="col-9 text-capitalize"
            color={row.empanelled === "NETWORK" ? "success" : "danger"}
          >
            {row.empanelled}
          </Badge>
        );
      },
    },
    { name: "PROVIDER TYPE", selector: "providerType", sortable: false },
    {
      name: "CASE TILL DATE",
      selector: "totalCases",
      sortable: false,
      center: true,
    },
    {
      name: "ACTIVE CASE",
      selector: "activeCases",
      sortable: false,
      center: true,
    },
  ];

  const [index, setIndex] = useState(0);

  const [selectedNetwork, setSelectedNetwork] = useState({
    label: "Network",
    value: "N",
  });
  const [selectedProviderType, setSelectedProviderType] = useState({
    value: "A",
  });

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCureentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);

  const [filterChange, setFilterChnage] = useState(false);
  const [changeSelectedCardColor, setSelectedCardColor] = useState("Providers");
  useEffect(() => {
    trackPromise(
      apiConfig.post("/providerdashboard").then((data) => {
        setStatsData(data);
      })
    ).catch(noop);

    trackPromise(
      apiConfig
        .post("/populatecities", undefined, undefined, { orgID: "insuranceId" })
        .then((data) => {
          setLocation(
            data
              ?.map((row) => row.cityName)
              ?.sort()
              ?.map((row) => {
                return {
                  label: row,
                  value: row,
                };
              })
          );
        })
    ).catch(noop);

    // trackPromise(
    //   apiConfig.post("/populateProviderType").then((data) => {
    //     setProviderTypes(
    //       data?.map((row) => {
    //         return {
    //           ...row,
    //           label: row.providerType,
    //           value: row.providerTypeID,
    //         };
    //       })
    //     );
    //   })
    // ).catch(noop);

    return () => {
      setStatsData({
        activeProviderCount: 0,
        blacklistedProviderCount: 0,
        hospitalProviderCount: 0,
        labProviderCount: 0,
        clinicProviderCount: 0,
        doctorProviderCount: 0,
        pharmacyProviderCount: 0,
      });
      setLocation([]);
      // setProviderTypes([]);
    };
  }, []);

  useEffect(() => {
    if (changeSelectedCardColor === "Blacklisted") {
      trackPromise(
        apiConfig
          .post("/blacklistProviderdetails", {
            pageNo: currentPage - 1,
            pageSize: pageSize,
            providerName: finalSearchValues?.providerName || "",
            countyName: finalSearchValues?.countyName || "",
            cityName: finalSearchValues?.cityName || "",
            providerTypeID: selectedProviderType?.value || "",
          })
          .then((data) => {
            if (data) {
              data[0]?.then((result) => {
                setProviderData(result);
              });
              setTotalPages(data[1]);
            } else {
              setProviderData([]);
            }
          })
          .catch(() => setProviderData([]))
      ).catch(noop);
    } else {
      trackPromise(
        apiConfig
          .post("/activeProviderdetails", {
            pageNo: pageNo,
            pageSize: perPage,
            providerName: finalSearchValues?.providerName || "",
            countyName: finalSearchValues?.countyName || "",
            cityName: finalSearchValues?.cityName || "",
            providerTypeID: selectedProviderType?.value || "",
          })
          .then((data) => {
            if (data) {
              data[0]?.then((result) => {
                setProviderData(result);
              });
              setTotalPages(data[1]);
            } else {
              setProviderData([]);
            }
          })
          .catch(() => setProviderData([]))
      ).catch(noop);
    }
  }, [selectedProviderType, currentPage, pageNo, finalSearchValues]);

  const updatePageNumber = (pageNumber) => {
    setCureentPage(pageNumber);
  };

  const updateRowData = (NumberOfRows) => {
    setPageSize(NumberOfRows);
    setCureentPage(1);
  };

  // const getProviders = () => {
  //     if (selectedNetwork && selectedLocation && selectedProviderType) {
  //         // apiConfig.post('/activeProviderDetails', {
  //         apiConfig.post('/activeProviderdetails', {
  //             pageNo: 0,
  //             pageSize: 10,
  //             providerCategory: selectedNetwork.value,
  //             providerTypeID: selectedProviderType.value,
  //             cityName: selectedLocation.value
  //         }).then(data => {
  //             setProviderData(data);
  //         })
  //     }
  // }

  const handleClickOnComponent = (dataFromComponent) => {
    const providerTypeID = (() => {
      switch (dataFromComponent) {
        case "Providers":
          return "A";

        case "Blacklisted":
          return "A";

        case "Hospitals":
          return "H";

        case "Diagnostics":
          return "L";

        case "Pharmacy":
          return "P";

        case "Clinic":
          return "C";

        case "Doctor":
          return "D";

        case "Others":
          return "O";
      }
    })();

    setSelectedCardColor(dataFromComponent);
    setSelectedProviderType({ value: providerTypeID });
    setProviderData([]);
    setCureentPage(1);
  };

  const handlePaginationBehaviour = (value) => {
    setCureentPage(value);
  };

  const handleInputSearch = (event, key) => {
    setDefaultProviderNameValue((prevobj) => {
      return {
        ...prevobj,
        [key]: event.target.value?.toUpperCase(),
      };
    });
  };


  const handlePagination = (data) => {
    console.log(data?.selected)
    // setPerPage(data?.perPage);
    setPageNo(data?.selected);
  };

  const handleSearchButton = () => {
    // Here we can set the Provider name
    setFinalSearchValues({ ...deafultProviderNameValue });
  };
  const handleRestButton = () => {
    // Here we can reset the Provider name
    setDefaultProviderNameValue({
      providerName: "",
      countyName: "",
      cityName: "",
    });
    setFinalSearchValues(null);

    const input = document.getElementById("searchInputProvider");
    input.focus();
  };
  const stats = [
    // 1
    <Col className="experiment" lg="2" sm="6" key={1}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={providersIcon} width="100%" />}
        color="primary"
        stats={statsData.activeProviderCount + ""}
        statTitle="Providers"
      />
    </Col>,

    // 2
    <Col className="experiment" lg="2" sm="6" key={2}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={used} height="35" width="35" />}
        color="success"
        stats={statsData.blacklistedProviderCount + ""}
        statTitle="Blacklisted"
      />
    </Col>,

    // 3
    <Col className="experiment" lg="2" sm="6" key={3}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={hospital} height="50" width="50" />}
        color="danger"
        stats={statsData.hospitalProviderCount + ""}
        statTitle="Hospitals"
      />
    </Col>,

    // 4
    <Col className="experiment" lg="2" sm="6" key={4}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={labs} height="35" width="35" />}
        color="success"
        stats={statsData.labProviderCount + ""}
        statTitle="Diagnostics"
      />
    </Col>,

    // 5
    <Col className="experiment" lg="2" sm="6" key={5}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={clinic} height="35" width="35" />}
        color="success"
        stats={statsData.clinicProviderCount + ""}
        statTitle="Clinic"
      />
    </Col>,

    // 6
    <Col className="experiment" lg="2" sm="6" key={6}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={doctor} height="35" width="35" />}
        color="success"
        stats={statsData?.doctorProviderCount + ""}
        statTitle="Doctor"
      />
    </Col>,

    // 7
    <Col className="experiment" lg="2" sm="6" key={7}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={pharmacy} height="35" width="35" />}
        color="success"
        stats={statsData?.pharmacyProviderCount + ""}
        statTitle="Pharmacy"
      />
    </Col>,

    // 8
    <Col className="experiment" lg="2" sm="6" key={8}>
      <StatsHorizontal
        changeSelectedCardColor={changeSelectedCardColor}
        handleClickOnComponent={handleClickOnComponent}
        icon={<img src={others} height="35" width="35" />}
        color="success"
        stats={
          statsData?.otherIndividualProviderCount +
          statsData?.otherProviderCount +
          ""
        }
        statTitle="Others"
      />
    </Col>,
  ];

  return (
    <div>
      <Row className="justify-content-between">
        <div className="d-flex justify-content-start">
          <div
            className="font-weight-bold px-1 py-50 mb-1"
            style={{ borderRight: "2px solid lightgrey" }}
          >
            Providers
          </div>
          <Breadcrumb className="pl-0 pb-1">
            <BreadcrumbItem tag="li">
              <Link to="/">
                <img src={dashboard} width="20" height="20" />
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem tag="li">Providers </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </Row>

      <Row
        className="search_Row"
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          left: "50px",
          padding: "10px 0px",
        }}
      >
        <Input
          id="searchInputProvider"
          placeholder="Enter Provider Name"
          style={{ width: "250px" }}
          value={deafultProviderNameValue?.providerName}
          onChange={(e) => handleInputSearch(e, "providerName")}
        />

        <Input
          id="searchInputCounty"
          placeholder="Enter County Name"
          style={{ width: "250px" }}
          value={deafultProviderNameValue?.countyName}
          onChange={(e) => handleInputSearch(e, "countyName")}
        />
        <Input
          id="searchInputCity"
          placeholder="Enter City Name"
          style={{ width: "250px" }}
          value={deafultProviderNameValue?.cityName}
          onChange={(e) => handleInputSearch(e, "cityName")}
        />

        <button
          style={{
            outline: "none",
            border: "none",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "11px 21px",
            borderRadius: "0.358rem",
            backgroundColor: "#7b6ff1",
          }}
          onClick={handleSearchButton}
        >
          Search
        </button>
        <button
          style={{
            outline: "none",
            border: "none",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "11px 21px",
            borderRadius: "0.358rem",
            backgroundColor: "#625f6e",
          }}
          onClick={handleRestButton}
        >
          Reset
        </button>
      </Row>

      <Row
        className="provider_Stats"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          left: "35px",
        }}
      >
        {/* Stats With Icons Horizontal */}
        {stats?.slice(
          index,
          (index + 5) % stats?.length !== 0
            ? (index + 5) % stats?.length
            : stats?.length
        )}
        {/* Stats With Icons Horizontal */}

        <div
          className="mr-2"
          style={{
            marginBottom: "20px",
            width: "5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "150px",
          }}
        >
          {/* Previous Button */}
          <span
            className={classnames("cursor-pointer", index === 0 && "disabled")}
            onClick={() => setIndex(index - 1)}
            style={{
              fontSize: "24px",
              width: "50px",
              height: "50px",
              border: "1px solid #7b6ff1",
              borderRadius: "50px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <strong>&lt;</strong>
          </span>

          {/* Next Button */}
          <span
            className={classnames(
              "cursor-pointer pl-1",
              (index + 5) % stats?.length === 0 && "disabled"
            )}
            onClick={() => setIndex(index + 1)}
            style={{
              fontSize: "24px",
              width: "50px",
              height: "50px",
              border: "1px solid #7b6ff1",
              borderRadius: "50px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <strong>&gt;</strong>
          </span>
        </div>
      </Row>
      {/* Below Section Shows Details Related To The Clicked Card */}
      <Row
        style={{
          display: providerData?.length > 0 && "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          overflowY: "scroll",
          height: "500px",
          justifyItems: "center",
        }}
        className="ul_ResponsiveLayout_Component provider_card"
      >
        {providerData?.length > 0 ? (
          <CardComponent data={providerData} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Data Found
          </div>
        )}
      </Row>

      {providerData?.length > 0 && (
        <Row
          className="pagination_component"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
            right: "45px",
          }}
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel=" "
            activeClassName="active"
            onPageChange={handlePagination}
            // pageRangeDisplayed={1}
            pageCount={totalPages}
            // pageCount={pageCount}
            previousLabel=" "
            renderOnZeroPageCount={null}
            // onPageActive={currentPage}

            // previousLabel={""}
            // nextLabel={"next"}
            // pageRangeDisplayed={5}
            // pageCount={2}
            // activeClassName="active"
            // onPageChange={handlepage2} // Call the handlePageChange function when page changes
            // renderOnZeroPageCount={null}
            pageClassName={"page-item"}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            previousClassName={"page-item prev"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            containerClassName={
              "pagination react-paginate justify-content-end my-2 pr-1"
            }
          />
          {/* <MainPaginationComponent
            totalPages={totalPages}
            handlePaginationBehaviour={handlePaginationBehaviour}
            currentPage={currentPage}
          /> */}
        </Row>
      )}
      {/* <Card>
        <CardHeader>
          <CardTitle>Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Network</Label>
                <Select
                  options={netwrokOptions}
                  value={selectedNetwork}
                  onChange={(data) => {
                    setSelectedNetwork(data);

                    // getProviders()
                  }}
                  className="react-select"
                  classNamePrefix="select"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Location</Label>
                <Select
                  options={location}
                  value={selectedLocation}
                  onChange={(data) => {
                    setSelectedLocation(data);
                    setFilterChnage(true);
                    // getProviders()
                  }}
                  className="react-select"
                  classNamePrefix="select"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Provider Type</Label>
                <Select
                  options={providerTypes}
                  value={selectedProviderType}
                  onChange={(data) => {
                    setSelectedProviderType(data);
                    // getProviders()
                  }}
                  className="react-select"
                  classNamePrefix="select"
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      {/* <Row>
        <Col xs="12">
          <Table
            showFilter={false}
            data={providerData}
            columns={providerColumns}
            hideAddButton={true}
            updatePageNumber={updatePageNumber}
            updateRowData={updateRowData}
            totalCount={totalPages}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default Providers;
