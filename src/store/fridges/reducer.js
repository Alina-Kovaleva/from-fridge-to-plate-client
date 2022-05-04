import {
  FETCH_INGREDIENTS,
  PRODUCTS_POST_SUCCESS,
  PRODUCT_CHANGE_SUCCESS,
} from "./types";

const initialState = { allIngredients: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return { ...state, allIngredients: action.payload };
    case PRODUCTS_POST_SUCCESS:
      return {
        allIngredients: action.payload,
      };
    case PRODUCT_CHANGE_SUCCESS:
      return { ...state, ...action.payload };
    default: {
      return state;
    }
  }
}
