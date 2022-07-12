import { colors } from "shared/utils/Styles";
import styled from "styled-components";

export const StyledProductCard = styled.div`
  width: 720px;
  height: 260px;
  display: flex;
  flex-direction: column;
  background: ${colors.backgroundLightest};
  margin: 1em 0;
`;

export const StyledProductCardImages = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  flex-direction: row;
  background: ${colors.backgroundLightest};
  border-bottom: 1px solid ${colors.backgroundMedium};
`;
