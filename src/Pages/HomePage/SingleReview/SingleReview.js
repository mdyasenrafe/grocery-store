import React from "react";
import Rating from "react-rating";
import { Card, Col } from "react-bootstrap";
import "./SingleReview.css";

const SingleReview = (props) => {
  const { name, userImage, description, work, rating } = props.data;
  return (
    <Col>
      <Card className="border-0 bg-light shadow-lg p-4 text-center">
        <div className="text-center">
          <Card.Img className="review-image" variant="top" src={userImage} />
        </div>

        <Card.Body>
          <Card.Text>{name}</Card.Text>
          <Card.Text>{work}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center border-0 bg-light">
          <Rating
            initialRating={rating}
            emptySymbol="far fa-star text-red"
            fullSymbol="fas fa-star text-red"
            readonly
          ></Rating>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SingleReview;
