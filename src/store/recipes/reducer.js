import { FETCH_RECIPES, FETCH_RECIPE } from "./types";

const initialState = { allRecipes: [], recipeDetails: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, allRecipes: action.payload };
    case FETCH_RECIPE:
      return { ...state, recipeDetails: action.payload };
    default: {
      return state;
    }
  }
}
