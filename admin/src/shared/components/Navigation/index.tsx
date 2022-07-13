import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ricaLogo from "shared/assets/rica-logo.jpg";
import { StyledNav, StyledNavItem, StyledSubNav } from "./Styles";

const Navigation: React.FC = () => {
  return (
    <StyledNav>
      <StyledSubNav>
        <img
          style={{
            width: "64px",
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
          <StyledNavItem>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IoPersonOutline size="24px" color="white" />
              <div style={{ width: "12px" }} />
              Profile
            </div>
          </StyledNavItem>
        </Link>
      </StyledSubNav>
    </StyledNav>
  );
};

export default Navigation;
