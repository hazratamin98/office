import React, { useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import Link from "@mui/material/Link";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useTranslation } from "react-i18next";

import GeneralForm from "./GeneralForm";
import SecurityForm from "./SecurityForm";
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

function Profile() {
  const [general, setGeneral] = useState(true);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {t("My profile")}
          </Typography>
          <Typography variant="subtitle1">
            {/* {t("My profile sub desc")} */}
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={2}>
          <Grid spacing={6}>
            <Grid item xs={12} sm={12} md={6} my={2}>
              <Link
                component="button"
                variant="h6"
                underline="none"
                onClick={() => setGeneral(true)}
                color={general ? "#3c98eb" : "gray"}
                sx={{ fontWeight: "400", textDecoration: "none" }}
              >
                General{" "}
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Link
                component="button"
                variant="h6"
                underline="none"
                onClick={() => setGeneral(false)}
                color={!general ? "#3c98eb" : "gray"}
                sx={{ fontWeight: "400", textDecoration: "none" }}
              >
                Security{" "}
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={10}>
          {general ? <GeneralForm /> : <SecurityForm />}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
