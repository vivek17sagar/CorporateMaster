import { Fragment, useState } from "react";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import ClaimAnalysis1 from "./claimAnalysis1";
import ClaimAnalysis2 from "./claimAnalysis2";
import ClaimAnalysis3 from "./claimAnalysis3";
import ClaimAnalysis4 from "./claimAnalysis4";

const ClaimAnalysis = () => {
  const colorOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
    { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
    { value: "red", label: "Red", color: "#FF5630", isFixed: false },
    { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
    { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
  ];

  const [page, setPage] = useState(1);

  const getComponent = () => {
    switch (page) {
      case 1:
        return <ClaimAnalysis1></ClaimAnalysis1>;
      case 2:
        return <ClaimAnalysis3></ClaimAnalysis3>;
      case 3:
        return <ClaimAnalysis4></ClaimAnalysis4>;
      // case 4:
      // return <ClaimAnalysis2></ClaimAnalysis2>
    }
  };

  return (
    <div className="col-12">
      <Card>
        {/* <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader> */}
        <CardBody>
          {/* <Row> */}
          {/* <Col xs='6'>
                            <Col xs='5'>

                                <Label>Policies</Label>
                                <Select className='react-select' classNamePrefix='select'                                    isClearable={false}
                                    // value={fixedValue}
                                    // styles={styles}
                                    // isMulti
                                    // onChange={fixedOnChange}
                                    // theme={selectThemeColors}
                                    name='colors'
                                    className='react-select'
                                    classNamePrefix='select'
                                    // options={colorOptions}
                                />
                            </Col>
                        </Col> */}
          {/* <Col> */}
          <ReactPaginate
            onPageChange={(page) => setPage(page.selected + 1)}
            pageCount={3}
            nextLabel={""}
            breakLabel={"..."}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            activeClassName={"active"}
            pageClassName={"page-item"}
            previousLabel={""}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next-item"}
            previousClassName={"page-item prev-item"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            containerClassName={
              "pagination react-paginate no-navigation float-right"
            }
          />
          {/* </Col>
                    </Row> */}
        </CardBody>
      </Card>

      <Fragment>{getComponent()}</Fragment>
    </div>
  );
};

export default ClaimAnalysis;
