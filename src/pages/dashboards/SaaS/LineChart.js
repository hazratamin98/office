import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Chart } from "react-chartjs-2";
import faker from "faker";
import { Card, CardContent } from "@mui/material";

const LineChart = ({ allReviews }) => {
  const labelData = [];

  allReviews?.npsSummaryOverTime.dataPoints.forEach((element) => {
    labelData.push(element.shortLabel);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "NPS SUMMARY",
      },
    },
  };
  const data = {
    labels: labelData,
    datasets: [
      {
        label: "NPS Score",
        data: allReviews.npsSummaryOverTime.dataPoints.map(
          (element) => element.npsScore
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      <Card>
        <CardContent>
          <Line options={options} data={data} />
        </CardContent>
      </Card>
    </>
  );
};

export default LineChart;
