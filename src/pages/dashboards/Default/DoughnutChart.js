import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from "react-chartjs-2";
import { MoreVertical } from "react-feather";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { orange, green, red } from "@mui/material/colors";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  Grid,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const DoughnutChart = ({ difficulty, theme }) => {
  const data = {
    labels: ["difficulty"],
    datasets: [
      {
        data: [difficulty],
        backgroundColor: [
          theme.palette.secondary.main,
          red[500],
          orange[500],
          theme.palette.grey[200],
        ],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
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
    cutout: difficulty,
  };
  console.log(difficulty);
  return (
    <Card mb={6} sx={{ height: "500px" }}>
      <CardHeader title="DIFFICULTY/ Update" />
      <CardContent>
        <Grid container width="200px">
          <Grid item justifyContent={"center"}>
            <CircularProgressbar
              justifyContent="center"
              value={difficulty}
              text={`${difficulty}%`}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
