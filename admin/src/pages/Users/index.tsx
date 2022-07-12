import {
  StyledCircle,
  StyledProfileItem,
  StyledProfileItemTitle,
} from "pages/Profile/Styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "shared/constants/const";
import { createNotification } from "shared/features/notify/notifySlice";
import { initUsers, User } from "shared/features/users/usersSlice";
import useQuery from "shared/hooks/useQuery";
import { colors } from "shared/utils/Styles";
import { StyledUserCard, StyledUserImage, StyledUserInfo } from "./Styles";

const Users: React.FC = () => {
  const users = useSelector((state: any) => state.users.users);
  const query = useQuery("get", `${baseUrl}/users`);
  useEffect(() => {
    query.execute();
  }, []);

  const dispatch = useDispatch();
  if (query.data) {
    dispatch(initUsers(query.data));
  }

  if (query.error) {
    dispatch(createNotification(query.error));
  }

  return (
    <main
      style={{
        padding: "1em 1em",
      }}
    >
      {users.map((user: User) => {
        return (
          <StyledUserCard key={user.id}>
            <StyledUserImage src={user.image} />
            <StyledUserInfo>
              <StyledProfileItem>
                <StyledProfileItemTitle>Name:</StyledProfileItemTitle>
                <p>{`${user.firstName} ${user.lastName}`}</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>Phone:</StyledProfileItemTitle>
                <p>{`+${user.phone}`}</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>Address:</StyledProfileItemTitle>
                <p>{`${user.address}`}</p>
              </StyledProfileItem>
            </StyledUserInfo>
            <StyledUserInfo>
              <StyledProfileItem>
                <StyledProfileItemTitle>Balance:</StyledProfileItemTitle>
                <p>{`${user.balance}`}</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>isVerified:</StyledProfileItemTitle>
                {user.isVerified ? (
                  <StyledCircle color={colors.success} />
                ) : (
                  <StyledCircle color={colors.danger} />
                )}
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>isActive:</StyledProfileItemTitle>
                {user.status === "active" ? (
                  <StyledCircle color={colors.success} />
                ) : (
                  <StyledCircle color={colors.danger} />
                )}
              </StyledProfileItem>
            </StyledUserInfo>
          </StyledUserCard>
        );
      })}
    </main>
  );
};

export default Users;
