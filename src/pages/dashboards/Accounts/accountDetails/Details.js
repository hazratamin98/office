import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  InputLabel,
  Select,
  FormControlLabel,
  Switch,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Button } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../../components/Loader";
import { Formik } from "formik";
import * as Yup from "yup";
import CountryList from "country-list";
// import LanguageList from "language-list";
import timezonesList from "./timezones.json";
import localesList from "./langauageList.json";

const AccountsDetails = () => {
  const { getNames } = CountryList;
  const countryNames = getNames();
  const params = useParams();
  const { id } = params;
  const [loadig, setLoading] = React.useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyUsers, setcompanyUsers] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [allCompaniesData, setAllCompaniesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [companyPartner, setCompanyPartner] = useState([]);

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  let localeList = [];
  localesList.forEach((locale) => {
    localeList.push(locale.name);
  });
  let timezoneList = [];
  timezonesList.forEach((timezone) => {
    timezoneList.push(timezone.value);
  });
  const dateFormatList = [
    "05/19/2022",
    "5/19/2022",
    "May 19,2022",
    "May 19,2022 3:05PM",
    "Munday,May 19,2022 3:05PM",
    "Fri,May 19,2022 3:05PM",
  ];

  const {
    name,
    externalReference,
    addressLine,
    addressLineExtra,
    postalCode,
    city,
    country,
    telephone,
    website,
    locales,
    timeZone,
    dateFormat,
    partnerId,
  } = allCompanies;

  const { email } = companyUsers;

  const getAllCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company`,
        config
      );
      if (res.status == 200) {
        setAllCompaniesData(res.data.data);
        console.log("customers", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };

  const getSelectedCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company/${id}`,
        config
      );
      if (res.status == 200) {
        setAllCompanies(res?.data.data);
        console.log("customers", res.data.data);
        // console.log("partner", res?.data.data.partner);
        setcompanyUsers(res?.data.data.users[0]);
        setCompanyPartner(res?.data.data.partner);
        console.log("users", res?.data.data.users[0]);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSelectedCustomer();
    getAllCustomer();
  }, []);
  let allCustomer = [];
  allCompaniesData.forEach((customer) => {
    allCustomer.push(customer);
  });

  return (
    <>
      {loadig && <Loader />}
      <Paper>
        <Formik
          enableReinitialize={true}
          initialValues={{
            companyName: name ? name : "",
            externalReference: externalReference ? externalReference : "",
            addressLine: addressLine ? addressLine : "",
            addressLineExtra: addressLineExtra ? addressLineExtra : "",
            postalCode: postalCode ? postalCode : "",
            city: city ? city : "",
            countryName: country ? country : "",
            telephone: telephone ? telephone : "",
            email: email ? email : "",
            website: website ? website : "",
            locales: locales ? locales : "",
            timeZone: timeZone ? timeZone : "",
            dateFormat: dateFormat ? dateFormat : "",
            // partnerId: companyPartner ? companyPartner : "",
          }}
          validationSchema={Yup.object().shape({
            companyName: Yup.string().required("Company name is required"),
            postalCode: Yup.string().required("Postal code is required"),
            telephone: Yup.string()
              .min(11)
              .required("Phone number is required"),
            email: Yup.string().required("Email is required"),
            // postalCode: Yup.number(),
            // accountExternalReference: Yup.string().max(255),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log("all form values", values);

            try {
              setIsLoading(true);
              const res = await axios.patch(
                `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company/${id}`,
                {
                  name: values.companyName,
                  externalReference: values.externalReference,
                  addressLine: values.addressLine,
                  addressLineExtra: values.addressLineExtra,
                  postalCode: values.postalCode,
                  city: values.city,
                  country: values.countryName,
                  telephone: values.telephone,
                  email: values.email,
                  website: values.website,
                  locales: values.locales,
                  timeZone: values.timeZone,
                  dateFormat: values.dateFormat,
                  partnerId: values.partnerId,
                },
                config
              );
              if (res.status == 200) {
                setIsLoading(false);
                setMessage(res.data.message);
                setTimeout(() => {
                  setMessage("");
                }, 10000);
              }
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
            setFieldValue,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box sx={{ padding: "40px" }}>
                <Typography variant="h3">Company information</Typography>
                <Typography variant="h5" sx={{ marginTop: "10px" }}>
                  An overview of your company information.
                </Typography>
              </Box>

              <Divider />

              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Grid item xs={12} sm={3} sx={{ paddingBottom: "118px" }}>
                  <Typography variant="h3">General information</Typography>
                  <Typography variant="h6">
                    Change your general information if required
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{ marginBottom: "10px" }}
                  >
                    Company name*
                  </InputLabel>
                  <TextField
                    sx={{ width: "80%" }}
                    variant="outlined"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.companyName && errors.companyName)}
                    helperText={touched.companyName && errors.companyName}
                  />

                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Account external reference
                  </InputLabel>
                  <TextField
                    sx={{ width: "80%" }}
                    variant="outlined"
                    name="externalReference"
                    value={values.externalReference}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.externalReference && errors.externalReference
                    )}
                    helperText={
                      touched.externalReference && errors.externalReference
                    }
                  />
                </Grid>
              </Grid>

              <Divider />

              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3} sx={{ paddingBottom: "280px" }}>
                  <Typography variant="h3">Address information</Typography>
                  <Typography variant="h6">
                    Change address information if required. You can use the
                    Google Buisness Profile connector and automatically update
                    your information.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{ marginBottom: "10px" }}
                  >
                    Address line
                  </InputLabel>
                  <TextField
                    sx={{ width: "80%" }}
                    variant="outlined"
                    name="addressLine"
                    value={values.addressLine}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.addressLine && errors.addressLine)}
                    helperText={touched.addressLine && errors.addressLine}
                  />
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Address line extra
                  </InputLabel>
                  <TextField
                    sx={{ width: "80%" }}
                    variant="outlined"
                    name="addressLineExtra"
                    value={values.addressLineExtra}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.addressLineExtra && errors.addressLineExtra
                    )}
                    helperText={
                      touched.addressLineExtra && errors.addressLineExtra
                    }
                  />
                  <Grid container>
                    <Grid item xs={6} sm={6}>
                      <InputLabel
                        htmlFor="component-simple"
                        sx={{
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        Postal code
                      </InputLabel>
                      <TextField
                        sx={{ width: "60%" }}
                        variant="outlined"
                        name="postalCode"
                        value={values.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.postalCode && errors.postalCode)}
                        helperText={touched.postalCode && errors.postalCode}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <InputLabel
                        htmlFor="component-simple"
                        sx={{
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        City
                      </InputLabel>
                      <TextField
                        sx={{ width: "60%" }}
                        variant="outlined"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Grid>
                  </Grid>

                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Country
                  </InputLabel>
                  <Autocomplete
                    sx={{ width: "80%" }}
                    disablePortal
                    name="country"
                    value={values.countryName}
                    options={countryNames}
                    onChange={(e, value) => {
                      setFieldValue("countryName", value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3} sx={{ marginBottom: "115px" }}>
                  <Typography variant="h3">Contact information</Typography>
                  <Typography variant="h6">
                    Change contact information if required
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Grid container>
                    <Grid item xs={6} sm={6}>
                      <InputLabel
                        htmlFor="component-simple"
                        sx={{
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        Phone nummber
                      </InputLabel>
                      <TextField
                        sx={{ width: "60%" }}
                        variant="outlined"
                        name="telephone"
                        value={values.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.telephone && errors.telephone)}
                        helperText={touched.telephone && errors.telephone}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <InputLabel
                        htmlFor="component-simple"
                        sx={{
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        Email
                      </InputLabel>
                      <TextField
                        sx={{ width: "60%" }}
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  </Grid>

                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Website
                  </InputLabel>
                  <TextField
                    sx={{ width: "80%" }}
                    variant="outlined"
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.website && errors.website)}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Box sx={{ padding: "40px" }}>
                <Typography variant="h3">Localization</Typography>
                <Typography variant="h5" sx={{ marginTop: "10px" }}>
                  Change the localization settings such as language and
                  date/time format.
                </Typography>
              </Box>

              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3} sx={{ paddingBottom: "180px" }}>
                  <Typography variant="h3">Localization</Typography>
                  <Typography variant="h6">
                    These settings determine how dates will be shown throughout
                    the dashboard.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Locales
                  </InputLabel>
                  <Autocomplete
                    sx={{ width: "80%" }}
                    disablePortal
                    name="locales"
                    value={values.locales}
                    options={localeList}
                    onChange={(e, value) => {
                      setFieldValue("locales", value);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.locales && errors.locales)}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    timezone
                  </InputLabel>
                  <Autocomplete
                    sx={{ width: "80%" }}
                    disablePortal
                    name="timeZone"
                    options={timezoneList}
                    value={values.timeZone}
                    onChange={(e, value) => {
                      setFieldValue("timeZone", value);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.timeZone && errors.timeZone)}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Date format
                  </InputLabel>
                  <Autocomplete
                    sx={{ width: "80%" }}
                    disablePortal
                    name="dateFormat"
                    options={dateFormatList}
                    value={values.dateFormat}
                    onChange={(e, value) => {
                      setFieldValue("dateFormat", value);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.dateFormat && errors.dateFormat)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Box sx={{ padding: "40px" }}>
                <Typography variant="h3">Advanced settings</Typography>
                {/* <Typography variant="h5" sx={{ marginTop: "10px" }}>
                  Change advanced settings for the account. This is limited to
                  bs visible for partners and Admins only.
                </Typography> */}
              </Box>

              {/* <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <Typography variant="h3">Partner</Typography>
                  <Typography variant="h6">
                    Select the partner the customer belongs to.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <InputLabel
                    htmlFor="component-simple"
                    sx={{
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Select a partner*
                  </InputLabel>
                  <Autocomplete
                    sx={{ width: "80%" }}
                    disablePortal
                    name="partnerId"
                    value={values.partnerId}
                    options={allCustomer}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, value) => {
                      setFieldValue("partnerId", value.id);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.partnerId && errors.partnerId)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid> */}
              {/* <Divider /> */}
              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <Typography variant="h3">Account settings</Typography>
                  <Typography variant="h6">
                    High profile toggle gives a customer a higher SLA in Zendesk
                    support.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="High profile customer"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                sx={{
                  marginTop: "50px",
                  marginLeft: "40px",
                  marginBottom: "50px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={8.5}></Grid>
                <Grid item xs={12} sm={3.5}>
                  <Button
                    style={{ padding: "10px", textTransform: "none" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      marginLeft: "25px",
                      padding: "10px",
                      textTransform: "none",
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save settings
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default AccountsDetails;
