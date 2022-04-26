import React from "react";
import NavbarItem from "./NavbarItem";
export default function AddNewRecipe() {
  return (
    <>
      <NavbarItem
        style={{ padding: ".5rem 1rem" }}
        path="/new"
        linkText="Add new recipe"
      ></NavbarItem>
    </>
  );
}
