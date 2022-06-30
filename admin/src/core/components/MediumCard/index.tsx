import React from "react";
import StyledMediumCard from "./Styles";

interface Props {
  children?: React.ReactNode;
}

const MediumCard: React.FC<Props> = ({ children }) => {
  return <StyledMediumCard>{children}</StyledMediumCard>;
};

MediumCard.defaultProps = {
  children: [],
};

export default MediumCard;
