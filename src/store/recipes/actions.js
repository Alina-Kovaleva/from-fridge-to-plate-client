import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import axios from "axios";

import { FETCH_RECIPES, FETCH_RECIPE, RECIPE_POST_SUCCESS } from "./types";
import { selectUser } from "../user/selectors";

export const fetchRecipes = (recipes) => ({
  type: FETCH_RECIPES,
  payload: recipes,
});
export const fetchRecipe = (recipe) => ({
  type: FETCH_RECIPE,
  payload: recipe,
});
export const recipePostSuccess = (recipe) => ({
  type: RECIPE_POST_SUCCESS,
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

export const fetchUserFavoriteRecipe = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `${apiUrl}/recipes/my_favourites/${userId}`
      );
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addNewRecipe = (
  imageUrl,
  title,
  difficulty,
  duration,
  description,
  ingredients
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    let success = true;

    try {
      const { token } = selectUser(getState());
      const response = await axios.post(
        `${apiUrl}/recipes/new`,
        {
          imageUrl,
          title,
          difficulty,
          duration,
          description,
          ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
    } catch (e) {
      console.log(e.message);
    }
  };
};
