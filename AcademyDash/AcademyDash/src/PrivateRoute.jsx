import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, isLoading, user, hasRole } = useContext(AuthContext);

  if (isLoading) return null;

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0) {
    const allowed =
      typeof hasRole === "function"
        ? hasRole(...requiredRoles)
        : user && requiredRoles.includes(user.acesso);

    if (!allowed) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
