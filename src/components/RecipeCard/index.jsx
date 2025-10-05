import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars";
import "./style.css";

export default function Item(props) {
  // const loginControlFav = token ? <Button>♡</Button> : null;
  const hours = Math.floor(props.duration / 60)
    ? Math.floor(props.duration / 60) + "h"
    : null;
  const minutes = props.duration % 60 ? (props.duration % 60) + "m" : null;

  return (
    <Card style={{ width: "18rem" }} className="recipe-card">
      <Card.Img
        variant="top"
        src={props.imageUrl}
        className="recipe-card-image"
      />
      <Card.Body className="center">
        <Card.Title
          className="recipe-card-title"
          style={{ textAlign: "center" }}
        >
          {props.title}
        </Card.Title>
        <div className="recipe-card-buttons">
          <RatingStars value={props.difficulty} max={3} size={24} color="#dc3545" />
          <Card.Text className="duration-text">
            ⏱ {hours}
            {minutes}
          </Card.Text>
        </div>
        <div className="recipe-card-buttons">
          {/* {loginControlFav} */}

          <Link to={`/recipes/${props.id}`}>
            <Button className="center" variant="success">
              See details ❱
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
