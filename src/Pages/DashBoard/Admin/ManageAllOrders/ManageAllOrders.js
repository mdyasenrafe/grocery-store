import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import swal from "sweetalert";
import UseAuth from "../../../../Hooks/UseAuth";
import LoadingSpiner from "../../../Shared/LoadingSpiners/LoadingSpiners";

const ManageAllOrders = () => {
  const { user } = UseAuth();
  const [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://grocery-store-api-y99i.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
        setLoading(false);
      });
  }, []);

  const handleApporve = (data) => {
    data["status"] = "apporve";
    swal({
      title: "Are you sure want to Apporve this Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(
            `https://grocery-store-api-y99i.onrender.com/orders/${data._id}`,
            data
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              swal({
                text: `${data?.userName} order has been Approved`,
                icon: "success",
              }).then(() => window.location.reload());
            }
          });
      }
    });
  };

  return (
    <div>
      <section>
        <div className="fw-bold text-center mb-4">
          <h1>Manage All Orders</h1>
        </div>
        {loading ? (
          <LoadingSpiner loading={loading}></LoadingSpiner>
        ) : (
          <Container>
            {orders.length == 0 ? (
              <h1 className="text-danger pt-4">Nothing to cart</h1>
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    {[
                      "user Name",
                      "user Email",
                      "user P.h Number",
                      "user Address",
                      "product id",
                      "product Name",
                      "Product Price",
                      "Order Status",
                    ].map((data) => (
                      <th key={data}>{data}</th>
                    ))}
                  </tr>
                </thead>
                {orders.map((data) => (
                  <tbody key={data._id} className="border-top-0">
                    <tr className="border-0 shadow-lg mt-4">
                      <td className="table-data" scope="row">
                        {data.userName}
                      </td>
                      <td>{data?.email}</td>
                      <td>{data?.number}</td>
                      <td>{data?.address}</td>

                      <td>
                        {data?.productId?.map((id) => (
                          <p>{id}</p>
                        ))}
                      </td>
                      <td>
                        {data?.productName?.map((name) => (
                          <p>{name}</p>
                        ))}
                      </td>
                      <td>
                        {data?.productPrice?.map((price) => (
                          <p>{price}</p>
                        ))}
                      </td>
                      <td>
                        {data?.status} <br />
                        {data?.status === "apporve" ? (
                          <button className="btn bg-red mx-3" disabled>
                            Apporve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApporve(data)}
                            className="btn bg-red mx-3"
                          >
                            Apporve
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            )}
          </Container>
        )}
      </section>
    </div>
  );
};

export default ManageAllOrders;
