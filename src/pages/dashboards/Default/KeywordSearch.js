import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
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
  Paper,
} from "@mui/material";
import axios from "axios";

import Navbar from "./navbar/Navbar";
import DoughnutChart from "./DoughnutChart";
import KeywordHistoryTrendChart from "./KeywordHistoryTrendChart";
import LanguagesTable from "../Analytics/LanguagesTable";
import {
  KeywordSearchContext,
  KeywordSearchProvider,
} from "./navbar/context/KeywordSearchContext";

import { spacing } from "@mui/system";
import Actions from "./Actions";
import { Contactless } from "@mui/icons-material";
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

function KeywordSearch() {
  const { language, country, keywords, handleChangeKeywords, keywordData } =
    useContext(KeywordSearchContext);
  console.log({ language, country, keywords });
  console.log("keywordData", keywordData);
  const [searchResults, setSearchResults] = useState({
    is_data_found: true,
    keyword: "hotel",
    volume: 30400000,
    cpc: 1.84,
    difficulty: 59,
    competition: 0.01,
    history_trend: {
      "2021-04-01": 16600000,
      "2021-05-01": 30400000,
      "2021-06-01": 30400000,
      "2021-07-01": 30400000,
      "2021-08-01": 30400000,
      "2021-09-01": 24900000,
      "2021-10-01": 24900000,
      "2021-11-01": 20400000,
      "2021-12-01": 20400000,
      "2022-01-01": 24900000,
      "2022-02-01": 30400000,
      "2022-03-01": 45500000,
    },
  });

  return (
    // <KeywordSearchProvider>
    <React.Fragment>
      <>
        <Helmet title="KeywordSearch Dashboard" />
        <Grid item>
          <Navbar />
        </Grid>
        <Divider my={6} />
        {keywordData != null ? (
          <>
            {keywordData && keywordData[0].is_data_found ? (
              <Grid container>
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={4}>
                    <DoughnutChart
                      difficulty={
                        keywordData && keywordData[0]?.difficulty
                          ? keywordData[0].difficulty
                          : 0
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <KeywordHistoryTrendChart
                      history_trend={
                        keywordData && keywordData[0]?.history_trend
                          ? keywordData[0].history_trend
                          : 0
                      }
                      volume={
                        keywordData && keywordData[0]?.volume
                          ? keywordData[0].volume
                          : 0
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <LanguagesTable
                      history_trend={
                        keywordData && keywordData[0]?.history_trend
                          ? keywordData[0].history_trend
                          : 0
                      }
                      competition={
                        keywordData && keywordData[0]?.competition
                          ? keywordData[0].competition
                          : 0
                      }
                      cpc={
                        keywordData && keywordData[0]?.cpc
                          ? keywordData[0].cpc
                          : 0
                      }
                    />
                  </Grid>
                </Grid>
                <Divider my={6} />
                <Typography variant="h3" gutterBottom>
                  Keyword ideas
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={4}>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Similar Keywords</TableCell>
                              <TableCell align="right">Search Vol.</TableCell>
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
                    </Paper>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Related Keywords</TableCell>
                              <TableCell align="right">Search Vol.</TableCell>
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
                    </Paper>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Low search volume</TableCell>
                              <TableCell align="right">Search Vol.</TableCell>
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
                    </Paper>
                  </Grid>
                </Grid>
                <Divider my={6} />
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h3" gutterBottom>
                      Organic search results
                    </Typography>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="right">Url(93)</TableCell>
                              <TableCell align="right">
                                Total Traffic Cost
                              </TableCell>
                              <TableCell align="right">Keyword Total</TableCell>
                              <TableCell align="right">Total Traffic</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.source}
                                </TableCell>
                                <TableCell align="right">{row.users}</TableCell>
                                <TableCell align="right">
                                  {row.sessions}
                                </TableCell>
                                <TableCell align="right">
                                  {row.bounce}
                                </TableCell>
                                <TableCell align="right">{row.avg}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h3" gutterBottom>
                      Dynamic Ranking
                    </Typography>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="right">Url(93)</TableCell>
                              <TableCell align="right">
                                Total Traffic Cost
                              </TableCell>
                              <TableCell align="right">Keyword Total</TableCell>
                              <TableCell align="right">Total Traffic</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.source}
                                </TableCell>
                                <TableCell align="right">{row.users}</TableCell>
                                <TableCell align="right">
                                  {row.sessions}
                                </TableCell>
                                <TableCell align="right">
                                  {row.bounce}
                                </TableCell>
                                <TableCell align="right">{row.avg}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </Paper>
                  </Grid>
                </Grid>
                <Divider my={6} />
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={12}>
                    <Paper>
                      <TableWrapper>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Domain</TableCell>
                              <TableCell align="right">Url(93)</TableCell>
                              <TableCell align="right">
                                Total Traffic Cost
                              </TableCell>
                              <TableCell align="right">Keyword Total</TableCell>
                              <TableCell align="right">Total Traffic</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {rows.source}
                              </TableCell>
                              <TableCell align="right">{rows.users}</TableCell>
                              <TableCell align="right">
                                {rows.sessions}
                              </TableCell>
                              <TableCell align="right">{rows.bounce}</TableCell>
                              <TableCell align="right">{rows.avg}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableWrapper>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid>
                {keywordData && !keywordData[0].is_data_found && (
                  <>
                    No result found! for keyword <b>{keywords}</b>
                  </>
                )}
              </Grid>
            )}
          </>
        ) : (
          <Grid>Search and analyze Keywords</Grid>
        )}
      </>
    </React.Fragment>
    // </KeywordSearchProvider>
  );
}

export default KeywordSearch;
