import React from "react";
import { useSelector } from "react-redux";
import { Admin } from "shared/features/auth/authSlice";
import { colors } from "shared/utils/Styles";
import {
  StyledCircle,
  StyledProfileItem,
  StyledProfileItemTitle,
} from "./Styles";

const Profile: React.FC = () => {
  const admin: Admin = useSelector((state: any) => state.auth.admin);
  if (!admin) {
    return <p>Something went wrong while getting admin data</p>;
  }
  return (
    <main
      style={{
        padding: "0 1em",
      }}
    >
      <div
        style={{
          width: "326px",
          borderRadius: "8px",
          background: `${colors.backgroundLightest}`,
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          margin: "1em 0",
        }}
      >
        <StyledProfileItem>
          <StyledProfileItemTitle>Email</StyledProfileItemTitle>
          <p>{admin.email}</p>
        </StyledProfileItem>

        <StyledProfileItem>
          <StyledProfileItemTitle>Read</StyledProfileItemTitle>
          {admin.read ? (
            <StyledCircle color={colors.success} />
          ) : (
            <StyledCircle color={colors.danger} />
          )}
        </StyledProfileItem>

        <StyledProfileItem>
          <StyledProfileItemTitle>Write</StyledProfileItemTitle>
          {admin.write ? (
            <StyledCircle color={colors.success} />
          ) : (
            <StyledCircle color={colors.danger} />
          )}
        </StyledProfileItem>

        <StyledProfileItem>
          <StyledProfileItemTitle>Add Admin</StyledProfileItemTitle>
          {admin.addAdmin ? (
            <StyledCircle color={colors.success} />
          ) : (
            <StyledCircle color={colors.danger} />
          )}
        </StyledProfileItem>

        <StyledProfileItem>
          <StyledProfileItemTitle>Remove Admin</StyledProfileItemTitle>
          {admin.removeAdmin ? (
            <StyledCircle color={colors.success} />
          ) : (
            <StyledCircle color={colors.danger} />
          )}
        </StyledProfileItem>

        <StyledProfileItem>
          <StyledProfileItemTitle>Super Admin</StyledProfileItemTitle>
          {admin.super ? (
            <StyledCircle color={colors.success} />
          ) : (
            <StyledCircle color={colors.danger} />
          )}
        </StyledProfileItem>
      </div>
    </main>
  );
};

export default Profile;
