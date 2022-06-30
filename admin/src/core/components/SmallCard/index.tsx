import React from "react";
import StyledSmallCard from "./Styles";

interface Props {
  children?: React.ReactNode;
}

const SmallCard: React.FC<Props> = ({ children }) => {
  return <StyledSmallCard>{children}</StyledSmallCard>;
};

SmallCard.defaultProps = {
  children: [],
};

export default SmallCard;
