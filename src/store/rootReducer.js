import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import recipes from "./recipes/reducer";
import ingredients from "./fridges/reducer";

export default combineReducers({
  appState,
  user,
  recipes,
  ingredients,
});
