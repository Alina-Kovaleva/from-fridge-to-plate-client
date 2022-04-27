import React from "react";
import NavbarItem from "./NavbarItem";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function MyFridge() {
  const user = useSelector(selectUser);

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
