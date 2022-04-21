import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../store/recipes/actions";
import { selectRecipes } from "../../store/recipes/selectors";
import { Container, Row, Col, CardGroup, Form } from "react-bootstrap";
import Item from "../../components/RecipeCard";
import HeroBanner from "../../components/HeroBanner";
import "./style.css";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("recipes from page", recipes);
  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);
  return (
    <div>
      <HeroBanner>
        <h1>Eat plenty, eat deliciously</h1>
      </HeroBanner>
      <div className="content">
        <Container>
          <Row>filters line</Row>
          <Row xs={2} md={3} className="space g-4">
            {recipes?.map((recipe) => {
              let time = recipe.duration / 60;
              return (
                <Item
                  key={recipe.id}
                  id={recipe.id}
                  imageUrl={recipe.imageUrl}
                  title={recipe.title}
                  difficulty={recipe.difficulty}
                  duration={time}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}
