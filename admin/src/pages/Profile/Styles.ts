import { colors } from "shared/utils/Styles";
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

export const StyledModalContainer = styled.div`
  width: 420px;
  height: 100%;
  border-radius: 8px;
  padding: 1em;
  background: ${colors.backgroundLightest};
  margin-right: 1em;
  font-weight: 700;
`;

export const StyledModalItem = styled.div`
  padding: 0.5em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledModalFixedWidth = styled.div`
  width: 100px;
  padding: 0.5em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
