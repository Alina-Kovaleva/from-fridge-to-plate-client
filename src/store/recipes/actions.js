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
      const { token } = selectUser(getState());
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(`${apiUrl}/recipes`, {
        headers: headers,
      });
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
  title,
  difficulty,
  duration,
  description,
  imageUrl,
  ingredients
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    // let success = true;
    const { token } = selectUser(getState());
    if (token === null) return;

    try {
      const response = await axios.post(
        `${apiUrl}/recipes/new`,
        {
          title,
          difficulty,
          duration,
          description,
          imageUrl,
          ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("what is the response= ", response);

      dispatch(recipePostSuccess(response.data.recipe));
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
