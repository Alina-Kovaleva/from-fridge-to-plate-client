export const selectRecipes = (state) => {
  // console.log("state", state);
  return state.recipes.allRecipes;
};

export const selectRecipe = (state) => {
  // console.log("state", state);
  return state.recipes.recipeDetails;
};
