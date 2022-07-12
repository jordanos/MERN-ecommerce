import React from "react";
import StyledAuth from "./Styles";

interface Props {
  children: React.ReactNode;
}

const AuthCard: React.FC<Props> = ({ children }) => {
  return <StyledAuth>{children}</StyledAuth>;
};

export default AuthCard;
