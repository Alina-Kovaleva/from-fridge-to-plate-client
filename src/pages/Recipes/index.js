import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../store/recipes/actions";
import { selectRecipes } from "../../store/recipes/selectors";
import { Container, Row, Col, CardGroup, Form } from "react-bootstrap";
import Item from "../../components/RecipeCard";
// import HeroBanner from "../../components/HeroBanner";
import "./style.css";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  console.log("recipes from page", recipes);
  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  // const [sortBy, setSortBy] = useState("byDate");
  // const changeSorting = (event) => {
  //   setSortBy(event.target.value);
  // };

  return (
    <div className="main-page">
      {/* <HeroBanner className="hero-main-page">
        <h1>Eat plenty, eat deliciously</h1>
      </HeroBanner> */}
      <div className="content">
        <Container className="home-page-container">
          {/* <Row>
            <Form.Select onChange={changeSorting} value={sortBy}>
              <option value="byDate">sort by created date</option>
              <option value="byName">Name</option>
              <option value="byDuration">sort by duration</option>
              <option value="byDifficulty">sort by difficulty</option>
            </Form.Select>
          </Row> */}
          <Row xs={2} md={3} className="space g-4">
            {recipes?.map((recipe) => {
              return (
                <Item
                  key={recipe.id}
                  id={recipe.id}
                  imageUrl={recipe.imageUrl}
                  title={recipe.title}
                  difficulty={recipe.difficulty}
                  duration={recipe.duration}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}
