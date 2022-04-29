import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import MyFavourites from "./MyFavourites";
import AddNewRecipe from "./AddNewRecipe";
import MyFridge from "./MyFridge";
import "./style.css";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  // const favouritesControl = token ? <MyFavourites /> : null;
  const addNewControl = token ? <AddNewRecipe /> : null;
  const myFridgeControl = token ? <MyFridge /> : null;

  return (
    <Navbar expand="lg">
      <Navbar.Brand as={NavLink} to="/">
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
  );
}
