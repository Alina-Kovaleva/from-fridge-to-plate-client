import { FETCH_RECIPES } from "./types";

const initialState = { allRecipes: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, allRecipes: action.payload };
    default: {
      return state;
    }
  }
}
