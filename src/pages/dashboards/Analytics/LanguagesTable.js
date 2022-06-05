import React from "react";
import styled, { withTheme } from "styled-components/macro";
import { MoreVertical } from "react-feather";
import { rgba } from "polished";
import Chart from "react-chartjs-2";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 340px;
  width: 100%;
`;
const LanguagesTable = ({ history_trend, cpc, competition, theme }) => {
  const firstDatasetColor = theme.palette.secondary.main;
  const secondDatasetColor = rgba(theme.palette.secondary.main, 0.33);

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
        label: "CPC",
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
    indexAxis: "y",
    scales: {
      y: {
        stacked: true,
        grid: {
          color: "transparent",
        },
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },

      x: {
        grid: {
          display: false,
        },
        stacked: true,
        ticks: {
          stepSize: 20,
          fontColor: theme.palette.text.secondary,
        },
      },
    },
  };

  return (
    <Card mb={6} sx={{ height: "500px" }}>
      <CardHeader title="CPC" />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h1">{cpc}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">competition:</Typography>
            <Typography variant="h6">{competition}</Typography>
          </Box>
        </Box>
        <ChartWrapper>
          <Chart type="bar" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(LanguagesTable);
