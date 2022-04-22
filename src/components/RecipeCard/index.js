import React from "react";
import ReactStars from "react-rating-stars-component";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img style={{ padding: "8px" }} variant="top" src={props.imageUrl} />
      <Card.Body className="center">
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
        <Card.Text>
          <ReactStars
            count={3}
            size={24}
            activeColor={"red"}
            value={props.difficulty}
            edit={false}
          />
        </Card.Text>
        <Card.Text>⏱ {props.duration}h.</Card.Text>
        <Link to={`/recipes/${props.id}`}>
          <Button className="center" variant="success">
            See details ❱
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
