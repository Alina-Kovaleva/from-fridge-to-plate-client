import React from "react";
import NavbarItem from "./NavbarItem";
import "./style.css";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
