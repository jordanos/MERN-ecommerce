import React from "react";
import { useSelector } from "react-redux";
import CardHeader from "shared/components/CardHeader";
import LargeCard from "shared/components/LargeCard";
import MediumCard from "shared/components/MediumCard";
import SmallCard from "shared/components/SmallCard";

const HomeMain: React.FC = () => {
  const home = useSelector((state: any) => state.home);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SmallCard title="Users" count={home.users} />
        <SmallCard title="Products" count={home.products} />
        <SmallCard title="Bought Packages" count={home.packages} />
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
            <CardHeader>
              <h4>Packages Bought</h4>
              <h1 style={{ fontWeight: "normal" }}>10</h1>
            </CardHeader>
          </MediumCard>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
