import { colors } from "shared/utils/Styles";
import styled from "styled-components";
import { StyledCardBase } from "../styles/BaseStyles";

const StyledSmallCard = styled(StyledCardBase)`
  height: 160px;
  width: 220px;
  position: relative;
  background: white;
`;

export const StyledOptionsItem = styled.div`
  padding: 0.5em 0.25em;
  border-bottom: 1px solid;

  &:hover {
    background: ${colors.backgroundMedium};
    cursor: pointer;
  }
`;

export const StyledClickableDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default StyledSmallCard;
