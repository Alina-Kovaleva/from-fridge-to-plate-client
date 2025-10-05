import React, { useEffect } from "react";
import { useSelector } from "react-redux";

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
