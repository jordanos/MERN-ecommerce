import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, To } from "react-router-dom";
import { getError } from "shared/helpers/ntw";
import useError from "shared/hooks/useError";
import { UserState } from "shared/store/reducers/userReducer";

interface Props {
  user: UserState;
  redirectPath?: To;
  setError: Function;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { user, redirectPath, setError } = props;

  if (user.token === null) {
    const error = new Error(`Please log in to access this route`);
    useError(getError(error), setError);
    return <Navigate to={redirectPath || "/login"} replace />;
  }
  return <Outlet />;
};

ProtectedRoute.defaultProps = {
  redirectPath: "/login",
};

const mapStateToProps = (state: any) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setError: (payload: any) => dispatch({ type: "SET_ERROR", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
