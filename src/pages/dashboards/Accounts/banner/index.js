import React, { useState, useEffect } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Divider, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../../components/Loader";
import { alpha, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Overview from "../overview/OverView";
import AccountsDetails from "../accountDetails/Details";
import ActiveProducts from "../activeProducts/ActiveProducts";
import Users from "../users/Users";
import AccountFiles from "../files/Files";

const useStyles = makeStyles((theme) => ({
  Tabs: {
    textTransform: "none",
    marginTop: "30px",
  },
  Link: {
    fontSize: "20px",
    marginLeft: "5px",
    color: "blue",
    textDecoration: "none",
  },
  backArrow: {
    height: "40px",
    color: "blue",
  },
}));

const AccountsBanner = (props) => {
  const classes = useStyles();
  const params = useParams();
  const { id } = params;
  console.log("id", id);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loadig, setLoading] = React.useState(false);
  const [allCompanies, setAllCompanies] = useState([]);

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getAllCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company/${id}`,
        config
      );
      if (res.status == 200) {
        setAllCompanies(res.data.data);
        console.log("customers", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCustomer();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      {loadig && <Loader />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon className={classes.backArrow} />
        </Box>

        <Box>
          <Link className={classes.Link} to="/tools/accounts">
            Back to all accounts
          </Link>
        </Box>
      </Box>
      <Grid container sx={{ marginTop: "30px" }} alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ height: "60px", width: "60px" }}
        />
        <Grid item>
          <Typography
            sx={{ marginLeft: "20px", marginBottom: "2px" }}
            variant="h2"
          >
            {allCompanies.name}
          </Typography>
          <Typography sx={{ marginLeft: "20px" }} variant="h6">
            {allCompanies.id} / ID: {allCompanies.id}
          </Typography>
        </Grid>
      </Grid>
      <Tabs
        className={classes.Tabs}
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
      >
        <Tab label="Overview" />
        <Tab label="Account details" />
        <Tab label="Active products" />
        <Tab label="Users" />
      </Tabs>
      <Divider />
      {selectedTab === 0 && <Overview />}
      {selectedTab === 1 && <AccountsDetails />}
      {selectedTab === 2 && <ActiveProducts params={params} />}
      {selectedTab === 3 && <Users params={params} />}
    </>
  );
};

export default AccountsBanner;
