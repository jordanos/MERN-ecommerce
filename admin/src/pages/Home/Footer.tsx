import React, { CSSProperties } from "react";
import { colors } from "shared/constants/Styles";

const footerStyle: CSSProperties = {
  width: "100%",
  height: "120px",
  background: colors.backgroundFooter,
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "space-beetween",
  padding: "1em 2em",
};

const Footer: React.FC = () => {
  return (
    <div style={footerStyle}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  );
};

export default Footer;
