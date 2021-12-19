import React from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, isLoading } = UseAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }
  if (user.email && admin) {
    return children;
  } else {
    return (
      <div>
        <h1>You Are Not Admin Pls Go Back To Your dashboard</h1>
        <Link to="/dashboard">
          <button className="btn bg-red">DashBoard</button>
        </Link>
      </div>
    );
  }
};

export default AdminRoute;
