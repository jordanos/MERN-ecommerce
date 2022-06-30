import styled from "styled-components";

interface Props {
  width: string;
  height: string;
}

const StyledBox = styled.div<Props>`
  width: ${(props) => props.width ?? 0};
  height: ${(props) => props.height ?? 0};
`;

export default StyledBox;
