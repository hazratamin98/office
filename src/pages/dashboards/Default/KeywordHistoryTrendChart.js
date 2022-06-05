import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { MoreVertical } from "react-feather";
import { rgba } from "polished";

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { object } from "yup";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 340px;
  width: 100%;
`;

const KeywordHistoryTrendChart = ({ history_trend, volume, theme }) => {
  const firstDatasetColor = theme.palette.secondary.main;
  const secondDatasetColor = rgba(theme.palette.secondary.main, 0.33);

  console.log(history_trend);
  let labelsData = [];
  let historyData = [];
  for (const [key, value] of Object.entries(history_trend)) {
    labelsData.push(key);
    historyData.push(value);
  }

  const data = {
    labels: labelsData,
    datasets: [
      {
        label: "Search Volume",
        backgroundColor: firstDatasetColor,
        borderColor: firstDatasetColor,
        hoverBackgroundColor: firstDatasetColor,
        hoverBorderColor: firstDatasetColor,
        data: historyData,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: "Updated",
        backgroundColor: secondDatasetColor,
        borderColor: secondDatasetColor,
        hoverBackgroundColor: secondDatasetColor,
        hoverBorderColor: secondDatasetColor,
        data: historyData,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        stacked: true,
        ticks: {
          stepSize: 20,
          fontColor: theme.palette.text.secondary,
        },
      },

      x: {
        stacked: true,
        grid: {
          color: "transparent",
        },
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },
    },
  };

  return (
    <Card mb={6} sx={{ height: "500px" }}>
      <CardHeader title="Search Volume / Updated" />

      <CardContent>
        <Typography variant="h1">{volume}</Typography>
        <ChartWrapper>
          <Chart type="bar" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(KeywordHistoryTrendChart);
