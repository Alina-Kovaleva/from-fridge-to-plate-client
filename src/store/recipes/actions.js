import { apiUrl } from "../../config/constants";

import axios from "axios";

import { FETCH_RECIPES } from "./types";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES,
  payload: recipes,
});

export const fetchAllRecipes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes`);
      dispatch(fetchRecipes(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
