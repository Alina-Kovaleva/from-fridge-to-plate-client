import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "../Navigation/LoggedIn";
import LoggedOut from "../Navigation/LoggedOut";
import MyFavourites from "../Navigation/MyFavourites";
import AddNewRecipe from "../Navigation/AddNewRecipe";
import MyFridge from "../Navigation/MyFridge";

export default function Footer() {
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? (
    <LoggedIn className="footer-link" />
  ) : (
    <LoggedOut />
  );
  const favouritesControl = token ? (
    <MyFavourites className="footer-link" />
  ) : null;
  const addNewControl = token ? <AddNewRecipe className="footer-link" /> : null;
  const myFridgeControl = token ? <MyFridge className="footer-link" /> : null;
  return (
    <Container className="footer-container">
      <div className="footer-logo">
        <Navbar.Brand as={NavLink} to="/" className="LogoNav">
          From Fridge <br /> to Plate
        </Navbar.Brand>
      </div>

      <div className="footer-column-1">
        <NavLink style={{ textTransform: "uppercase" }} to="/">
          Recipes
        </NavLink>
        {addNewControl}
      </div>
      <div className="footer-column-2">
        {myFridgeControl}
        {favouritesControl}
      </div>
      <div className="footer-column-3">{loginLogoutControls}</div>
    </Container>
  );
}
