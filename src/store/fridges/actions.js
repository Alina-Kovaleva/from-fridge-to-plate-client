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

export const fetschAllIngredients = (userId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    const { token } = selectUser(getState());

    try {
      const response = await axios.get(
        `${apiUrl}/recipes/myfridge/${userId}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response= ", response);
      dispatch(fetchIngredients(response.data.ingredients));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
