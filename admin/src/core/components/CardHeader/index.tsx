import { colors } from "core/constants/Styles";
import React from "react";
import StyledCardHeader from "./Styles";

interface Props {
  title: String;
  count?: Number | null;
}

const CardHeader: React.FC<Props> = ({ title, count }) => {
  return (
    <div>
      <StyledCardHeader>
        <h4>{title}</h4>
        {count && <h1 style={{ fontWeight: "normal" }}>{`${count}`}</h1>}
      </StyledCardHeader>
      <div
        style={{
          width: "32px",
          height: "5px",
          background: colors.warning,
          marginTop: "0.5em",
        }}
      />
    </div>
  );
};

CardHeader.defaultProps = {
  count: null,
};

export default CardHeader;
