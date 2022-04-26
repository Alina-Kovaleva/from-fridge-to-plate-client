import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./style.css";

export default function NavbarItem(props) {
  return (
    <Nav.Item className="nav-item">
      <Nav.Link as={NavLink} to={props.path} className="nav-link-item">
        {props.linkText}
      </Nav.Link>
    </Nav.Item>
  );
}
