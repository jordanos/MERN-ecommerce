import React from "react";
import StyledCardBody from "./Styles";

interface Props {
  children?: React.ReactNode;
}

const CardBody: React.FC<Props> = ({ children }) => {
  return <StyledCardBody>{children}</StyledCardBody>;
};

CardBody.defaultProps = {
  children: [],
};

export default CardBody;
