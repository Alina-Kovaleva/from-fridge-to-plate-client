import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRecipe } from "../../store/recipes/selectors";
import { fetchRecipeById } from "../../store/recipes/actions";
import Loading from "../../components/Loading";
import { Container, Row, Image, Table, Card, ListGroup } from "react-bootstrap";
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

  console.log(recipe);
  return (
    <>
      <Container className="details-container">
        <Card style={{ width: "65rem", alignItems: "center" }}>
          <Card.Title className="card-recipe-title">{recipe.title}</Card.Title>
          <Card.Img
            style={{ padding: "8px", height: "50%", width: "50%" }}
            variant="top"
            src={recipe.imageUrl}
          />
          <Card.Body>
            <div className="difficulty-duration">
              <Card.Text className="difficulty">
                <p>Difficulty: </p>
                <ReactStars
                  count={3}
                  size={24}
                  isHalf={true}
                  value={recipe?.difficulty}
                  edit={false}
                />
              </Card.Text>
              <Card.Text>⏱ {recipe.duration / 60}h.</Card.Text>
            </div>
            <div className="ingredients-description">
              <Card.Text className="ingredients">
                {/* <ListGroup> */}
                {/* <ListGroup.Item>List of ingredients</ListGroup.Item> */}
                <h5>List of ingredients</h5>
                <ul className="list">
                  {recipe.ingredients?.map((ingredient) => {
                    return (
                      <li key={ingredient.id}>
                        {ingredient.recipeingredientamount?.amount}{" "}
                        {ingredient.name}
                      </li>
                      // <ListGroup.Item key={ingredient.id}>
                      //   {ingredient.recipeingredientamount?.amount}{" "}
                      //   {ingredient.name}
                      // </ListGroup.Item>
                    );
                  })}
                </ul>
                {/* </ListGroup> */}
              </Card.Text>

              <Card.Text className="description">
                <h5>Cooking method</h5>
                {recipe.description}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
