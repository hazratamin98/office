import React, { useState, useEffect } from "react";
// import { AppBar, Tab, Tabs } from "@material-ui/core";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Reviews from "./Reviews";
import SaasOverview from "./SaasOverview";

const useStyles = makeStyles((theme) => ({
  Tabs: {
    textTransform: "none",
    marginTop: "30px",
  },
  backArrow: {
    height: "40px",
    color: "blue",
  },
}));

function SaaS({ allReviews }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        className={classes.Tabs}
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
      >
        <Tab label="Overview" />
        <Tab label="Reviews" />
        image.png
      </Tabs>
      <Divider />
      {selectedTab === 0 && <SaasOverview />}
      {selectedTab === 1 && <Reviews allReviews={allReviews} />}
    </React.Fragment>
  );
}

export default SaaS;
