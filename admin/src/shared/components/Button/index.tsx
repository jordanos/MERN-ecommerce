import React from "react";
import Spinner from "../Spinner";
import StyledButton from "./Styles";

type Props = {
  width?: String;
  outline?: boolean;
  loading: boolean;
  children: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
  const { outline, width, children, loading } = props;

  return (
    <StyledButton style={{ width: `${width}` }} outline={outline}>
      {loading ? <Spinner size={24} /> : children}
    </StyledButton>
  );
};

Button.defaultProps = {
  width: "100%",
  outline: false,
};

export default Button;
