import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { MoreVertical } from "react-feather";
import { rgba } from "polished";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const ChartWrapper = styled.div`
  height: 178px;
  width: 100%;
`;

const BarChart = ({ theme, allReviews }) => {
  let ratingLabel = [];
  let reviewCounts = [];

  allReviews.recentReviews?.forEach((element) => {
    ratingLabel.push(element.reviewDate);
    reviewCounts.push(element.rating);
  });

  const firstDatasetColor = theme.palette.secondary.main;
  const secondDatasetColor = rgba(theme.palette.secondary.main, 0.33);

  const data = {
    labels: ratingLabel,
    datasets: [
      {
        label: "Mobile",
        backgroundColor: firstDatasetColor,
        borderColor: firstDatasetColor,
        hoverBackgroundColor: firstDatasetColor,
        hoverBorderColor: firstDatasetColor,
        data: reviewCounts,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
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
      },

      x: {
        stacked: true,
        grid: {
          color: "transparent",
        },
      },
    },
  };

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Ratings / ReviewCount"
      />
      <CardContent>
        <ChartWrapper>
          <Typography>{allReviews.recentReviewsMessage}</Typography>
          <Chart type="bar" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(BarChart);
