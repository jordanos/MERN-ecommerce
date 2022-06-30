import ricaLogo from "core/assets/rica-logo.jpg";
import AuthCard from "core/components/AuthCard";
import StyledBox from "core/components/Box/Styles";
import Button from "core/components/Button";
import CsutomInput from "core/components/CustomInput/CustomInput";
import StyledLink from "core/components/styles/StyledLink";
import React, { CSSProperties } from "react";

const adminBodyStyle: CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  background: "#f0f2f5",
  padding: "0 15%",
};

const loginOptionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const LoginPage: React.FC = () => {
  return (
    <div style={adminBodyStyle}>
      <AuthCard>
        <StyledBox height="1em" width="100%" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1em 0",
          }}
        >
          <img
            style={{
              width: "56px",
            }}
            src={ricaLogo}
            alt="rica logo"
          />
        </div>
        <div
          style={{
            padding: "1em 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
            }}
          >
            Sign in to start your session
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "gray",
            }}
          >
            Hi! Please enter your login information below to access the panel.
          </div>
        </div>
        <StyledBox height="1em" width="100%" />

        <CsutomInput type="email" placeholder="Email ID" />
        <StyledBox height="1em" width="100%" />
        <CsutomInput type="password" placeholder="Password" />
        <StyledBox height="1em" width="100%" />
        <Button>
          <p>Sign In</p>
        </Button>

        <StyledBox height="1em" width="100%" />
        <StyledBox height="1em" width="100%" />
        <StyledBox height="1em" width="100%" />
        <div style={loginOptionsStyle}>
          <span>
            <input
              style={{
                marginRight: "0.5em",
              }}
              type="checkbox"
            />
            Remember me
          </span>
          <StyledLink href="/">Forget Password?</StyledLink>
        </div>
      </AuthCard>
    </div>
  );
};

export default LoginPage;
