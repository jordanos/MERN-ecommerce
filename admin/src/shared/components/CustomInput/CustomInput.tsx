import React from "react";
import StyledCustomInput from "./Style";

interface Props {
  placeholder?: string;
  type: string;
}

const CsutomInput: React.FC<Props> = ({ placeholder, type }) => {
  return <StyledCustomInput placeholder={placeholder} type={type} />;
};

CsutomInput.defaultProps = {
  placeholder: "",
};

export default CsutomInput;
