import React from "react";
import Spinner from "../Spinner";
import StyledButton from "./Styles";

type Props = {
  width?: String;
  outline?: boolean;
  loading: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Button: React.FC<Props> = (props) => {
  const { outline, width, children, loading, onClick } = props;

  return (
    <StyledButton
      style={{ width: `${width}` }}
      outline={outline}
      onClick={onClick}
    >
      {loading ? <Spinner size={24} /> : children}
    </StyledButton>
  );
};

Button.defaultProps = {
  width: "100%",
  outline: false,
  onClick: () => {},
};

export default Button;
