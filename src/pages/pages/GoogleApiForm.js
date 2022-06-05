import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { CloudUpload as MuiCloudUpload } from "@mui/icons-material";
import { spacing, SpacingProps } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)};
`;

function Public() {
  return (
    <Card mb={6} sx={{ width: "auto" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Create new account
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={8}>
            <GooglePlacesAutocomplete apiKey="AIzaSyCrTucXlJJfZ2YSZlyXxevyMa0kZuBKuGs" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Private() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Private info
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="first-name"
              label="First name"
              variant="outlined"
              defaultValue="Lucy"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="last-name"
              label="Last name"
              variant="outlined"
              defaultValue="Lavender"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          defaultValue="lucylavender@gmail.com"
          fullWidth
          my={2}
        />

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          fullWidth
          my={2}
        />

        <TextField
          id="address2"
          label="Apartment, studio, or floor"
          variant="outlined"
          fullWidth
          my={2}
        />

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              id="state"
              label="State"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              id="zip"
              label="Zip"
              variant="outlined"
              fullWidth
              my={2}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}

function GoogleApiForm() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        Create new account
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link component={NavLink} to="/">
          Pages
        </Link>
        <Typography>Account</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} mb={8}>
          <GooglePlacesAutocomplete apiKey="AIzaSyCrTucXlJJfZ2YSZlyXxevyMa0kZuBKuGs" />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default GoogleApiForm;
