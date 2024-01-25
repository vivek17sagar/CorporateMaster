import { ThemeColors } from "@src/utility/context/ThemeColors";
import { Fragment, useContext, useState } from "react";
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
import Demographics2 from "./demographics2";
import Demographics3 from "./demographics3";
import Demographics1 from "./demographics1";
import { useParams } from "react-router-dom";
import "@styles/react/libs/tables/react-dataTable-component.scss";
const Demographics = () => {
  const { colors } = useContext(ThemeColors);
  const colorOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
    { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
    { value: "red", label: "Red", color: "#FF5630", isFixed: false },
    { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
    { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
  ];

  const { pageNumber } = useParams();
  const [page, setPage] = useState(pageNumber || 1);

  const getComponent = () => {
    switch (page) {
      case 1:
        return <Demographics1 colors={colors}></Demographics1>;
      case 2:
        return <Demographics2></Demographics2>;
      case 3:
        return <Demographics3></Demographics3>;
    }
  };

  return (
    <div className="col-12">
      <Card>
        {/* <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader> */}
        <CardBody>
          {/* <Row>
                        <Col xs='6' className='p-0'>
                            <Col xs='5'>

                                <Label>Policies</Label>
                                <Select
                                    isClearable={false}
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
                        </Col>
                        <Col> */}
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

export default Demographics;
