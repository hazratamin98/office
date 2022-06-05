import React, { useState, useEffect } from "react";
import { Divider, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../../components/Loader";

const AccountsOverview = () => {
  const params = useParams();
  const { id } = params;
  console.log("id", id);
  const [loadig, setLoading] = React.useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);

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
        setAllCompanies(res?.data.data);
        console.log("customers", res.data.data);
        setCompanyUsers(res?.data.data.users[0]);
        console.log("users", res?.data.data.users[0]);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCustomer();
  }, []);

  return (
    <>
      {loadig && <Loader />}
      <Box
        sx={{
          display: "flex",
          padding: "30px",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Grid container>
          <Grid item xs={3} sm={3}>
            <Typography variant="h4">Primary user</Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography sx={{ marginTop: "6px" }} variant="h5">
              {companyUsers.isPrimary
                ? companyUsers.firstName + " " + companyUsers.lastName
                : null}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          padding: "30px",
          alignItems: "center",
          //   justifyContent: "space-evenly",
        }}
      >
        <Grid container>
          <Grid item xs={3} sm={3}>
            <Typography variant="h4">Email address</Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography sx={{ marginTop: "6px" }} variant="h5">
              {companyUsers.email}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          padding: "30px",
          alignItems: "center",
          //   justifyContent: "space-evenly",
        }}
      >
        <Grid container>
          <Grid item xs={3} sm={3}>
            <Typography variant="h4">Telephone number</Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography sx={{ marginTop: "6px" }} variant="h5">
              {allCompanies.telephone}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default AccountsOverview;
