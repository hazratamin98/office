import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import {
  Grid,
  Typography as MuiTypography,
  CardActionArea,
  CardActions,
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Chip as MuiChip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import LanguagesTable from "../../dashboards/Analytics/LanguagesTable";

import { spacing } from "@mui/system";
import Actions from "./Actions";
import SearchBar from "./SearchBar";
import NavbarLanguagesDropdown from "../../../components/navbar/NavbarLanguagesDropdown";
import useSeoQuery from "../../../hooks/useSeoQuery";
const Divider = styled(MuiDivider)(spacing);
const Button = styled(MuiButton)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

let id = 0;
const createData = (source, users) => {
  id += 1;
  return { id, source, users };
};

const rows = [
  createData("Google", "1023"),
  createData("Direct", "872"),
  createData("Twitter", "812"),
  createData("GitHub", "713"),
  createData("DuckDuckGo", "693"),
  createData("Facebook", "623"),
];

const Typography = styled(MuiTypography)(spacing);

function Seo() {
  const [keywords, setKeywords] = useState("");
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Welcome to keyword ranking tool !
          </Typography>
          <Typography variant="subtitle1">
            Enter the keyword to searh it's related information.
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <SearchBar></SearchBar>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <BarChart />{" "}
        </Grid>
        <Grid item xs={12} lg={4}>
          <LanguagesTable />
        </Grid>
      </Grid>
      <Typography variant="h3" gutterBottom>
        Keyword ideas
      </Typography>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.source}
                    </TableCell>
                    <TableCell align="right">{row.users}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.source}
                    </TableCell>
                    <TableCell align="right">{row.users}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell align="right">Users</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.source}
                    </TableCell>
                    <TableCell align="right">{row.users}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Seo;
