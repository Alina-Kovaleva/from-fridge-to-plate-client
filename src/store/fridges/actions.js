import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import axios from "axios";

import {
  FETCH_INGREDIENTS,
  PRODUCTS_POST_SUCCESS,
  PRODUCT_CHANGE_SUCCESS,
} from "./types";
import { selectUser } from "../user/selectors";

export const fetchIngredients = (ingredients) => ({
  type: FETCH_INGREDIENTS,
  payload: ingredients,
});

export const productsPostSuccess = (products) => ({
  type: PRODUCTS_POST_SUCCESS,
  payload: products,
});

export const myFridgeIngredientChange = (product) => ({
  type: PRODUCT_CHANGE_SUCCESS,
  payload: product,
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
      dispatch(fetchIngredients(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      console.error("Failed to load fridge ingredients", error);
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
      dispatch(productsPostSuccess(response.data.products));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      console.error("Failed to add products", error);
    }
  };
};

export const changeProductAmount = (ingredientId, amount) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    const { token } = selectUser(getState());
    try {
      const response = await axios.put(
        `${apiUrl}/myfridge/update`,
        { ingredientId, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(myFridgeIngredientChange(response.data.product));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      console.error("Failed to update product amount", error);
    }
  };
};
