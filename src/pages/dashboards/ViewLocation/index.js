import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

function Index() {
  let { id } = useParams();
  const [locationURL, setLocationURL] = useState("");
  const [isLaoding, setLoading] = useState(false);
  const getSoConnectLocationURL = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/jwt?locationId=${id}`,
        config
      );
      if (res.status == 200) {
        console.log(res.data.data.url);
        setLoading(false);

        setLocationURL(res.data.data.url);
      }
    } catch (error) {
      setLoading(false);

      console.log({ error });
    }
  };
  useEffect(async () => {
    getSoConnectLocationURL();
  }, []);
  return (
    <React.Fragment>
      <Helmet title="View Location" />
      <Grid container spacing={6}>
        {isLaoding ? (
          <Grid>Loading</Grid>
        ) : (
          <Grid item>
            <iframe
              src={locationURL}
              width="1500"
              height="1500"
              onLoad={() => {
                console.log("iframe loaded");
              }}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Index;
