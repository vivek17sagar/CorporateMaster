import "@styles/react/libs/tables/react-dataTable-component.scss";
import DataTable from "react-data-table-component";
import { ChevronDown, Download } from "react-feather";
import { Card, CardBody, CardTitle } from "reactstrap";
import CardHeader from "reactstrap/lib/CardHeader";

const ECardTable = () => {
  const eCardColumns = [
    { name: "E CARD NO ", selector: "ecardNo", sortable: false },
    { name: "EID", selector: "eid", sortable: false },
    { name: "EMPLOYEE NAME", selector: "eName", sortable: false },
    { name: "GENERATION DATE ", selector: "generationDate", sortable: false },
    {
      name: "ACTION",
      selector: "",
      sortable: false,
      cell: (row) => {
        return <Download />;
      },
    },
  ];

  const eCardData = [
    {
      ecardNo: "256477895423",
      eid: "TT01",
      eName: "Rahul Saxena",
      generationDate: "29 Jan 2021",
    },
    {
      ecardNo: "214578963545",
      eid: "TT02",
      eName: "Nikhil Singh",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "365478915648",
      eid: "TT03",
      eName: "Rekha Sharma",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "214578963545",
      eid: "TT02",
      eName: "Nikhil Singh",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "365478915648",
      eid: "TT03",
      eName: "Rekha Sharma",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "256477895423",
      eid: "TT01",
      eName: "Rahul Saxena",
      generationDate: "29 Jan 2021",
    },
    {
      ecardNo: "214578963545",
      eid: "TT02",
      eName: "Nikhil Singh",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "365478915648",
      eid: "TT03",
      eName: "Rekha Sharma",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "214578963545",
      eid: "TT02",
      eName: "Nikhil Singh",
      generationDate: "25 Jan 2021",
    },
    {
      ecardNo: "365478915648",
      eid: "TT03",
      eName: "Rekha Sharma",
      generationDate: "25 Jan 2021",
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>E Card Issued</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTable
            noHeader
            data={eCardData}
            columns={eCardColumns}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default ECardTable;
