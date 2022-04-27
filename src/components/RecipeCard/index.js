import React from "react";
import ReactStars from "react-rating-stars-component";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import "./style.css";

export default function Item(props) {
  const token = useSelector(selectToken);

  const loginControlFav = token ? <Button>♡</Button> : null;
  const hours = Math.floor(props.duration / 60)
    ? Math.floor(props.duration / 60) + "h"
    : null;
  const minutes = props.duration % 60 ? (props.duration % 60) + "m" : null;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img style={{ padding: "8px" }} variant="top" src={props.imageUrl} />
      <Card.Body className="center">
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
        <div className="recipe-card-buttons">
          <Card.Text>
            <ReactStars
              count={3}
              size={24}
              activeColor={"red"}
              value={props.difficulty}
              edit={false}
            />
          </Card.Text>
          <Card.Text className="duration-text">
            ⏱ {hours}
            {minutes}
          </Card.Text>
        </div>
        <div className="recipe-card-buttons">
          {loginControlFav}

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
