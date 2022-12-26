import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import UseAuth from "../../../Hooks/UseAuth";
import axios from "axios";

const Resigter = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  //   get value from use auth
  const {
    setUser,
    error,
    setError,
    setIsLoading,
    handleCreateEmail,
    updateUserInfo,
    handleWithGoogle,
  } = UseAuth();
  // location and navigate
  const location = useLocation();
  const navigate = useNavigate();
  // redirect auth
  const redirectUrl = location.state?.from?.pathname || "/home";
  // handle google sign in
  const onSubmit = (data) => {
    handleCreateEmail(data.email, data.password)
      .then((result) => {
        reset();
        navigate(redirectUrl);
        setUser(result?.user);
        updateUserInfo(data.name);
        setError("");
        setIsLoading(false);
        axios
          .post("https://grocery-store-api-y99i.onrender.com/users", data)
          .then((res) => {
            if (res.data.acknowledged) {
              swal(
                "Good job!",
                "Your Aceount is Succesfully Resigter now",
                "success"
              );
            }
          });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  //   google sign in button
  const handleGoogleSigninBtn = () => {
    handleWithGoogle()
      .then((res) => {
        setUser(res?.user);
        navigate(redirectUrl);
        swal("Good job!", "Your Aceount is Succesfully Log in now", "success");
        const data = {
          name: res?.user?.displayName,
          email: res?.user?.email,
        };
        axios
          .put("https://grocery-store-api-y99i.onrender.com/users", data)
          .then((res) => {
            console.log("aceount create suceefully");
          });
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };
  return (
    <section className="container py-4 px-4">
      <div className="text-center pb-4">
        <h1 className="fw-bold">
          <span className="text-danger">Sign</span>
          <span> Up</span>
        </h1>
      </div>
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <img
            className="w-100"
            src="https://i.ibb.co/4SW4LP0/signup.jpg"
            alt=""
          ></img>
        </Col>
        <Col xs={12} md={6} className="mt-4 mt-md-0">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Your Name"
              className="mb-3"
            >
              <Form.Control
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
              />
            </FloatingLabel>
            {errors.name && (
              <span className="fw-bold text-danger d-block my-3">
                This field is required
              </span>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Your Email"
              className="mb-3"
            >
              <Form.Control
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
              />
            </FloatingLabel>
            {errors.email && (
              <span className="fw-bold text-danger d-block my-3">
                This field is required
              </span>
            )}
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Your Password"
              className="mb-3"
            >
              <Form.Control
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
              />
            </FloatingLabel>
            {errors.password && (
              <span className="fw-bold text-danger d-block my-3">
                This field is required
              </span>
            )}
            <FloatingLabel
              controlId="floatingPassword1"
              label="Enter Your Re-Password"
              className="Enter Your Password"
            >
              <Form.Control
                type="password"
                placeholder="Password_repeat"
                {...register("password_repeat", {
                  required: true,
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            </FloatingLabel>
            {errors.password_repeat?.type === "required" && (
              <span className="text-danger d-block fw-bold my-3">
                This field is required
              </span>
            )}
            {errors.password_repeat?.type === "validate" && (
              <span className="text-danger d-block fw-bold my-3">
                The passwords do not match
              </span>
            )}
            <input
              type="submit"
              className="btn btn-outline-danger my-3 w-100"
            />
          </Form>
          <p className="text-danger">{error}</p>
          <p>
            Have any Aceount? <Link to="/login">Log in Here</Link>
          </p>
          <button onClick={handleGoogleSigninBtn} className="btn bg-red w-100">
            Sign in with gogle
          </button>
        </Col>
      </Row>
    </section>
  );
};

export default Resigter;
