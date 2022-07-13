import React from "react";
import { useSelector } from "react-redux";
import LargeCard from "shared/components/LargeCard";
import MediumCard from "shared/components/MediumCard";
import SmallCard from "shared/components/SmallCard";
import { Home } from "shared/features/home/homeSlice";

const HomeMain: React.FC = () => {
  const home: Home = useSelector((state: any) => state.home);

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
        <LargeCard title="Visualize Data" graphData={home.graph} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MediumCard
            title="Total View"
            dataTotal={{
              usersTotal: home.users.total,
              productsTotal: home.products.total,
              packagesTotal: home.packages.total,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomeMain;
