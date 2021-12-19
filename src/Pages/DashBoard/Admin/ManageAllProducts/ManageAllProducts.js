import React, { useEffect } from "react";
import { Col, Row, Card, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { fetchProducts } from "../../../../Reduce/Slice/Slice";
import SingleBestSeller from "../../../HomePage/SingleBestSeller/SingleBestSeller";

const ManageAllProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products.productsList[0]);

  return (
    <section>
      <div className="text-center pb-4">
        <h1 className="fw-bold">
          <span className="text-red">Manage All Products</span>
        </h1>
      </div>
      <Container>
        {products ? (
          <Row xs={2} md={3} lg={4} xxl={5} className="g-4">
            {products?.map((data) => (
              <Col key={data._id}>
                <Card className="h-100 mt-3 products-card ">
                  <Card.Img height="230" variant="top" src={data.photo} />
                  <Card.Body className="pb-0">
                    <Card.Title as={"h6"}>
                      <span className="fw-bold text-red">{data.name}</span>
                    </Card.Title>
                    <Card.Text className="text-success">IN STOCK</Card.Text>
                    <Card.Text>
                      Price :{" "}
                      <span className="text-primary fw-bold">{data.price}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="border-0 pt-0">
                    <Link
                      to={`/product/${data._id}/edit`}
                      className="text-center"
                    >
                      <button className="btn bg-red">Edit Products</button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center my-5">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </Container>
    </section>
  );
};

export default ManageAllProducts;
