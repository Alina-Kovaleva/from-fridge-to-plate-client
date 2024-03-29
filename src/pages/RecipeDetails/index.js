import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRecipe } from "../../store/recipes/selectors";
import { fetchRecipeById } from "../../store/recipes/actions";
import Loading from "../../components/Loading";
import { Container, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "./style.css";

export default function RecipeDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipe = useSelector(selectRecipe);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (recipe === null) return <Loading />;

  // console.log(recipe);

  const difficultyControl =
    recipe?.difficulty < 2 ? (
      <Card.Text> easy </Card.Text>
    ) : (
      <Card.Text> hard </Card.Text>
    );

  const hours = Math.floor(recipe.duration / 60)
    ? Math.floor(recipe.duration / 60) + "h"
    : null;
  const minutes = recipe.duration % 60 ? (recipe.duration % 60) + "m" : null;

  return (
    <>
      <Container className="details-container">
        <Card style={{ width: "65rem", alignItems: "center" }}>
          <Card.Title className="card-recipe-title-d">
            {recipe.title}
          </Card.Title>
          <Card.Img
            style={{ padding: "8px", height: "50%", width: "50%" }}
            variant="top"
            src={recipe.imageUrl}
          />
          <Card.Body className="card-body-optional">
            <div className="difficulty-duration">
              <div className="difficulty-duration-d">
                <Card.Text>Difficulty: </Card.Text>
                <Card.Text className="difficulty">
                  {"  "}
                  {/* {difficultyControl} */}
                  <ReactStars
                    count={3}
                    size={24}
                    isHalf={true}
                    value={recipe?.difficulty}
                    edit={false}
                  />
                </Card.Text>
              </div>
              <Card.Text>
                ⏱ {hours}
                {minutes}
              </Card.Text>
            </div>
            <div className="ingredients-description">
              <Card.Text className="ingredients">
                <Card.Title className="card-recipe-title">
                  List of ingredients
                </Card.Title>
                <ul className="list">
                  {recipe.ingredients?.map((ingredient) => {
                    return (
                      <li key={ingredient.id}>
                        <Card.Text className="card-recipe-list-ingredients">
                          {ingredient.recipeingredientamount?.amount}{" "}
                          {ingredient.name}
                        </Card.Text>
                      </li>
                    );
                  })}
                </ul>
              </Card.Text>

              <Card.Text className="description">
                <Card.Title className="card-recipe-title">Method</Card.Title>
                <Card.Text className="card-recipe-description">
                  {recipe.description}
                </Card.Text>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
