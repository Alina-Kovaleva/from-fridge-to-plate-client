import { apiUrl } from "../../config/constants";
import axios from "axios";

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
