import React, { CSSProperties } from "react";
import ricaLogo from "shared/assets/rica-logo.jpg";
import AuthCard from "shared/components/AuthCard";
import StyledBox from "shared/components/Box/Styles";
import Button from "shared/components/Button";
import CustomInput from "shared/components/CustomInput/CustomInput";
import StyledLink from "shared/components/styles/StyledLink";

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

interface Props {
  handleSubmit: React.FormEventHandler;
  loading: boolean;
  inputs: any;
}

const LoginPageUi: React.FC<Props> = (props) => {
  const { handleSubmit, loading, inputs } = props;
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
        <form onSubmit={handleSubmit}>
          <CustomInput
            value={inputs.email}
            onChange={(e) => inputs.setEmail(e.target.value)}
            type="email"
            placeholder="Email ID"
          />
          <StyledBox height="1em" width="100%" />
          <CustomInput
            value={inputs.password}
            onChange={(e) => inputs.setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <StyledBox height="1em" width="100%" />
          <Button loading={loading}>
            <p>Sign In</p>
          </Button>
        </form>

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

export default LoginPageUi;
