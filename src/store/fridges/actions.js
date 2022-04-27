import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import axios from "axios";

import { FETCH_INGREDIENTS, PRODUCTS_POST_SUCCESS } from "./types";
import { selectUser } from "../user/selectors";

export const fetchIngredients = (ingredients) => ({
  type: FETCH_INGREDIENTS,
  payload: ingredients,
});

export const productsPostSuccess = (products) => ({
  type: PRODUCTS_POST_SUCCESS,
  payload: products,
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

export const addNewProducts = (products) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    // let success = true;
    const { token } = selectUser(getState());

    try {
      const response = await axios.post(
        `${apiUrl}/myfridge/new`,
        {
          products,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("what is the response= ", response);

      dispatch(productsPostSuccess(response.data.products));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
