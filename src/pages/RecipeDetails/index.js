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
      <Container>
        <Card>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Img
            style={{ padding: "8px" }}
            variant="top"
            src={recipe.imageUrl}
          />
          <Card.Body>
            <Card.Text>
              <ReactStars
                count={5}
                size={24}
                isHalf={true}
                value={recipe.difficulty}
                edit={false}
              />
            </Card.Text>
            <Card.Text>⏱ {recipe.duration / 60}h.</Card.Text>
            <Card.Text>
              <ListGroup>
                <ListGroup.Item>List of ingredients</ListGroup.Item>
                {recipe.ingredients?.map((ingredient) => {
                  return (
                    <ListGroup.Item key={ingredient.id}>
                      {ingredient.name}{" "}
                      {ingredient.recipeingredientamount?.amount}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Text>
            <Card.Text>{recipe.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
