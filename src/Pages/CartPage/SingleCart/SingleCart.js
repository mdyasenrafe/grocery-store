import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const SingleCart = (props) => {
  const { handleSubmit } = useForm();
  // props
  const { productName, productImage, price, quantity, _id } = props.data;
  // usestate
  const [show, setShow] = useState(false);
  const [editQuantity, setEditQuantity] = useState(quantity);
  // decrease Quantity
  const decreaseQuantity = () => {
    if (editQuantity > 1) {
      setEditQuantity(editQuantity - 1);
    } else {
      setEditQuantity(1);
    }
  };
  //onsubmit function
  const onSubmit = (data) => {
    data["quantity"] = editQuantity;
    axios
      .put(`https://grocery-store-api-y99i.onrender.com/cart/${_id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal(
            "Good job!",
            "Your Orders is Succesfully Edited",
            "success"
          ).then(() => window.location.reload());
        }
      });
  };
  // console.log(props.data);
  return (
    <div className="h-100 shadow-lg my-3 p-3 d-flex align-items-center justify-content-between text-center flex-wrap">
      <div>
        <img height={90} src={productImage} alt="" />
      </div>
      <div>
        <h4 className="text-red fw-bold">{productName}</h4>
        <p>
          Total Price :<span className="text-red fw-bold"> {price}</span>{" "}
        </p>
      </div>
      <div className="col-sm-3 col-md-3">
        <p>
          Product Price :
          <span className="text-red fw-bold"> {quantity * price}</span>
        </p>
        <p>
          Product Quantity :
          <span className="text-red fw-bold"> {quantity}</span>
        </p>
      </div>

      {show ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex align-items-center">
              <i
                onClick={() => setEditQuantity(editQuantity + 1)}
                className="fas fa-plus btn bg-red rounded-pill fw-bold"
              ></i>
              <span className="fs-3 px-2">{editQuantity}</span>
              <i
                onClick={decreaseQuantity}
                className="fas fa-minus  btn bg-red rounded-pill fw-bold"
              ></i>
            </div>
            <div className="text-center mt-3">
              {editQuantity === quantity ? (
                <input type="submit" className="btn btn-warning" disabled />
              ) : (
                <input type="submit" className="btn btn-warning" />
              )}
              <button
                onClick={() => setShow(false)}
                className="btn btn-outline-danger m-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h4>
            <i
              onClick={() => setShow(true)}
              className="fas fa-edit text-blue cursor-pointor"
            ></i>
          </h4>
          <h4>
            <i
              onClick={() => props.handleDelete(_id)}
              className="fas fa-trash text-danger cursor-pointor"
            ></i>
          </h4>
        </div>
      )}
    </div>
  );
};

export default SingleCart;
