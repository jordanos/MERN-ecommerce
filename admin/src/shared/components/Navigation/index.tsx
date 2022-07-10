import ricaLogo from "core/assets/rica-logo.jpg";
import React from "react";
import { NavItem, StyledNav, StyledSubNav } from "./Styles";

const Navigation: React.FC = () => {
  return (
    <StyledNav>
      <StyledSubNav>
        <img
          style={{
            width: "34px",
            padding: "0 1em",
          }}
          src={ricaLogo}
          alt="rica logo"
        />
        <NavItem>Home</NavItem>
        <NavItem>Products</NavItem>
        <NavItem>Users</NavItem>
        <NavItem>Packages</NavItem>
        <NavItem>Cash flow</NavItem>
      </StyledSubNav>
      <StyledSubNav>
        <NavItem>Account</NavItem>
      </StyledSubNav>
    </StyledNav>
  );
};

export default Navigation;
