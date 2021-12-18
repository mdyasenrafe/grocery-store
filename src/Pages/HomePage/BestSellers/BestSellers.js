import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Reduce/Slice/Slice";
import SingleBestSeller from "../SingleBestSeller/SingleBestSeller";

const BestSellers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products.productsList[0]);

  const filterBestSellerProduct = products?.filter(
    (product) => product.type === "best-seller"
  );
  return (
    <Container className="py-5">
      <div>
        <h1 className="fw-bold ">
          <span>Best </span>
          <span className="text-danger">Seller </span>
          <span>Products </span>
        </h1>
      </div>
      {filterBestSellerProduct ? (
        <Row xs={2} md={3} lg={4} xxl={5} className="g-4">
          {filterBestSellerProduct?.map((data) => (
            <SingleBestSeller data={data} key={data._id}></SingleBestSeller>
          ))}
        </Row>
      ) : (
        <div className="text-center my-5">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
    </Container>
  );
};

export default BestSellers;
