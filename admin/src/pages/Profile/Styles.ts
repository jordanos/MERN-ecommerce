import styled from "styled-components";

export const StyledProfileItem = styled.div`
  padding: 0.25em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledProfileItemTitle = styled.div`
  width: 88px;
  margin-right: 1em;
  font-weight: 700;
`;

interface Props {
  color: string;
}
export const StyledCircle = styled.div<Props>`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  background: ${(props) => props.color};
`;
