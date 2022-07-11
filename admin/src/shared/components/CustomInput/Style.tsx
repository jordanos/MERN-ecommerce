import styled from "styled-components";

const StyledCustomInput = styled.input`
  background: transparent;
  font-size: 0.85rem;
  border: 1px solid gray;
  border-radius: 16px;
  padding: 0.5em 1em;

  &:focus {
    outline: none !important;
    border: 1px solid #17a2b8;
  }
`;

export default StyledCustomInput;
