import React from "react";
import StyledLargeCard from "./Styles";

interface Props {
  children?: React.ReactNode;
}

const LargeCard: React.FC<Props> = ({ children }) => {
  return <StyledLargeCard>{children}</StyledLargeCard>;
};

LargeCard.defaultProps = {
  children: [],
};

export default LargeCard;
