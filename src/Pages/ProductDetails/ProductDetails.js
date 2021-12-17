import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../../Reduce/Slice/Slice";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import swal from "sweetalert";

const ProductDetails = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quantity, setQuantity] = useState(1);
  const decreaseQuatntity = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  // use navigate
  const navigate = useNavigate();
  //   onsubmit function
  const onSubmit = (data) => {
    data["quantity"] = quantity;
    data["price"] = findProduct?.price * quantity;
    data["productName"] = findProduct?.name;
    data["productImage"] = findProduct?.photo;
    data["userEmail"] = user?.email;
    data["userName"] = user?.displayName;
    console.log("handle submit", data);
    axios.post("http://localhost:5000/cart", data).then((res) => {
      if (res.data.acknowledged) {
        swal("Good job!", "Your Orders is Succesfully Orderd", "success");
        navigate("/cart");
      }
    });
  };
  const products = useSelector((state) => state.products.productsList[0]);
  const findProduct = products?.find((product) => product._id === id);
  return (
    <section className="py-5 mx-4 mx-md-0">
      <Container>
        {findProduct?.name ? (
          <Row className="align-items-center flex-row-reverse">
            <Col sm={12} md={6}>
              <img className="w-100" src={findProduct?.photo} alt="" />
            </Col>
            <Col sm={12} md={6}>
              <h1 className="fw-bold text-red">{findProduct?.name}</h1>
              <p>{findProduct?.description}</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex align-items-center">
                  <h3 className="fw-bold fs-2 pt-2">
                    ${findProduct?.price * quantity}
                  </h3>
                  <div className="d-flex align-items-center ms-5">
                    <i
                      onClick={() => setQuantity(quantity + 1)}
                      className="fas fa-plus btn btn-danger rounded-pill fw-bold"
                    ></i>
                    <span className="fs-3 ps-2">{quantity}</span>
                    <i
                      onClick={decreaseQuatntity}
                      className="fas fa-minus  btn btn-danger rounded-pill fw-bold"
                    ></i>
                  </div>
                </div>

                <input
                  type="submit"
                  className="btn btn-danger  rounded-pill text-light px-4 mt-4"
                  value="Add to Cart"
                />
              </form>
            </Col>
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

export default ProductDetails;
