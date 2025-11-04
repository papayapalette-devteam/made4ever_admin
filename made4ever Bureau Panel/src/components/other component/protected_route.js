// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate,Outlet  } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");


  // If token missing or user not found, redirect to SignIn
  if (!token || !user?.email) {
    return <Navigate to="/" replace />;
  }

  // return children;
  return <Outlet />;
};

export default ProtectedRoute;
