import React, { useState, useContext, useEffect } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { AppContext } from "../../../contexts/AppContext";
import { UserContext } from "../../../contexts/UserContext";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/icon.png";
import logolighticon from "../../../assets/images/logo-light-icon.png";
import logodarktext from "../../../assets/images/text.png";
import logolighttext from "../../../assets/images/logo-light-text.png";
import profilephoto from "../../../assets/images/users/1.jpg";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");

  const { settings } = useContext(AppContext);
  const { getUser } = useContext(UserContext);

  const getUserDetails = () => {
    getUser()
      .then((d) => setUser(d))
      .catch((e) => console.log("Err:", e));
  };

  useEffect(getUserDetails, [user]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  return (
    <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
      <Navbar
        className={
          "top-navbar " +
          (settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
        }
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={settings.activeLogoBg}
        >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="nav-toggler d-block d-md-none"
            onClick={showMobilemenu.bind(null)}
          >
            <i className="ti-menu ti-close" />
          </span>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/banks">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              <img src={logolighticon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" width="90" />
              <img src={logolighttext} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="topbartoggler d-block d-md-none"
            onClick={toggle.bind(null)}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={isOpen}
          navbar
          data-navbarbg={settings.activeNavbarBg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={sidebarHandler.bind(null)}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <span className="with-arrow">
                  <span className="bg-primary" />
                </span>
                <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                  <div className="">
                    <img
                      src={profilephoto}
                      alt="user"
                      className="rounded-circle"
                      width="60"
                    />
                  </div>
                  <div className="ml-2">
                    <h4 className="mb-0">{user.name}</h4>
                    <p className=" mb-0">{user.email}</p>
                  </div>
                </div>
                <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> My Account
                </DropdownItem>
                {/* <DropdownItem>
                  <i className="ti-wallet mr-1 ml-1" /> My Balance
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-email mr-1 ml-1" /> Inbox
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="ti-settings mr-1 ml-1" /> Account Settings
                </DropdownItem>
                <DropdownItem divider /> */}
                <DropdownItem href="/pages/login">
                  <i className="fa fa-power-off mr-1 ml-1" /> Logout
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
