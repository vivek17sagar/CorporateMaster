// ** React Imports
import { Link } from "react-router-dom";
import whatsappIcon from "@src/assets/images/icons/whatsapp.png";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { getUser, deleteUser } from "../store/action";
import { store } from "@store/storeConfig/store";

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Renders Client Columns
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

  if (row.avatar && row.avatar.length) {
    return <Avatar className="mr-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="mr-1"
        content={
          row.memberName
            ? row.memberName.split(" ")?.slice(-2).join(" ")
            : "Name"
        }
        initials
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      {/* <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} mr-50`} /> */}
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "MEMBER NAME",
    minWidth: "297px",
    selector: "fullName",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/employees/profile/${row.memberPolicyID}`}
            className="user-name text-truncate mb-0"
          >
            <span className="font-weight-bold">{row.memberName}</span>
          </Link>
          {/* <small className='text-truncate text-muted mb-0'>@{row.username}</small> */}
        </div>
      </div>
    ),
  },
  // {
  //   name: 'EMPLOYEE CODE',
  //   minWidth: '100px',
  //   cell: row => row.employeeCode
  // },
  {
    name: "PLAN Name",
    minWidth: "272px",
    sortable: true,
    selector: "plan",
  },
  {
    name: "MEMBER EMAIL",
    minWidth: "320px",
    selector: "email",
    sortable: true,
    cell: (row) => row.memberEmail,
  },
  {
    name: "PHONE NUMBER",
    minWidth: "172px",
    selector: "memberMobileNo",
    sortable: true,
  },
  {
    name: "MEMBER NUMBER",
    minWidth: "172px",
    sortable: true,
    selector: "memberNo",
  },
  // {
  //   name: 'POLICY CODE',
  //   minWidth: '172px',
  //   sortable: true,
  //   selector: 'policyCode'
  // },
  // {
  //   name: 'POLICY ID',
  //   minWidth: '172px',
  //   sortable: true,
  //   selector: 'memberPolicyID'
  // },

  // {
  //   name: 'Plan',
  //   minWidth: '138px',
  //   selector: 'currentPlan',
  //   sortable: true,
  //   cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  // },
  // {
  // name: 'DESIGNATION',
  // minWidth: '138px',
  // selector: 'role',
  // sortable: true,
  // cell: row => renderRole(row)
  // cell: row => (
  //   <Badge className='text-capitalize' color={statusObj[row.status]} pill>
  //     {row.status}
  //   </Badge>
  // )
  // },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            // tag={Link}
            // to={`/apps/user/view/${row.id}`}
            className="w-100"
            onClick={() => window.open(`mailto:${row.email}`)}
          >
            <FileText size={14} className="mr-50" />
            <span className="align-middle">Email</span>
          </DropdownItem>
          <DropdownItem
            // tag={Link}
            // to={`/apps/user/view/${row.id}`}
            className="w-100"
            onClick={() =>
              window.open(
                `https://wa.me/91${row.memberMobileNo.replaceAll(
                  /[\+\ ]/g,
                  ""
                )}`
              )
            }
          >
            <img src={whatsappIcon} width="14" height="14" className="mr-50" />
            <span className="align-middle">WhatsApp</span>
          </DropdownItem>
          {/* <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteUser(row.id))}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
];
