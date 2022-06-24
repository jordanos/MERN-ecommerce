import ricaLogo from "core/assets/rica-logo.jpg";
import React from "react";
import HomeMain from "./HomeMain";
import { NavItem, StyledNav, StyledSubNav } from "./Styles";

const HomePage: React.FC = () => {
  return (
    <div>
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
        </StyledSubNav>
        <StyledSubNav>
          <NavItem>Account</NavItem>
        </StyledSubNav>
      </StyledNav>
      <main
        style={{
          marginTop: "2em",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <HomeMain />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default HomePage;
