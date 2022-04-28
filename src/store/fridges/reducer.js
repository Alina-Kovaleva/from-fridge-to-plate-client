import { FETCH_INGREDIENTS, PRODUCTS_POST_SUCCESS } from "./types";

const initialState = { allIngredients: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return { ...state, allIngredients: action.payload };
    case PRODUCTS_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
        // ...state,
        // allIngredients: [...state.allIngredients, action.payload],
      };
    default: {
      return state;
    }
  }
}
