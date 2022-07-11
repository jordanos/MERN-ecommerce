import React from "react";
import { Link } from "react-router-dom";
import ricaLogo from "shared/assets/rica-logo.jpg";
import { StyledNav, StyledNavItem, StyledSubNav } from "./Styles";

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

        <Link to="/home">
          <StyledNavItem>Home</StyledNavItem>
        </Link>

        <Link to="/users">
          <StyledNavItem>Users</StyledNavItem>
        </Link>

        <Link to="/products">
          <StyledNavItem>Products</StyledNavItem>
        </Link>

        <Link to="/packages">
          <StyledNavItem>Packages</StyledNavItem>
        </Link>
      </StyledSubNav>
      <StyledSubNav>
        <Link to="/profile">
          <StyledNavItem>Profile</StyledNavItem>
        </Link>
      </StyledSubNav>
    </StyledNav>
  );
};

export default Navigation;
