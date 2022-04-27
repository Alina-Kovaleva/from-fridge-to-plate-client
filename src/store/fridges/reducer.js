import { FETCH_INGREDIENTS } from "./types";

const initialState = { allIngredients: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return { ...state, allIngredients: action.payload };
    default: {
      return state;
    }
  }
}
