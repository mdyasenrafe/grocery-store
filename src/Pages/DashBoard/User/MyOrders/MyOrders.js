import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import UseAuth from "../../../../Hooks/UseAuth";
import LoadingSpiner from "../../../Shared/LoadingSpiners/LoadingSpiners";

const MyOrders = () => {
  const { user } = UseAuth();
  const [myOrders, setMyOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://grocery-store-api-y99i.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data.data);
        setLoading(false);
      });
  }, []);

  const filterMyOrders = myOrders.filter(
    (product) => product?.email === user?.email
  );
  console.log(filterMyOrders);
  return (
    <div>
      <section>
        <div className="fw-bold text-center mb-4">
          <h1>My Orders</h1>
        </div>
        {loading ? (
          <LoadingSpiner loading={loading}></LoadingSpiner>
        ) : (
          <Container>
            {myOrders.length == 0 ? (
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
                {filterMyOrders.map((data) => (
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
                      <td>{data?.status}</td>
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

export default MyOrders;
