import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { selectIngredients } from "../../store/fridges/selectors";
import {
  fetchAllIngredients,
  addNewProducts,
} from "../../store/fridges/actions";

import { useNavigate } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

import "./style.css";

export default function MyFridge() {
  const dispatch = useDispatch();

  //need help to add validation
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const allIngredients = useSelector(selectIngredients);
  console.log("allIngredients= ", allIngredients);

  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "",
      amount: 1,
    },
  ]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(addNewProducts(products));
  }

  const handleChangeInput = (i, e) => {
    console.log(e.target.value);
    const values = [...products];
    values[i][e.target.name] = e.target.value;
    setProducts(values);
  };

  const handleAdd = (id) => {
    setProducts([...products, { id: id + 2, productName: "", amount: 1 }]);
  };
  const handleSubstract = (i) => {
    const values = [...products];
    values.splice(i, 1);
    setProducts([...values]);
  };

  //  HOW to send two useEffect
  // useEffect(() => {
  //   if (token === null) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  // if (allIngredients === []) return <Loading />;
  // // console.log("ingredients= ", ingredients);

  // console.log("!!!!!");

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Form>
          {/* <h1>List of available products</h1> */}
          <Form.Label>List of available products</Form.Label>
          {allIngredients?.map((myproduct) => {
            return (
              <>
                {/* <ListGroup horizontal key={myproduct.id}>
                <ListGroup.Item>
                  <h5>{myproduct.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>{myproduct.useringredient?.amount}</h5>
                </ListGroup.Item>
              </ListGroup> */}

                <Form.Group>
                  <Row>
                    <Col sm={7}>
                      <Container>
                        <h5>{myproduct.name}</h5>
                      </Container>
                    </Col>
                    <Col sm={2}>
                      <Form.Control
                        placeholder={myproduct.useringredient?.amount}
                        type="number"
                        min="0"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </>
            );
          })}
        </Form>
      </Container>
      <Container>
        <Form className="form-card">
          <Form.Label>
            <h6 className="form-card-title">Add new products</h6>
          </Form.Label>
          <Row>
            <Form.Group>
              {products.map((field, i) => (
                <Row className="mt-1 input-ingredient-fild" key={i}>
                  <Col sm={7}>
                    <Form.Control
                      value={field.productName}
                      name="productName"
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
          <Form.Group className="mt-5 form-submit-button">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Add products
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
