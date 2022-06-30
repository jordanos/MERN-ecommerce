import React from "react";
import Footer from "./Footer";
import HomeMain from "./HomeMain";
import Nav from "./Nav";

const Home: React.FC = () => {
  return (
    <div>
      <nav>
        <Nav />
      </nav>
      <main
        style={{
          marginTop: "2em",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <HomeMain />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
