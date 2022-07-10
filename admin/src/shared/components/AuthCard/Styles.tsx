import styled from "styled-components";

interface Props {
  backgroundColor?: string;
}

const StyledAuth = styled.div<Props>`
  width: 320px;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.backgroundColor ?? "white"};
  border-radius: 8px;
  padding: 1em 1.5em;
`;

export default StyledAuth;
