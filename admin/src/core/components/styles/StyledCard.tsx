import styled from "styled-components";

export const StyledCardBase = styled.div`
  background: white;
  padding: 1em 1.5em;
  border-radius: 8px;
  margin: 1em;
`;

export const StyledSmallCard = styled(StyledCardBase)`
  height: 100px;
  width: 180px;
`;

export const StyledMediumCard = styled(StyledCardBase)`
  height: 220px;
  width: 180px;
`;

export const StyledMediumLargCard = styled(StyledCardBase)`
  height: 100%;
  width: 180px;
`;

export const StyledLargCard = styled(StyledCardBase)`
  height: 480px;
  width: 820px;
`;
