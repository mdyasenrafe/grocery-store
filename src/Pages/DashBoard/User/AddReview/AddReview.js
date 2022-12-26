import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import UseAuth from "../../../../Hooks/UseAuth";

const AddReview = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("https://grocery-store-api-y99i.onrender.com/reviews", data)
      .then((res) => {
        if (res.data.acknowledged) {
          swal("Your Review has been Added", {
            icon: "success",
          });
          navigate("/home");
        }
      });
  };
  return (
    <section>
      <div className="fw-bold text-center mb-3">
        <h1>
          Please Add An <span className="text-red">Review</span>
        </h1>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="mx-3">
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your name"
          className="mb-3"
        >
          <Form.Control
            defaultValue={user?.displayName || ""}
            {...register("name", { required: true })}
            type="name"
            placeholder="name"
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Image Link"
          className="mb-3"
        >
          <Form.Control
            {...register("userImage", { required: true })}
            type="text"
            placeholder="Enter Your Image"
            className="mb-3"
          />

          {errors.userImage && (
            <span className="text-danger my-3">This field is required</span>
          )}
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your work"
          className="mb-3"
        >
          <Form.Control
            {...register("work", { required: true })}
            type="text"
            placeholder="work"
            className="mb-3"
          />

          {errors.work && (
            <span className="text-danger my-3">This field is required</span>
          )}
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea2"
          label="Enter Your Description"
        >
          <Form.Control
            {...register("description", { required: true })}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            className="mb-3"
          />
          {errors.description && (
            <span className="text-danger my-3">This field is required</span>
          )}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Enter Your Rating"
          className="mb-3"
        >
          <Form.Control
            type="number"
            {...register("rating", { required: true, min: 0, max: 5 })}
            placeholder="Enter Your Rating here"
            className="mb-3"
          />
        </FloatingLabel>
        {errors?.rating?.type === "required" && (
          <span className="text-danger my-3">This field is required</span>
        )}
        {errors?.rating?.type === "min" && (
          <span className="text-danger my-3">
            You Must be older then 0 and younger then 5 stars
          </span>
        )}
        {errors?.rating?.type === "max" && (
          <span className="text-danger my-3">
            You Rating must be older then 0 and younger then 5 stars
          </span>
        )}
        <input
          type="submit"
          className="btn btn-outline-danger my-4 w-100 d-block"
        />
      </Form>
    </section>
  );
};

export default AddReview;
