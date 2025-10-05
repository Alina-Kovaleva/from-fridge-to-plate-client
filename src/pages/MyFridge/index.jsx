import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../store/fridges/selectors";
import {
  fetchAllIngredients,
  addNewProducts,
  changeProductAmount,
} from "../../store/fridges/actions";

import { useNavigate } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

import "./style.css";

const addProductInitialState = [
  {
    productName: "",
    amount: 1,
  }, // uiid 6
]; // uiid 10

export default function MyFridge() {
  const dispatch = useDispatch();

  //need help to add validation
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const allIngredients = useSelector(selectIngredients);

  const [products, setProducts] = useState(addProductInitialState);

  // const [myFridgeIngredient, setMyFridgeIngredient] = useState();

  function submitForm(event) {
    event.preventDefault();
    setProducts(addProductInitialState);
    dispatch(addNewProducts(products));
  }

  const handleChangeInput = (i, e) => {
    const updatedFields = products.map((p, index) =>
      i === index ? { ...p, [e.target.name]: e.target.value } : p
    );

    // const values = [...products];
    // values[i][e.target.name] = e.target.value;
    setProducts(updatedFields);
  };

  const handleAdd = (id) => {
    setProducts([...products, { productName: null, amount: 1 }]);
  };
  const handleSubstract = (i) => {
    const values = [...products];
    values.splice(i, 1);
    setProducts([...values]);
  };

  const handleChangeAmount = (ingredientId, amount) => {
    dispatch(changeProductAmount(ingredientId, amount));
  };

  //  HOW to send two useEffect
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  // if (allIngredients === []) return <Loading />;
  // // console.log("ingredients= ", ingredients);

  // console.log("!!!!!");

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  return (
    <>
      <Container className="myfridge-page-container">
        <h1 className="page-header">My Fridge</h1>

        <Container className="fridge-page-content">
          <Table style={{ width: "50%" }}>
            <thead>
              <tr>
                <th>Ingredient Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {allIngredients?.map((myproduct) => {
                // console.log("myproduct", myproduct);
                return (
                  <tr key={myproduct.id} className="poduct-box">
                    <td className="product-title">{myproduct.name}</td>
                    <td>
                      <input
                        value={myproduct.myFridgeIngredientForm}
                        name="myFridgeIngredientForm"
                        placeholder={myproduct.useringredient?.amount}
                        type="number"
                        // min={0}
                        onChange={(event) =>
                          handleChangeAmount(
                            myproduct.id,
                            +event.target.value +
                              +myproduct.useringredient?.amount
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Container className="add-new-product-card">
            <Form className="form-card">
              <Form.Label>
                <h6 className="form-card-title">Add new products</h6>
              </Form.Label>
              <Row>
                <Form.Group>
                  {products.map((field, i) => {
                    return (
                      <Row className="mt-1 input-ingredient-fild" key={i}>
                        <Col sm={6}>
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
                              style={{ width: "100px" }}
                            >
                              Add extra
                            </Button>
                            <Button
                              disabled={i === 0}
                              onClick={() => handleSubstract(i)}
                              className="mt-2"
                              style={{ width: "100px", marginLeft: "1%" }}
                            >
                              Remove
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                </Form.Group>
              </Row>
              <Form.Group className="mt-5 form-submit-button">
                <Button variant="primary" onClick={submitForm}>
                  Add products
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Container>
      </Container>
    </>
  );
}
