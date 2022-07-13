import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import CardHeader from "../CardHeader";
import StyledMediumCard from "./Styles";

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Doughnut chart view",
    },
  },
};

type Props = {
  title: string;
  dataTotal: {
    usersTotal: number;
    productsTotal: number;
    packagesTotal: number;
  };
};

const MediumCard: React.FC<Props> = ({ title, dataTotal }) => {
  const data = {
    labels: ["Users", "Products", "Packages"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          dataTotal.usersTotal,
          dataTotal.productsTotal,
          dataTotal.packagesTotal,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(53, 162, 235, 0.7)",
          "rgba(47, 233, 40, 0.7)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(53, 162, 235)",
          "rgb(47, 233, 40)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <StyledMediumCard>
      <CardHeader>
        <h4>{title}</h4>
      </CardHeader>
      <Doughnut options={options} data={data} />
    </StyledMediumCard>
  );
};

export default MediumCard;
