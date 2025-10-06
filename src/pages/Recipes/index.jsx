import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../../store/recipes/actions";
import { selectRecipes } from "../../store/recipes/selectors";
import { Container, Row, Alert, Spinner } from "react-bootstrap";
import Item from "../../components/RecipeCard";
// import HeroBanner from "../../components/HeroBanner";
import "./style.css";
import { selectAppLoading } from "../../store/appState/selectors";

export default function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectAppLoading);
  // console.log("recipes from page", recipes);
  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  // const [sortBy, setSortBy] = useState("byDate");
  // const changeSorting = (event) => {
  //   setSortBy(event.target.value);
  // };

  const showColdStartNotice = isLoading && (!recipes || recipes.length === 0);
  const showEmptyState = !isLoading && (!recipes || recipes.length === 0);

  return (
    <div className="main-page">
      {/* <HeroBanner className="hero-main-page">
        <h1>Eat plenty, eat deliciously</h1>
      </HeroBanner> */}
      <div className="content">
        <Container className="home-page-container">
          {showColdStartNotice ? (
            <Alert variant="info" className="cold-start-alert" role="status">
              <Spinner animation="border" size="sm" className="me-2" />
              <div>
                <strong>Heads up!</strong> This pet project runs on a free Neon
                database that goes to sleep after a few minutes of inactivity.
                The first request wakes it up, which can take ~20–30 seconds.
                If you’re staring at a blank page, that’s normal—just give it a
                moment or refresh once more while the database rubs the sleep out
                of its eyes.
              </div>
            </Alert>
          ) : null}
          {showEmptyState ? (
            <Alert variant="warning" className="cold-start-alert">
              No recipes have loaded yet. Because this project runs on a free
              Neon database, it can take a few extra seconds to wake up. Give it
              a moment and refresh once or twice if the list stays empty.
            </Alert>
          ) : null}
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
