import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "shared/features/auth/authSlice";

const ProtectedRoute: React.FC = () => {
  const auth: Auth = useSelector((state: any) => state.auth);

  if (!auth.isLogged) {
    const error = new Error(`Please log in to access this route`);
    // useError(getError(error), setError);
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

ProtectedRoute.defaultProps = {
  redirectPath: "/login",
};

export default ProtectedRoute;
