import CardHeader from "core/components/CardHeader";
import LargeCard from "core/components/LargeCard";
import MediumCard from "core/components/MediumCard";
import SmallCard from "core/components/SmallCard";
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
        <SmallCard>
          <CardHeader title="Products" />
        </SmallCard>
        <SmallCard>
          <CardHeader title="Users" />
        </SmallCard>
        <SmallCard>
          <CardHeader title="Packages" />
        </SmallCard>
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
        <LargeCard />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MediumCard>
            <CardHeader title="Packages Bought" count={10} />
          </MediumCard>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
