import { mixin } from "core/utils/Styles";
import styled from "styled-components";

interface Props {
  outline?: boolean;
  bg?: string;
  color?: string;
}

const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.color ? props.color : "white")};
  border-radius: 50px;
  border: 0px solid transparent;
  padding: 1em 2em;
  font-size: 1rem;
  ${mixin.clickable};
  ${(props) =>
    props.outline
      ? `
border: 2px solid ${props.bg ? props.bg : "#399af2"};
`
      : `
background: ${props.bg ? props.bg : "#399af2"};
`};

  &:hover {
    -webkit-box-shadow: 0px -1px 23px 0px rgba(23, 162, 184, 0.5);
    -moz-box-shadow: 0px -1px 23px 0px rgba(23, 162, 184, 0.5);
    box-shadow: 0px -1px 23px 0px rgba(23, 162, 184, 0.5);
  }

  &:active {
    -webkit-box-shadow: 0px 0px 0px 0px rgba(23, 162, 184, 0.5);
    -moz-box-shadow: 0px 0px 0px 0px rgba(23, 162, 184, 0.5);
    box-shadow: 0px 0px 0px 0px rgba(23, 162, 184, 0.5);
  }
`;

export default StyledButton;
