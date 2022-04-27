import React from "react";
import NavbarItem from "./NavbarItem";

export default function MyFridge() {
  return (
    <>
      <NavbarItem
        style={{ padding: ".5rem 1rem" }}
        path={`/myfridge`}
        linkText="My Fridge"
      ></NavbarItem>
    </>
  );
}
