import styled from "styled-components";

export const StyledNav = styled.nav`
  width: 100%;
  background: #2f2e44;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 100;
`;

export const StyledSubNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledNavItem = styled.div`
  padding: 1em 2em;

  &:hover {
    background: #41405b;
    cursor: pointer;
  }
`;
