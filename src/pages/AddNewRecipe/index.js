import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button, Image, Row, Container } from "react-bootstrap";
import { addNewRecipe } from "../../store/recipes/actions";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import "./style.css";

export default function AddNewRecipe() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      ingredientName: "",
      amount: 1,
    },
  ]);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      addNewRecipe(
        title,
        difficulty,
        duration,
        description,
        imageUrl,
        ingredients
      )
    );
  }
  const handleChangeInput = (i, e) => {
    console.log(e.target.value);
    const values = [...ingredients];
    values[i][e.target.name] = e.target.value;
    setIngredients(values);
  };

  const handleAdd = (id) => {
    setIngredients([
      ...ingredients,
      { id: id + 2, ingredientName: "", amount: 1 },
    ]);
  };
  const handleSubstract = (i) => {
    const values = [...ingredients];
    values.splice(i, 1);
    setIngredients([...values]);
  };

  console.log(ingredients);
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }} className="add-recipe-form">
      <Container>
        <h1 className="mt-5 mb-5 add-recipe-form-title">Post a new recipe</h1>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Title of your recipe"
            required
          />
        </Form.Group>
      </Container>
      <Container>
        <Form.Label>Ingredients</Form.Label>
        <Row>
          <Form.Group>
            {ingredients.map((field, i) => (
              <Row className="mt-1 input-ingredient-fild" key={i}>
                <Col sm={7}>
                  <Form.Control
                    value={field.ingredientName}
                    name="ingredientName"
                    onChange={(event) => handleChangeInput(i, event)}
                    type="text"
                    placeholder="Ingredient name"
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Form.Control
                    value={field.amount}
                    name="amount"
                    type="number"
                    min="0"
                    onChange={(event) => handleChangeInput(i, event)}
                    required
                  />
                </Col>
                <Col className="ingredients-buttons">
                  <Row>
                    <Button
                      onClick={() => handleAdd(i)}
                      className="mt-2"
                      style={{ width: "50px" }}
                    >
                      +
                    </Button>
                    <Button
                      disabled={field.id === 1}
                      onClick={() => handleSubstract(i)}
                      className="mt-2"
                      style={{ width: "50px", marginLeft: "1%" }}
                    >
                      -
                    </Button>
                  </Row>
                </Col>
              </Row>
            ))}
          </Form.Group>
        </Row>
      </Container>
      <Container>
        <Form.Group>
          <Form.Label>Cooking method</Form.Label>
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            as="textarea"
            rows={10}
            type="text"
            placeholder="Cooking method"
            required
          />
        </Form.Group>
      </Container>
      <Container>
        <Form.Group>
          <Form.Label>Image url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="A picture of your recipe"
          />
          {imageUrl ? (
            <Col className="mt-4" md={{ span: 8, offset: 2 }}>
              <Image src={imageUrl} alt="preview" thumbnail />
            </Col>
          ) : null}
        </Form.Group>
      </Container>
      <Container>
        <Form.Group>
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            value={difficulty}
            type="number"
            min="1"
            max="3"
            onChange={(event) => setDifficulty(event.target.value)}
            required
          />
        </Form.Group>
      </Container>
      <Container>
        <Form.Group>
          <Form.Label>Duration in minutes</Form.Label>
          <Form.Control
            value={duration}
            type="number"
            min="5"
            onChange={(event) => setDuration(event.target.value)}
            required
          />
        </Form.Group>
      </Container>

      <Form.Group className="mt-5 form-submit-button">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Add recipe!
        </Button>
      </Form.Group>
    </Form>
  );
}
