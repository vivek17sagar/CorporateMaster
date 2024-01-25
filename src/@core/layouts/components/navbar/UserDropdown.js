// ** React Imports
// ** Custom Components
import Avatar from "@components/avatar";
// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { handleLogout } from "@store/actions/auth";
// ** Utils
import { isUserLoggedIn } from "@utils";
import { Fragment, useEffect, useState } from "react";
import {
  Bell,
  CheckSquare,
  ChevronDown,
  Mail,
  MessageSquare,
  Power,
  User,
} from "react-feather";
// ** Store & Actions
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// ** Third Party Components
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Chat from "../../../../views/eo2-dashboard/chat";
import clockify from "@src/assets/images/icons/clockify.png";
import NotificationDropdown from "./NotificationDropdown";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  const [userData, setUserData] = useState(null);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar;

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Fragment>
      <Link to="/dashboard/calendar">
        <img src={clockify} className="mx-1" height="25" width="25" />
      </Link>
      {/* <MessageSquare className='mx-1 cursor-pointer' tag={Link} to='/dashboard/chat' /> */}
      <Link to="/dashboard/chat">
        <MessageSquare className="mx-1" />
      </Link>
      {/* <Bell className='ml-1 mr-5' /> */}
      <NotificationDropdown />
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <Avatar
            initials
            content={
              userData
                ? userData.corporateName.split(" ")?.slice(0, 2).join(" ")
                : ""
            }
            imgHeight="40"
            imgWidth="40"
          />
          <div className="pl-1 user-name font-weight-bold">
            <div>Hello,</div>
            <div>
              {userData && userData.corporateName}
              <ChevronDown />
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem tag={Link} to={`/employees/profile/${userData ? userData.id : 1}`}>
            <User size={14} className='mr-75' />
            <span className='align-middle'>Profile</span>
          </DropdownItem> */}
          <DropdownItem tag={Link} to="/dashboard/chat">
            <Mail size={14} className="mr-75" />
            <span className="align-middle">Chat</span>
          </DropdownItem>
          <DropdownItem tag={Link} to="/dashboard/calendar">
            <CheckSquare size={14} className="mr-75" />
            <span className="align-middle">Reminders</span>
          </DropdownItem>
          <DropdownItem tag={Link} to="/employees/settings">
            <MessageSquare size={14} className="mr-75" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to="/login"
            onClick={() => dispatch(handleLogout())}
          >
            <Power size={14} className="mr-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );
};

export default UserDropdown;
