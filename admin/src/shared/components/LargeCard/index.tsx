import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { Home } from "shared/features/home/homeSlice";
import CardHeader from "../CardHeader";
import StyledLargeCard from "./Styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line chart view",
    },
  },
};

type Props = {
  title: string;
  graphData: Home["graph"];
};

const LargeCard: React.FC<Props> = (props) => {
  const { title, graphData } = props;
  const labels: string[] = graphData.users.map(
    (data, index) => `${index} days ago`
  );
  labels[0] = "today";
  labels.reverse();

  const users = graphData.users.slice();
  users.reverse();
  const products = graphData.products.slice();
  products.reverse();
  const packages = graphData.packages.slice();
  packages.reverse();

  return (
    <StyledLargeCard>
      <CardHeader>
        <h4>{title}</h4>
      </CardHeader>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "Users",
              data: users,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Products",
              data: products,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Bought Packages",
              data: packages,
              borderColor: "rgb(47, 233, 40)",
              backgroundColor: "rgba(47, 233, 40, 0.5)",
            },
          ],
        }}
      />
    </StyledLargeCard>
  );
};

export default LargeCard;
