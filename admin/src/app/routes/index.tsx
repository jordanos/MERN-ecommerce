import Home from "pages/Home";
import Login from "pages/Login";
import Packages from "pages/Packages";
import Products from "pages/Products";
import Profile from "pages/Profile";
import Users from "pages/Users";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "shared/components/Navigation";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  const isLogged = useSelector((state: any) => state.auth.isLogged);
  return (
    <Router>
      {isLogged && <Navigation />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
