import Avatar from "@components/avatar";
import { useRTL } from "@hooks/useRTL";
import Timeline from "@components/timeline";
import { Fragment, useState } from "react";
import { Download, Folder, Info, MapPin } from "react-feather";
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
import Table from "../apps/user/list/Table";

const ClaimsGrid = (props) => {
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

    return (
      <Avatar
        color={color || "primary"}
        className="mr-1"
        content={row.memberName}
        initials
      />
    );
  };

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isClaimStatusOpen, setClaimStatusOpen] = useState(false);

  const activeAdmissionData = [
    {
      empName: "Rahul Saxena",
      hospitalName: "All India Institue of Medical Science",
      hospitalAddress: "Grant Road, Mumbai - 400000",
      designation: "Manager",
      admissionDate: "20 Jan 2021",
      estDischargeDate: "24 Jan 2021",
      reason: "Cardiac Arrest",
      status: "Issued",
    },
    {
      empName: "Nikhil D",
      hospitalName: "Chritian Medical College",
      hospitalAddress: "Charni Road, Mumbai - 400000",
      designation: "Tax Consultant",
      admissionDate: "5 Jan 2021",
      estDischargeDate: "10 Jan 2021",
      reason: "Fever",
      status: "Issued",
    },
    {
      empName: "Anjali Saxena",
      hospitalName: "Tata Memorial Hospital",
      hospitalAddress: "Manpada Road, Mumbai-400000",
      designation: "Designer",
      admissionDate: "10 Jan 2021",
      estDischargeDate: "15 Jan 2021",
      reason: "Malaria",
      status: "In-process",
    },
    {
      empName: "Vishal Singh",
      hospitalName: "Lilavati Hospital",
      hospitalAddress: "Manpada Road, Mumbai - 400000",
      designation: "Developer",
      admissionDate: "20 Jan 2021",
      estDischargeDate: "22 Jan 2021",
      reason: "Jaundice",
      status: "Issued",
    },
    {
      empName: "Nikhil D",
      hospitalName: "Chritian Medical College",
      hospitalAddress: "Manpada Road, Mumbai - 400000",
      designation: "Senior Manager",
      admissionDate: "5 Jan 2021",
      estDischargeDate: "10 Jan 2021",
      reason: "Fever",
      status: "Issued",
    },
    {
      empName: "Anjali Saxena",
      hospitalName: "Tata Memorial Hospital",
      hospitalAddress: "Manpada Road, Mumbai-400000",
      designation: "Developer",
      admissionDate: "10 Jan 2021",
      estDischargeDate: "15 Jan 2021",
      reason: "Malaria",
      status: "Issued",
    },
  ];

  const columns = [
    // {name: 'MEMBER CODE', selector: 'memberCode', minWidth: '100px'},
    {
      name: "MEMBER NAME",
      selector: "memberName",
      sortable: true,
      minWidth: "200px",
      // cell: row => (
      //     <div className='d-flex justify-content-left align-items-center'>
      //         {renderClient(row)}
      //         <div className='d-flex flex-column'>
      //             <Link
      //                 to={`/employees/profile/${row.memberCode}`}
      //                 className='user-name text-truncate mb-0 text-underline'
      //             >
      //                 <span className='font-weight-bold'>{row.memberName}</span>
      //             </Link>
      //             {/* <small className='text-truncate text-muted mb-0'>@{row.username}</small> */}
      //         </div>
      //     </div>
      // )
    },
    {
      name: "PROVIDER NAME",
      sortable: true,
      minWidth: "250px",
      selector: "providerName",
      // cell: (row) => {
      //     const mapPin = {
      //         color: 'red'
      //     }
      //     return (
      //         <div>
      //             <div>
      //                 <a className='font-small-2 font-weight-bold text-underline'>{row.providerName}</a>
      //             </div>
      //             {/* <div>
      //                 <MapPin style={mapPin} size={15} />
      //                 <span className='font-small-1'> {row.hospitalAddress}</span>
      //             </div> */}

      //         </div>
      //     )
      // }
    },
    // {
    //     name: 'DESIGNATION',
    //     selector: 'designation',
    //     sortable: true,
    //     minWidth: '150px'
    // },
    {
      name: "ADMISSION DATE",
      selector: "admisionDate",
      sortable: true,
      minWidth: "170px",
    },
    {
      name: "ESTIMATED DISCHARGE DATE",
      selector: "expecteddischargDate",
      sortable: true,
      minWidth: "230px",
    },
    {
      name: "ICD CODE",
      selector: "icdCode",
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "STATUS",
      selector: "status",
      // sortable: true,
      minWidth: "200px",
    },
  ];
  // [
  //     {
  //         name: 'EMPLOYEE NAME',
  //         selector: 'empName',
  //         sortable: true,
  //         minWidth: '300px',
  //         cell: (row) => {
  //             return (
  //                 <div className='d-flex justify-content-left align-items-center'>
  //                     {renderClient(row)}
  //                     <div className='d-flex flex-column'>
  //                         <span className='font-weight-bold'>{row.memberName}</span>
  //                         {/* <small className='text-truncate text-muted mb-0'>@{row.username}</small> */}
  //                     </div>
  //                 </div>
  //             )
  //         }
  //     },
  //     {
  //         name: 'HOSPITAL NAME',
  //         sortable: true,
  //         minWidth: '250px',
  //         cell: (row) => {
  //             const mapPin = {
  //                 color: 'red'
  //             }
  //             return (
  //                 <div>
  //                     <div>
  //                         <a className='font-small-2 font-weight-bold text-underline'>{row.providerName}</a>
  //                     </div>
  //                     {/* <div>
  //                         <MapPin style={mapPin} size={15} />
  //                         <span className='font-small-1'> {row.hospitalAddress}</span>
  //                     </div> */}

  //                 </div>
  //             )
  //         }
  //     },
  //     // { name: 'DESIGNATION', selector: 'designation', sortable: true },
  //     { name: 'ADMISSION DATE', selector: 'admisionDate', sortable: true },
  //     { name: 'ESTIMATED DISCHARGE DATE', selector: 'expecteddischargDate', sortable: true },
  //     { name: 'REASON OF ADMISSION', selector: 'diagnosisName', sortable: true },
  //     {
  //         name: 'STATUS',
  //         sortable: true,
  //         minWidth: '50px',
  //         selector: '',
  //         sortable: true,
  //         cell: row => (
  //             <div className='pl-1'>
  //                 {/* <Info size={17} className='cursor-pointer' onClick={() => setClaimStatusOpen(true)} /> */}
  //                 {row.status}
  //             </div>
  //         )
  //     },
  //     {
  //         name: 'CLAIM FORM',
  //         selector: 'claimForm',
  //         minWidth: '50px',
  //         cell: row => (
  //             <div className='pl-1'>
  //                 <Download size={17} className='cursor-pointer' />
  //             </div>
  //         )
  //     },
  //     {
  //         name: 'CLAIMS DOCUMENT',
  //         // {
  //         //   name: '#',
  //         //   minWidth: '107px',
  //         //   selector: 'id',
  //         //   cell: row => <Link to={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Link>
  //         // },
  //         minWidth: '50px',
  //         selector: '',
  //         sortable: true,
  //         cell: row => (
  //             <div className='pl-1'>
  //                 <Folder size={17} className='cursor-pointer' onClick={() => setIsDocModalOpen(true)} />
  //             </div>
  //         )
  //     }
  // ]

  // if (!props.isPastClaim) {

  //     columns.splice(8, 0, {
  //         name: 'PRE-AUTH',
  //         selector: 'preAuth',
  //         cell: row => (

  //             <Badge className='col-9' color={row.status === 'Approved' ? 'success' : 'danger'} >
  //                 {row.status}
  //             </Badge>
  //         )
  //     })
  // }

  const timelineData = [
    {
      title: "Form Submitted",
      content: "Lorem Ipsum is simply dummy text of the printing",
      meta: "5 days ago",
    },
    {
      title: "Received to Insurance comapny",
      content: "Lorem Ipsum is simply dummy text of the printing",
      meta: "4 days ago",
    },
    {
      title: "Reviewing",
      content: "Lorem Ipsum is simply dummy text of the printing",
      meta: "3 days ago",
    },
    {
      title: "Document Analysis",
      content: "Lorem Ipsum is simply dummy text of the printing",
      meta: "2 days ago",
    },
    {
      title: "Decision Pending",
      content: "Lorem Ipsum is simply dummy text of the printing",
      meta: "1 days ago",
    },
  ];

  return (
    <Fragment>
      <Table
        label={props.title}
        hideAddButton={true}
        showFilter={false}
        data={props?.data}
        columns={columns}
        totalCount={props?.totalCount}
        updatePageNumber={props?.updatePageNumber}
        updateRowData={props?.updateRowData}
      />
      <Modal isOpen={isDocModalOpen}>
        <ModalHeader toggle={() => setIsDocModalOpen(false)}>
          Documents Required
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="exampleCustomFileBrowser1">Document 1</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser1"
                  name="customFile"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="exampleCustomFileBrowser2">Document 2</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser2"
                  name="customFile"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="exampleCustomFileBrowser3">Document 3</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser3"
                  name="customFile"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="exampleCustomFileBrowser4">Document 4</Label>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser4"
                  name="customFile"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="justify-content-start">
          <Button color="primary" onClick={() => setIsDocModalOpen(false)}>
            {" "}
            Cancel
          </Button>
          <Button color="primary" onClick={() => setIsDocModalOpen(false)}>
            {" "}
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isClaimStatusOpen}>
        <ModalHeader toggle={() => setClaimStatusOpen(false)}>
          Claim Status
        </ModalHeader>
        <ModalBody>
          <Timeline data={timelineData} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
export default ClaimsGrid;
