import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../Hooks/UseAuth";
import { fetchCart } from "../../Reduce/Slice/Slice";

const Cart = () => {
  const { user } = UseAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const cart = useSelector((state) => state.products.cartList[0]);
  const filterMyCart = cart?.filter((cart) => cart.userEmail === user?.email);
  return (
    <Container className="py-5">
      <div className="text-center fw-bold">
        <h1>
          You <span className="text-red">Cart</span>
        </h1>
      </div>
      <Row>
        <Col sm={12} md={7} lg={7}>
          {filterMyCart?.map((data) => console.log(data))}
        </Col>
        <Col sm={12} md={5} lg={5}>
          <h1>Cart Details</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
