import React from "react";
import { colors } from "shared/constants/Styles";
import StyledCardHeader from "./Styles";

interface Props {
  children: React.ReactNode;
}

const CardHeader: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <StyledCardHeader>{children}</StyledCardHeader>
      <div
        style={{
          width: "32px",
          height: "5px",
          background: colors.warning,
          marginTop: "0.5em",
          position: "absolute",
        }}
      />
    </div>
  );
};

export default CardHeader;
