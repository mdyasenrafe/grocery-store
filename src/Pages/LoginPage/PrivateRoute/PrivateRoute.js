import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";

const PrivateRoute = ({ children, ...rest }) => {
  let { user, isLoading } = UseAuth();
  let location = useLocation();
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
