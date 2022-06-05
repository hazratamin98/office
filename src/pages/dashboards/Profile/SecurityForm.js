import React, { useState } from "react";
import styled, { withTheme, ThemeProps } from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import useAuth from "../../../hooks/useAuth";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Alert as MuiAlert, Button, TextField } from "@mui/material";
const Alert = styled(MuiAlert)(spacing);

const BarChart = () => {
  const navigate = useNavigate();
  const { changePassword, user, isLoading } = useAuth();

  return (
    <>
      <Grid>
        <Grid sx={{ padding: "10px", bgcolor: "white" }}>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              submit: true,
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string()
                .min(5, "Must be at least 05 characters")
                .max(255)
                .required("Required"),
              newPassword: Yup.string()
                .min(5, "Must be at least 05 characters")
                .max(255)
                .required("Required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                changePassword(values.oldPassword, values.newPassword);
                // navigate("/");
              } catch (error) {
                const message = error.message || "Something went wrong";
                setStatus({ success: true });
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
                {/* {errors.submit && (
                  <Alert mt={2} mb={1} severity="warning">
                    {errors.submit}
                  </Alert>
                )} */}
                {user?.message == "incorrect password" ? (
                  <Alert mt={2} mb={1} severity="error">
                    {user?.message}
                  </Alert>
                ) : (
                  ""
                )}
                {isLoading && <Loader />}
                <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Password
                      <Grid wrap="nowrap" sx={{ mt: 2 }}>
                        <Grid item xs>
                          <Typography
                            sx={{
                              color: "rgba(51,51,51,.7)",
                              fontStyle: "italic",
                              fontWeight: 400,
                            }}
                          >
                            To update your password, please enter your current
                            password and new password
                          </Typography>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    {" "}
                    <Typography variant="subtitle1">
                      Current password*
                    </Typography>
                    <TextField
                      type="password"
                      name="oldPassword"
                      value={values.oldPassword}
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      fullWidth
                      helperText={touched.oldPassword && errors.oldPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      New password*
                    </Typography>
                    <TextField
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      fullWidth
                      helperText={touched.newPassword && errors.newPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
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
                    // type="submit"
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
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#3c98eb",
                      borderColor: "#3c98eb",
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
    </>
  );
};

export default BarChart;
