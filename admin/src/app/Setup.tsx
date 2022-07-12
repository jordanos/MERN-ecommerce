import React, { lazy } from "react";
import Loader from "shared/components/Loader";
import BaseStyles from "./BaseStyles";
import "./fontStyles.css";
import Init from "./Init";
import NormalizeStyles from "./NormalizeStyles";

const AppRoutes = lazy(() => import("./routes"));

const Setup: React.FC = () => {
  return (
    <>
      <NormalizeStyles />
      <BaseStyles />
      <Init />
      <Loader>
        <AppRoutes />
      </Loader>
    </>
  );
};

export default Setup;
