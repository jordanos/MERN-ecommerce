import React from "react";
import { CgProfile } from "react-icons/cg";
import { Admin } from "shared/features/auth/authSlice";
import { colors } from "shared/utils/Styles";
import {
  StyledCircle,
  StyledProfileItem,
  StyledProfileItemTitle,
} from "./Styles";

type Props = {
  admin: Admin;
};

const ProfileInfo: React.FC<Props> = ({ admin }) => {
  return (
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
      <div>
        <CgProfile />
      </div>
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
  );
};

export default ProfileInfo;
