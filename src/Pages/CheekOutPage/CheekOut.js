import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import UseAuth from "../../Hooks/UseAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Reduce/Slice/Slice";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const { user } = UseAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const cart = useSelector((state) => state.products.cartList[0]);
  const filterMyCart = cart?.filter((cart) => cart.userEmail === user?.email);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  let onSubmit = (data) => {
    data["status"] = "pending";
    data["productId"] = filterMyCart.map((data) => data.productId);
    axios.post("http://localhost:5000/orders", data).then((res) => {
      if (res.data.acknowledged) {
        swal(
          "Good job!",
          "Your Orders is Succesfully Order now",
          "success"
        ).then(() => window.location.reload(false));
        navigate("/dashboard/my-orders");
      }
    });
    //   console.log(typeof user?.email);
    fetch(`http://localhost:5000/carts/${user?.email.trim()}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
        }
      });
  };
  // };
  return (
    <section className="py-5 px-4 px-sm-4 px-md-0 container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Name"
          className="mb-3"
        >
          <Form.Control
            defaultValue={user?.displayName}
            {...register("userName", { required: true })}
            type="text"
            placeholder="name@example.com"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Email"
          className="mb-3"
        >
          <Form.Control
            defaultValue={user?.email}
            {...register("email", { required: true })}
            type="email"
            placeholder="name@example.com"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Address"
          className="mb-3"
        >
          <Form.Control
            {...register("address", { required: true })}
            type="text"
            placeholder="name@example.com"
          />
        </FloatingLabel>
        {errors.address && (
          <span className="fw-bold text-red d-block my-3">
            This field is required
          </span>
        )}
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Phone Number"
          className="mb-3"
        >
          <Form.Control
            {...register("number", { required: true })}
            type="number"
            placeholder="name@example.com"
          />
        </FloatingLabel>
        {errors.number && (
          <span className="fw-bold text-red d-block my-3">
            This field is required
          </span>
        )}

        <input type="submit" className="btn bg-red my-3 w-100" />
      </Form>
    </section>
  );
};

export default CheckOut;
