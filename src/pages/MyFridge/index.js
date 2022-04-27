import React, { useState, useEffect } from "react";
import { Form, Col, Button, Image, Row, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { selectIngredients } from "../../store/fridges/selectors";
import { fetschAllIngredients } from "../../store/fridges/actions";

import { useNavigate } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export default function MyFridge() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  // console.log("user= ", user);
  const userId = user.id;
  console.log("userId= ", userId);
  // const ingredients = useSelector(selectIngredients(user?.id));
  // console.log("ingredients= ", ingredients);
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      ingredientName: "",
      amount: 1,
    },
  ]);
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

  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  // if (ingredients === null) return <Loading />;
  // // console.log("ingredients= ", ingredients);

  useEffect(() => {
    dispatch(fetschAllIngredients(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <h1>This is my fridge page</h1>
      <Container>Should be a list of usre products</Container>
      <Container>
        <Form.Label>Add new product</Form.Label>
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
                    placeholder="Product name"
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Form.Control
                    value={field.amount}
                    name="amount"
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
    </>
  );
}
