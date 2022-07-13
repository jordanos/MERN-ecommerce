import {
  StyledProfileItem,
  StyledProfileItemTitle,
} from "pages/Profile/Styles";
import {
  StyledUserCard,
  StyledUserImage,
  StyledUserInfo,
} from "pages/Users/Styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "shared/constants/const";
import { createNotification } from "shared/features/notify/notifySlice";
import { initPackages, Package } from "shared/features/packages/packagesSlice";
import useQuery from "shared/hooks/useQuery";

const Packages: React.FC = () => {
  const packages = useSelector((state: any) => state.packages.packages);
  const query = useQuery("get", `${baseUrl}/packages`);
  useEffect(() => {
    query.execute();
  }, []);

  const dispatch = useDispatch();
  if (query.data) {
    dispatch(initPackages(query.data));
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
      {packages.map((packageDoc: Package) => {
        const createdAt = new Date(packageDoc.createdAt);
        return (
          <StyledUserCard key={packageDoc.id}>
            <StyledUserImage src={packageDoc.image} />
            <StyledUserInfo>
              <StyledProfileItem>
                <StyledProfileItemTitle>Name:</StyledProfileItemTitle>
                <p>{`${packageDoc.name}`}</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>price:</StyledProfileItemTitle>
                <p>{`${packageDoc.price}`}</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>Max posts:</StyledProfileItemTitle>
                <p>{`${packageDoc.maxPosts}`}</p>
              </StyledProfileItem>
            </StyledUserInfo>
            <StyledUserInfo>
              <StyledProfileItem>
                <StyledProfileItemTitle>Expires After:</StyledProfileItemTitle>
                <p>{`${packageDoc.expiresAfter}`} days</p>
              </StyledProfileItem>
              <StyledProfileItem>
                <StyledProfileItemTitle>Created At:</StyledProfileItemTitle>
                <p>{`${createdAt.toDateString()}`}</p>
              </StyledProfileItem>
            </StyledUserInfo>
          </StyledUserCard>
        );
      })}
    </main>
  );
};

export default Packages;
