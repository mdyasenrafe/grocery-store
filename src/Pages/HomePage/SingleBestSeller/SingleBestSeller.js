import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SingleBestSeller.css";

const SingleBestSeller = (props) => {
  const { name, photo, price, _id } = props.data;
  return (
    <Col>
      <Card className="h-100 mt-3 products-card ">
        <Card.Img height="230" variant="top" src={photo} />
        <Card.Body className="pb-0">
          <Card.Title as={"h6"}>
            <span className="fw-bold text-red">{name}</span>
          </Card.Title>
          <Card.Text className="text-success">IN STOCK</Card.Text>
          <Card.Text>
            Price : <span className="text-primary fw-bold">{price}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="border-0 pt-0">
          <Link to={`/product/${_id}`} className="text-center">
            <button className="btn bg-red">View Products</button>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SingleBestSeller;
