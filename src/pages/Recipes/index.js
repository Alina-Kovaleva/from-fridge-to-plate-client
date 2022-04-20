import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../store/recipes/actions";
import { selectRecipes } from "../../store/recipes/selectors";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("recipes from page", recipes);
  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);
  return (
    <div>
      This Is my Recipes Page
      <div>
        {recipes?.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h1>{recipe.title}</h1>
              <img alt={recipe.title} src={recipe.imageUrl}></img>
              <p>difficulty: {recipe.difficulty}</p>
              <p>duration: {recipe.duration}</p>
            </div>
          );
        })}
        <div>
          <button>See details</button>
        </div>
      </div>
    </div>
  );
}
