import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import axios from "axios";

import { FETCH_INGREDIENTS } from "./types";
import { selectUser } from "../user/selectors";

export const fetchIngredients = (ingredients) => ({
  type: FETCH_INGREDIENTS,
  payload: ingredients,
});

export const fetchAllIngredients = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    const { token } = selectUser(getState());
    try {
      const response = await axios.get(`${apiUrl}/myfridge`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response= ", response);
      dispatch(fetchIngredients(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
