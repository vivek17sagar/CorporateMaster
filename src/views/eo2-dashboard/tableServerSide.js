// ** React Imports
import { Fragment, useState, useEffect, memo } from "react";

// ** Table Columns
import { serverSideColumns } from "./table_data";

// ** Store & Actions
import { getData } from "./table_actions";
import { useSelector, useDispatch } from "react-redux";
import { fill } from "lodash";
// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ArrowRight, ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

const DataTableServerSide = ({ label }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.dataTables);

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState("");

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
  }, [dispatch]);

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value);

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    );
  };

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    // const count = Number((store.total / rowsPerPage).toFixed(0))
    const count = Number((50 / (rowsPerPage || 1)).toFixed(0));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        id: i + 1,
        empName: "Rahul Saxena",
        hospitalName: "All India Institute of Medical Science",
        hospitalAddress: "Grand Road, Mumbai - 400000",
        designation: "Manager",
        admissionDate: "20-JAN-2021",
        estDischargeDate: "24-JAN-2021",
        admissionReason: "Cardiac Arrest",
        avatar: "",
      });
    }

    return data?.slice(0, rowsPerPage);
    // const filters = {
    //   q: searchValue
    // }

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0
    // })

    // if (store.data.length > 0) {
    //   return store.data
    // } else if (store.data.length === 0 && isFiltered) {
    //   return []
    // } else {
    //   return store.allData.slice(0, rowsPerPage)
    // }
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{label}</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex align-items-center">
              <Label for="sort-select">Show</Label>
              <Col xs="2">
                <Input
                  className="dataTable-select"
                  type="number"
                  id="sort-select"
                  value={rowsPerPage}
                  onChange={(e) => handlePerPage(e)}
                />
                {/* <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={75}>75</option>
                  <option value={100}>100</option> */}
                {/* </Input> */}
              </Col>
              <Label for="sort-select">Entries</Label>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            {/* <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            /> */}
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          className="react-dataTable"
          columns={serverSideColumns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={dataToRender()}
        />
      </Card>
    </Fragment>
  );
};

export default memo(DataTableServerSide);
