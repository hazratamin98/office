import React, { useState } from "react";
import EditLocation from "./EditLocationForm";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

function Index() {
  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Edit profile
          </Typography>
          <Typography variant="subtitle1">
            Edit your personal, security and notification settings for your
            account.
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <EditLocation />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Index;
