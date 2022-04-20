export const selectRecipes = (state) => {
  console.log("state", state);
  return state.recipes.allRecipes;
};
