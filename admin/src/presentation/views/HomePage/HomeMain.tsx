import {
  StyledLargCard,
  StyledMediumCard,
  StyledMediumLargCard,
  StyledSmallCard,
} from "core/components/styles/StyledCard";
import React from "react";

const HomeMain: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <StyledSmallCard />
        <StyledSmallCard />
        <StyledSmallCard />
      </div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <StyledLargCard />
        <div
          style={{
            width: "25%",
            height: "420px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyledMediumCard />
          <StyledMediumLargCard />
        </div>
      </div>
    </>
  );
};

export default HomeMain;
