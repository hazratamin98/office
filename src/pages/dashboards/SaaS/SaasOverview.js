import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Card,
  Box,
  ThemeProvider,
  CardContent,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";
import axios from "axios";

import Actions from "./Actions";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import USAMap from "./USAMap";
import Stats from "./Stats";
import Table from "./Table";
import { useParams } from "react-router-dom";
// import DoughnutChart from "./DoughnutChart";
import Reviews from "./Reviews";
import LinebarChart from "./LinebarChart";
import LineChart from "./LineChart";

const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500",
    },
  },
});

function SaasOverview() {
  const { t } = useTranslation();

  let { id } = useParams();
  console.log("iddddddddd", id);
  // const navigate = useNavigate();

  const [allReviews, setAllReviews] = useState([]);
  const [reviewSummery, setReviewSummery] = useState([]);
  // const [ratingLabel, setRatingLabel] = useState([]);
  const [allRatings, setAllRatings] = useState([]);

  // const [ratingCount, setRatingCount] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [allSubscrpitions, setAllSubscrpitions] = useState([]);

  const getAllReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/review-dashboard/${id}`,
        config
      );
      if (res.status == 200) {
        setAllReviews(res.data.data);
        console.log("allReviews", res.data.data);
        // setLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsError(error);
      // setAllReviews(error);
    }
  };

  useEffect(async () => {
    getAllReviews();
  }, []);

  const normalise = (value) => {
    return (value / allReviews.reviewSummary.reviewCount) * 100;
  };
  return (
    <>
      <Helmet title="SaaS Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Factory Girl
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />
      {isError == true ? (
        <>
          <Typography variant="h2">Platform overview</Typography>
          <Grid container spacing={6} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6} lg={6}>
              <Card
                sx={{
                  height: "350px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "10px",
                      color: "#808080",
                    }}
                  >
                    REVIEW SUMMARY
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "35px",
                      marginBottom: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        marginRight: "15px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "45px",
                          color: "#676767",
                          weight: "300",
                        }}
                      >
                        {allReviews.reviewSummary.avgRating}
                      </Typography>
                    </Box>
                    <Box>
                      <Rating
                        name="half-rating"
                        size="small"
                        defaultValue={allReviews.reviewSummary.avgRating}
                        precision={0.5}
                        readOnly
                      />
                      <Typography
                        sx={{ color: "#B6B6B4" }}
                      >{`${allReviews.reviewSummary.reviewCount} Reviews`}</Typography>
                    </Box>
                  </Box>

                  {allReviews.reviewSummary.ratings
                    .reverse()
                    .map((review, index) => {
                      return (
                        <>
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <Box
                              marginRight={2}
                              marginLeft={5}
                              sx={{
                                color: "#B6B6B4",
                                fontSize: "12px",
                              }}
                            >
                              {review.rating}
                            </Box>
                            <StarIcon
                              sx={{
                                fontSize: "15px",
                                marginRight: "10px",
                                color: "#B6B6B4",
                              }}
                            />
                            <Box sx={{ marginRight: "10px" }}>
                              <ThemeProvider theme={theme}>
                                <LinearProgress
                                  variant="determinate"
                                  value={normalise(review.reviewCount)}
                                  color="primary"
                                  sx={{
                                    backgroundColor: "#e5e5e2",
                                    width: "250px",
                                  }}
                                />
                              </ThemeProvider>
                            </Box>
                            <Box
                              sx={{
                                color: "#B6B6B4",
                                fontSize: "12px",
                              }}
                            >
                              {review.reviewCount}
                            </Box>
                          </Box>
                        </>
                      );
                    })}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <Card
                sx={{
                  height: "350px",
                }}
              >
                <CardContent>
                  {allReviews ? (
                    <Table allReviews={allReviews} />
                  ) : (
                    <div>...Loading</div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider my={6} />

          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              <BarChart allReviews={allReviews} />
            </Grid>
          </Grid>

          <Divider my={6} />

          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={6}>
              <LinebarChart allReviews={allReviews} />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <LineChart allReviews={allReviews} />
            </Grid>
          </Grid>

          <Divider my={6} />

          {/* <Grid container spacing={6}>
            <Grid item xs={12} sm={6} lg={6}>
              <LineChart allReviews={allReviews} />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <LineChart allReviews={allReviews} />
            </Grid>
          </Grid> */}

          <Divider my={6} />

          {/* <Grid container spacing={6}>
            <Grid item xs={12} lg={12}>
              {allReviews ? (
                <Reviews allReviews={allReviews} />
              ) : (
                <div>...Loading</div>
              )}
            </Grid>
          </Grid> */}
        </>
      ) : (
        <Grid container justifyContent="center">
          <Typography variant="h1" fontWeight="400">
            No location found with this id or first subscribe review service
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default SaasOverview;
