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

const LinebarChart = ({ allReviews }) => {
  const labelData = [];

  allReviews?.reviewAndRatingOverTime.forEach((element) => {
    labelData.push(element.milestone);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "REVIEWS & RATINGS OVER TIME",
      },
    },
  };
  const data = {
    labels: labelData,
    datasets: [
      {
        type: "line",
        label: "Rating",
        data: allReviews.reviewAndRatingOverTime.map(
          (element) => element.rating
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        type: "bar",
        label: "Reviews",
        data: allReviews.reviewAndRatingOverTime.map(
          (element) => element.count
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

export default LinebarChart;
