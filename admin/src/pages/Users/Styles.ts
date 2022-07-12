import { colors } from "shared/utils/Styles";
import styled from "styled-components";

export const StyledUserCard = styled.div`
  width: 720px;
  height: 120px;
  display: flex;
  flex-direction: row;
  background: ${colors.backgroundLightest};
  margin: 1em 0;
`;

export const StyledUserImage = styled.img`
  width: 120px;
  max-height: 120px;
  padding: 1em 1em;
`;

export const StyledUserInfo = styled.div`
  width: 720px;
  max-height: 300px;
  padding: 1em 1em;
  display: flex;
  flex-direction: column;
  background: ${colors.backgroundLightest};
`;
