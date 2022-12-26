import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import UseAuth from "../../Hooks/UseAuth";
import { fetchCart } from "../../Reduce/Slice/Slice";
import SingleCart from "./SingleCart/SingleCart";

const Cart = () => {
  const { user } = UseAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const cart = useSelector((state) => state.products.cartList[0]);
  const filterMyCart = cart?.filter((cart) => cart.userEmail === user?.email);
  // handle Delete Function
  const handleDelete = (id) => {
    swal({
      title: `Are you sure want to Delete ${user?.displayName} order`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://grocery-store-api-y99i.onrender.com/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              swal(`Your Order has been Delete now`, {
                icon: "success",
              }).then(() => window.location.reload());
            }
          });
      }
    });
  };
  let price = 0;
  let tax = 0;
  let deliveryFee = 5;

  if (filterMyCart) {
    for (const data of filterMyCart) {
      console.log(data);
      price = data.quantity * data.price + price;
      tax = (12 / 100) * price;
      deliveryFee = 5;
    }
  }
  return (
    <Container className="py-5">
      <div className="text-center fw-bold mb-4">
        <h1>
          You <span className="text-red">Cart</span>
        </h1>
      </div>
      {filterMyCart ? (
        <>
          {filterMyCart?.length > 0 ? (
            <>
              {filterMyCart?.map((data) => (
                <SingleCart
                  data={data}
                  key={data._id}
                  handleDelete={handleDelete}
                ></SingleCart>
              ))}
              <div className="py-5">
                <div className="d-flex justify-content-between">
                  <h5>Total :</h5> <h5 className="fw-bolder">$ {price}</h5>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <h5> Tax :</h5>{" "}
                    <h5 className="fw-bolder">${tax.toFixed(2)}</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5> Delivery Fee :</h5>{" "}
                    <h5 className="fw-bolder">${deliveryFee}</h5>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5> Grand Total : </h5>
                    <h5 className="fw-bolder">
                      ${(tax + price + deliveryFee).toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="py-4 text-center">
                <Link to="/checkout">
                  <button className="btn bg-red w-100">
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <h1>Nothing To Cart</h1>
            </div>
          )}
        </>
      ) : (
        <div className="text-center my-5">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
    </Container>
  );
};

export default Cart;
