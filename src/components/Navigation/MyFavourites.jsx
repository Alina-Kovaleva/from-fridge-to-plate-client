import React from "react";
import NavbarItem from "./NavbarItem";
import "./style.css";

export default function MyFavourites() {
  return (
    <>
      <NavbarItem
        style={{ padding: ".5rem 1rem" }}
        path={`/my_favourites`}
        linkText="My Favourites"
      ></NavbarItem>
    </>
  );
}
