import React, { useState } from "react";
import styled, { withTheme, ThemeProps } from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

//Start for select time zone*******************************************
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import timezones from "timezones-list";
import { useTranslation } from "react-i18next";

//End for select time zone*********************************************

import { spacing } from "@mui/system";
import useAuth from "../../../hooks/useAuth";
import { Grid, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Alert as MuiAlert, Button, TextField } from "@mui/material";
const Alert = styled(MuiAlert)(spacing);

//Start for select time zone*******************************************
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "GMT-12:00Etc/GMT+12",
  "GMT-11:00Etc/GMT+11",
  "GMT-11:00pACIFIC/MidWay",
];
//End for select time zone*********************************************

const GeneralForm = ({ theme }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(timezones);
  const { editProfile, user, isLoading } = useAuth();
  console.log("user", user);
  const [personName, setPersonName] = useState([]);
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      {user ? (
        <Grid>
          <Grid sx={{ padding: "10px", bgcolor: "white" }}>
            <Formik
              initialValues={{
                firstName: user && user?.firstName,
                lastName: user && user?.lastName,
                email: user && user?.email,
                submit: false,
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lastName: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  editProfile(
                    values.email ? values.email : user && user?.email,
                    values.firstName
                      ? values.firstName
                      : user && user?.firstName,
                    values.lastName ? values.lastName : user && user?.lastName
                  );
                  // navigate("/");
                } catch (error) {
                  const message = error.message || "Something went wrong";
                  setStatus({ success: false });
                  setErrors({ submit: message });
                  setSubmitting(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  {errors.submit && (
                    <Alert mt={2} mb={1} severity="warning">
                      {errors.submit}
                    </Alert>
                  )}
                  {isLoading && <Loader />}

                  <Grid container>
                    <Grid item xs={3} sx={{ bgcolor: "" }}>
                      <Typography variant="h4" p={7}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                      {" "}
                      <Typography variant="subtitle1">First Name*</Typography>
                      <TextField
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                      >
                        Last Name
                      </Typography>
                      <TextField
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid container>
                    <Grid item xs={3} sx={{ bgcolor: "" }}>
                      <Typography variant="h4" p={7}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                      >
                        Email address*
                      </Typography>
                      <TextField
                        type="email"
                        name="email"
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid container>
                    <Grid item xs={3} sx={{ bgcolor: "" }}>
                      <Typography variant="h4" p={7}>
                        Timezone
                      </Typography>
                    </Grid>
                    <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                      >
                        Select timezone
                      </Typography>
                      <Select
                        displayEmpty
                        value={personName}
                        fullWidth
                        onChange={handleChangeSelect}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Placeholder</em>;
                          }

                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>Placeholder</em>
                        </MenuItem>
                        {timezones.map((timezone) => (
                          <MenuItem
                            key={timezone.label}
                            value={timezone.name}
                            style={getStyles(timezone.name, personName, theme)}
                          >
                            {timezone.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    my={3}
                  >
                    <Button
                      type="button"
                      variant="contained"
                      // disabled={isSubmitting}
                      onClick={() => navigate("/")}
                      style={{
                        marginBottom: "10px",
                        fontWeight: "600",
                        borderRadius: "0.3rem",
                        fontSize: "1.25rem",
                        lineHeight: 1.5,
                        padding: "0.5rem 1rem",
                        color: "#212529",
                        background:
                          "#f9f9f9 linear-gradient(180deg,#fafafa,#f9f9f9) repeat-x",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{ ml: 4 }}
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      style={{
                        marginBottom: "10px",
                        // backgroundColor: "#3c98eb",
                        borderColor: "#3c98eb",
                        color: "primary",
                        // opacity: "0.65",
                        fontWeight: "600",
                        borderRadius: "0.3rem",
                        fontSize: "1.25rem",
                        lineHeight: 1.5,
                        padding: "0.5rem 1rem",
                      }}
                    >
                      Save Settings
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withTheme(GeneralForm);
