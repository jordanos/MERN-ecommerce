import React from "react";
import CardBody from "shared/components/CardBody";
import CardHeader from "shared/components/CardHeader";
import LargeCard from "shared/components/LargeCard";
import MediumCard from "shared/components/MediumCard";
import SmallCard from "shared/components/SmallCard";
import CountInfo from "./CountInfo";

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
          <CardHeader>
            <h4>Users</h4>
            <h4>:</h4>
          </CardHeader>
          <CardBody>
            <CountInfo count={1000} desc="Today" />
          </CardBody>
        </SmallCard>
        <SmallCard>
          <CardHeader>
            <h4>Products</h4>
            <h4>:</h4>
          </CardHeader>
          <CardBody>
            <CountInfo count={4050} desc="This month" />
          </CardBody>
        </SmallCard>
        <SmallCard>
          <CardHeader>
            <h4>Packages</h4>
            <h4>:</h4>
          </CardHeader>
          <CardBody>
            <CountInfo count={4050} desc="This week" />
          </CardBody>
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
