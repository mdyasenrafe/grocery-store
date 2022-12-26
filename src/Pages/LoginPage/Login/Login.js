import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import UseAuth from "../../../Hooks/UseAuth";
import UseFirebase from "../../../Hooks/UseFirebase";
import axios from "axios";

const Login = () => {
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    handleWithGoogle,
    setUser,
    setIsLoading,
    setError,
    error,
    hanldleSignInEmail,
  } = UseAuth();
  // location and navigate
  const location = useLocation();
  const navigate = useNavigate();
  // redirect auth
  const redirectUrl = location.state?.from?.pathname || "/home";
  // on submit function
  const onSubmit = (data) => {
    hanldleSignInEmail(data.email, data.password)
      .then((result) => {
        navigate(redirectUrl);
        setUser(result?.user);
        setError("");
        setIsLoading(false);
        swal("Good job!", "Your Aceount is Succesfully Log in now", "success");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  // handle google sign in button
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
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <section>
      <Container>
        <div className="text-center pb-4">
          <h1 className="fw-bold">
            <span className="text-danger">Sign </span>
            <span>In</span>
          </h1>
        </div>
        <Row className="align-items-center flex-row-reverse">
          <Col sm={12} md={6} className="text-center">
            <img
              className="w-100 pb-5"
              src="https://i.ibb.co/JHwpvhF/Tablet-login-cuate.png"
              alt=""
            />
          </Col>
          <Col sm={12} md={6}>
            <div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter Your Email"
                  className="mb-3"
                >
                  <Form.Control
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="mb-3"
                  />
                </FloatingLabel>
                {errors.email && (
                  <span className="text-danger my-3">
                    This field is required
                  </span>
                )}
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Enter Your Password"
                  className="Enter Your Password mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </FloatingLabel>
                {errors.password && (
                  <span className="text-danger my-3">
                    This field is required
                  </span>
                )}
                <input
                  type="submit"
                  className="btn btn-outline-danger my-4 w-100 d-block"
                />
              </Form>
              {error && <p className="my-3 text-danger">{error}</p>}
              <p>
                Don't Have any Aceount?{" "}
                <Link to="/resigter">Resigter Here</Link>
              </p>
              <button
                onClick={handleGoogleSigninBtn}
                className="btn bg-red w-100"
              >
                Sign in with gogle
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
