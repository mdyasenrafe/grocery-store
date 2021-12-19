import React from "react";
import useAuth from "../../../Hooks/UseAuth";

const DashboardHome = () => {
  const { user, admin } = useAuth();
  return (
    <div>
      <h1>
        Welcome to <span className="text-red">{user?.displayName}</span>{" "}
        {admin ? "Admin" : "user"} DashBoard home
      </h1>
    </div>
  );
};

export default DashboardHome;
