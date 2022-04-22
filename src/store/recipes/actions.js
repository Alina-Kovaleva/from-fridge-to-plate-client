import { apiUrl } from "../../config/constants";

import axios from "axios";

import { FETCH_RECIPES, FETCH_RECIPE } from "./types";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES,
  payload: recipes,
});
export const fetchRecipe = (recipe) => ({
  type: FETCH_RECIPE,
  payload: recipe,
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

export const fetchRecipeById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes/${id}`);
      dispatch(fetchRecipe(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
