import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
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
    dispatch(appLoading());
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
    } catch (error) {
      console.error("Failed to load recipes", error);
    } finally {
      dispatch(appDoneLoading());
    }
  };
};

export const fetchRecipeById = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/recipes/${id}`);
      dispatch(fetchRecipe(response.data));
    } catch (error) {
      console.error(`Failed to load recipe ${id}`, error);
    } finally {
      dispatch(appDoneLoading());
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
      dispatch(recipePostSuccess(response.data.recipe));
      dispatch(
        showMessageWithTimeout(
          "New recipe was added success",
          false,
          response.data.message,
          3000
        )
      );
    } catch (error) {
      console.error("Failed to add new recipe", error);
    } finally {
      dispatch(appDoneLoading());
    }
  };
};
