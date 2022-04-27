import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";

import { useNavigate } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export default function Favourites() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <h1>This is my favourites page</h1>
    </>
  );
}
