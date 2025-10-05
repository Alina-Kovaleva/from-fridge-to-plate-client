import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
// import MyFavourites from "./MyFavourites";
import AddNewRecipe from "./AddNewRecipe";
import MyFridge from "./MyFridge";
import "./style.css";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  const addNewControl = token && <AddNewRecipe />;
  const myFridgeControl = token && <MyFridge />;

  return (
    <div className="navbar-container">
      <Navbar expand="lg" variant="light">
        <Navbar.Brand className="brand" as={NavLink} to="/">
          From fridge <br /> to Plate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }} fill>
            <NavbarItem path="/" linkText="Recipes" />
            {addNewControl}
            {myFridgeControl}
            {/* {favouritesControl} */}
            {loginLogoutControls}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
