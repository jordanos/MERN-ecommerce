import React from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "shared/constants/const";
import { update } from "shared/features/home/homeSlice";
import usePooling from "shared/hooks/usePooling";
import useQuery from "shared/hooks/useQuery";
import Footer from "./Footer";
import HomeMain from "./HomeMain";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, data, execute } = useQuery(
    "get",
    `${baseUrl}/app/homepage`
  );
  usePooling(execute);

  if (data) {
    dispatch(update(data));
  }

  return (
    <div>
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
