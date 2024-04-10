// ** Dropdowns Imports
import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import { Moon, Search, Sun } from "react-feather";
import {
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  NavItem,
  NavLink,
} from "reactstrap";

import { Menu } from "react-feather";
import UserDropdown from "./UserDropdown";
import { useSelector, useDispatch } from "react-redux";
import { handleResponsiveMenuOperation } from "../../../../redux/actions/ResponsiveMenuAction/ResponsiveMenuAction";
const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function TrackWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", TrackWidth);
    return () => window.removeEventListener("resize", TrackWidth);
  }, []);

  // Using Store Values
  const isResponsiveMenuOpen = useSelector((state) => state.ResponsiveReducer);
  const dispatch = useDispatch();

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  const inputControlStyle = {
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
    backgroundColor: "#eeeeee",
  };

  const searchIconStyle = {
    borderTopLeftRadius: "50px",
    borderBottomLeftRadius: "50px",
    backgroundColor: "#eeeeee",
  };

  const handleResponsiveMenuOpen = () => {
    dispatch(handleResponsiveMenuOperation(true));
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
        {false && (
          <NavItem className="d-none d-lg-block">
            <NavLink className="nav-link-style">
              <Form onSubmit={(e) => e.preventDefault()}>
                <InputGroup className="input-group-merge">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={searchIconStyle}>
                      <Search size={14} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    style={inputControlStyle}
                    placeholder="Type in to search"
                  />
                </InputGroup>
              </Form>
            </NavLink>
          </NavItem>
        )}
      </div>
      {width <= 1200 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {" "}
          <Menu size={20} onClick={handleResponsiveMenuOpen} />
        </div>
      )}
      <ul className="nav navbar-nav align-items-center ml-auto">
        {/* <IntlDropdown /> */}
        {/* <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem> */}
        {/* <NavbarSearch /> */}
        {/* <CartDropdown /> */}
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </ul>
    </Fragment>
  );
};

export default ThemeNavbar;
