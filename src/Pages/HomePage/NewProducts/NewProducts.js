import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Reduce/Slice/Slice";
import SingleBestSeller from "../SingleBestSeller/SingleBestSeller";
import "./NewProducts.css";

const NewProducts = () => {
  const [categroy, setCategroy] = useState("meat-seafood");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products.productsList[0]);

  const filterNewProducts = products?.filter(
    (product) => product.type === "new-products"
  );
  const filterCategroyProducts = filterNewProducts?.filter(
    (product) => product.categroy === categroy
  );

  // console.log(filterCategroyProducts);
  return (
    <section className="py-5">
      <Container>
        <div>
          <h1 className="fw-bold ">
            <span>New </span>
            <span className="text-red">Products </span>
          </h1>
        </div>
        <div>
          <nav>
            <ul className="nav justify-content-center">
              <li
                onClick={() => setCategroy("meat-seafood")}
                className="nav-item  cursor-pointor text-dark"
              >
                <span
                  to="breakfast"
                  className={
                    categroy === "meat-seafood"
                      ? "active-type-link nav-link"
                      : "nav-link"
                  }
                >
                  Meat-Seafood
                </span>
              </li>
              <li
                onClick={() => setCategroy("fruits-vegetables")}
                className="nav-item  cursor-pointor text-dark"
              >
                <span
                  to="breakfast"
                  className={
                    categroy === "fruits-vegetables"
                      ? "active-type-link nav-link"
                      : "nav-link"
                  }
                >
                  Fruits Vegetables
                </span>
              </li>
              <li
                onClick={() => setCategroy("bakery")}
                className="nav-item  cursor-pointor"
              >
                <span
                  to="breakfast"
                  className={
                    categroy === "bakery"
                      ? "active-type-link nav-link"
                      : "nav-link"
                  }
                >
                  bakery
                </span>
              </li>
            </ul>
          </nav>
        </div>
        {filterCategroyProducts?.length > 0 ? (
          <Row xs={2} md={3} lg={4} xxl={5} className="g-4">
            {filterCategroyProducts?.map((data) => (
              <SingleBestSeller data={data} key={data._id}></SingleBestSeller>
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

export default NewProducts;
