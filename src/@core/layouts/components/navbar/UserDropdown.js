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
  Menu,
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

  // Tracking width of web page
  const [viewWidth, setViewWidth] = useState(window?.innerWidth);

  // ** State
  const [userData, setUserData] = useState(null);

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);

  useEffect(() => {
    const TrackWidthAndExecute = () => {
      setViewWidth(window.innerWidth);
    };

    window.addEventListener("resize", TrackWidthAndExecute);
    return () => {
      window.removeEventListener("resize", TrackWidthAndExecute);
    };
  }, []);

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar;

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Fragment>
      {false && viewWidth > 991 && (
        <>
          {" "}
          <Link to="/dashboard/calendar">
            <img src={clockify} className="mx-1" height="25" width="25" />
          </Link>
          <Link to="/dashboard/chat">
            <MessageSquare className="mx-1" />
          </Link>
          <NotificationDropdown />
        </>
      )}
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <Avatar
            initials
            title={
              userData
                ? userData.corporateName.split(" ")?.slice(0, 2).join(" ")
                : ""
            }
            content={
              userData
                ? userData.corporateName.split(" ")?.slice(0, 2).join(" ")
                : ""
            }
            imgHeight="40"
            imgWidth="40"
          />
          {viewWidth > 991 && (
            <div className="pl-1 user-name font-weight-bold">
              <div>Hello,</div>
              <div>
                {userData && userData.corporateName}
                <ChevronDown />
              </div>
            </div>
          )}
        </DropdownToggle>
        <DropdownMenu style={{ maxWidth: "25%" }}>
          {/* <DropdownItem tag={Link} to={`/employees/profile/${userData ? userData.id : 1}`}>
            <User size={14} className='mr-75' />
            <span className='align-middle'>Profile</span>
          </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="/dashboard/chat">
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
          </DropdownItem> */}

          {false && viewWidth <= 991 && (
            <>
              {/* Clock */}
              <DropdownItem style={{ width: "100%" }}>
                <Link to="/dashboard/calendar">
                  <img
                    src={clockify}
                    className="mr-75"
                    height="16"
                    width="16"
                  />
                  <span className="align-middle">Reminder</span>
                </Link>
              </DropdownItem>

              {/* Message   /dashboard/chat*/}
              <DropdownItem style={{ width: "100%" }}>
                <Link to="/dashboard/chat">
                  <MessageSquare className="mr-75" />
                  <span className="align-middle">Message</span>
                </Link>
              </DropdownItem>

              {/* Notification*/}
              <DropdownItem style={{ display: "flex", width: "100%" }}>
                <NotificationDropdown />
                <span className="align-middle">Notification</span>
              </DropdownItem>
            </>
          )}

          {/* Logout */}
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
