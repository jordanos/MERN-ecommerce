import React from "react";
import StyledCustomInput from "./Style";

type Props = {
  width?: String;
  placeholder?: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: any;
};

const CustomInput: React.FC<Props> = (props) => {
  const { width, placeholder, type, onChange, value } = props;
  return (
    <StyledCustomInput
      onChange={onChange}
      value={value}
      style={{ width: `${width}` }}
      placeholder={placeholder}
      type={type}
    />
  );
};

CustomInput.defaultProps = {
  width: "100%",
  placeholder: "",
};

export default CustomInput;
