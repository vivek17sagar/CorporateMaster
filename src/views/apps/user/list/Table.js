import classnames from "classnames"; // ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Columns
import { columns } from "./columns";

// ** Store & Actions
import { getAllData, getData } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { selectThemeColors } from "@utils";
import {
  FormGroup,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { handleFilterTabs } from "../../../../redux/actions/handleFilter";

// ** Table Header
const CustomHeader = ({
  addMargin,
  hideSearchOption,
  hideAddButton,
  addButtonLabel,
  addHandler,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  return (
    <div
      className={classnames(
        "invoice-list-table-header w-100 mr-1 ml-50 mb-75",
        {
          "mt-1": addMargin,
        }
      )}
    >
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Show</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: "5rem",
                padding: "0 0.8rem",
                backgroundPosition:
                  "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0",
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          {hideSearchOption !== true && false && (
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Search:
              </Label>
              <Input
                id="search-invoice"
                className="ml-50 w-100"
                type="text"
                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>
          )}
          {/* {hideAddButton !== true && <Button.Ripple color='primary' onClick={addHandler}>
            {addButtonLabel || 'Add Employee'}
          </Button.Ripple>
          } */}
        </Col>
      </Row>
    </div>
  );
};

const UsersList = (props, ref) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);

  const filterValueFromStore = useSelector(
    (state) => state?.filter?.filterChange
  );

  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (filterValueFromStore) {
      // setCurrentPage(1);
      setRowsPerPage(10);
    }
  }, [filterValueFromStore]);

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const onPageChange = (page) => {
    if (props.handlePagination) {
      props.handlePagination({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchTerm,
      });
    }

    if (props?.updatePageNumber) {
      props?.updatePageNumber(page.selected + 1);
    }

    // setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e?.currentTarget?.value);

    // setCurrentPage(1);
    setRowsPerPage(value);

    if (props?.handlePagination) {
      props.handlePagination({
        page: 1,
        perPage: value,
        q: searchTerm,
      });
    } else if (props?.updateRowData) {
      props?.updateRowData(value);
    }
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(handleFilterTabs(false));
  };

  const getFilteredData = (data) => {
    if (searchTerm.trim() === "") {
      return data;
    }

    return data.filter((row) => {
      return JSON.stringify(row)
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
    });
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(props?.totalCount / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={props?.pageNo !== 0 ? props.pageNo - 1 : 0}
        onPageChange={(page) => onPageChange(page)}
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
    );
  };

  // ** Table data to render
  // const dataToRender = () => {
  //   debugger
  //   console.log('----asdasdas-',props.data)
  //   const filters = {
  //     role: currentScheme.value,
  //     currentPlan: currentPlan.value,
  //     status: currentStatus.value,
  //     q: searchTerm
  //   }

  //   const isFiltered = Object.keys(filters).some(function (k) {
  //     return filters[k].length > 0
  //   })

  //   if (store.data.length > 0) {
  //     return store.data
  //   } else if (store.data.length === 0 && isFiltered) {
  //     return []
  //   } else {
  //     return store.allData.slice(0, rowsPerPage)
  //   }
  // }

  return (
    <Fragment>
      {/* {props.showFilter === false ? <Fragment></Fragment> : <Card>
        <CardHeader>
          <CardTitle tag='h4'>Search Filter</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <FormGroup>
                <Label>Employee Name</Label>
                <Input name='name' value={name}/>
              </FormGroup>
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <FormGroup>
                <Label>Select Plan</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={props.plans}
                  value={currentPlan}
                  onChange={data => {
                    setCurrentPlan(data)
                    props.handlePlanChange(data);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md='4'>
              <FormGroup>
                <Label>Schemes</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={props.schemes}
                  value={currentScheme}
                  onChange={data => {
                    setCurrentScheme(data)
                    setCurrentPage(0);
                    props.handleSchemeChange({
                      page: 1,
                      perPage: rowsPerPage,
                      scheme: currentScheme.value,
                      currentPlan: currentPlan.value,
                      name: data.value,
                      q: searchTerm
                    })
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      } */}

      <Card>
        <DataTable
          title={
            props.label || props.headerComponent ? (
              <Fragment>
                {props.label && (
                  <CardHeader>
                    <CardTitle>{props.label}</CardTitle>
                  </CardHeader>
                )}
                {props.headerComponent && (
                  <Fragment>{props.headerComponent}</Fragment>
                )}
              </Fragment>
            ) : null
          }
          noHeader={!(props.label || props.headerComponent)}
          pagination
          paginationServer
          subHeader
          responsive
          columns={props.columns || columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={(props.data && getFilteredData(props.data)) || []}
          subHeaderComponent={
            <CustomHeader
              addMargin={!props.label || props.headerComponent}
              hideSearchOption={props.hideSearchOption || false}
              hideAddButton={props.hideAddButton || false}
              addButtonLabel={props.addButtonLabel}
              addHandler={props.addHandler || toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default UsersList;
