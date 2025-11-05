// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate,Outlet  } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");



  // If token missing or user not found, redirect to SignIn
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // return children;
  return <Outlet />;
};

export default ProtectedRoute;
