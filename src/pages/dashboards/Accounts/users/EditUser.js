import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { withTheme } from "styled-components/macro";
import api from "../../../../utils/axios";
import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Formik, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { locationForm } from "../../../../redux/slices/location";
//Start for select time zone*******************************************
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
//End for select time zone*********************************************
import Checkbox from "@mui/material/Checkbox";
import { spacing } from "@mui/system";
import useAuth from "../../../../hooks/useAuth";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Alert as MuiAlert, Button, TextField } from "@mui/material";
import { de } from "date-fns/locale";
import Autocomplete from "@mui/material/Autocomplete";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
const Alert = styled(MuiAlert)(spacing);
const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};
//Country Select Field Start*******************************************
// function getStyles(name, countryName, theme) {
//   return {
//     fontWeight:
//       countryName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
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

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().max(255).required("First Name is required"),
//   LastName: Yup.string().max(255).required("Last Name is required"),
// postalCode: Yup.number(),
// accountExternalReference: Yup.string().max(255),
// .required("Account External Reference is required"),
// partnerAccount: Yup.string()
//   .max(255)
//   .required("Partner Account is required"),
// firstName: Yup.string()
//   .max(255)
//   .required("First name is required"),
// lastName: Yup.string().max(255).required("Last name is required"),
//   emailName: Yup.string()
//     .email("Must be a valid email")
//     .max(255)
//     .required("Email is required"),
//   languageName: Yup.string().required("Language is required"),
//   roleName: Yup.string().required("Role is required"),
// });

//Country Select Field End*******************************************
//Select Partner  Field Start*******************************************
// function getStylesofPartner(name, partnerAccount, theme) {
//   return {
//     fontWeight:
//       partnerAccount.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

//Select Partner Field End*******************************************
const EditUser = ({
  selectedUserId,
  id,
  Language,
  Role,
  user,
  onCancel,
  theme,
}) => {
  const dispatch = useDispatch();
  const [googlePlaceData, setGooglePlaceData] = useState({});
  const [placeId, setPlaceId] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const [partnerAccount, setPartnerName] = React.useState([]);
  // const [firstName, setFirstName] = React.useState("");
  // const [lastName, setLastName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [language, setLanguage] = React.useState("");
  // const [role, setRole] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("IDDDDDDDD", id);
  // console.log("rrr", location.state.row);
  // const {
  //   id,
  //   name,
  //   addressLine1,
  //   addressLine2,
  //   postalCode,
  //   city,
  //   country,
  //   telephone,
  //   website,
  //   externalReference,
  //   partnerId,
  //   locationSubscription,
  // } = location?.state?.row;
  // const { editProfile, user, isLoading } = useAuth();
  //Country Select Field Start*******************************************

  // const [countryName, setCountryName] = React.useState([]);
  // const handleChangeCountryName = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCountryName(value === "string" ? value.split(",") : value);
  // };
  // let countryName1 = countryName.toString();
  // console.log("countryName", countryName1);

  //Country Select Field End*******************************************

  //Select Partner Field Start*******************************************

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = (data) => console.log("dataaaaaa", data);

  // const handleChangePartnerName = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPartnerName(typeof value === "string" ? value.split(",") : value);
  // };
  // let partnerAccount1 = partnerAccount.toString();
  // console.log("partnerAccount", partnerAccount1);
  //Select Partner Field End*******************************************
  // const [checked, setChecked] = React.useState(false);

  // const handleChangeCheckButton = (e) => {
  //   setChecked(e.target.checked);
  // };

  // const setPlaceIdFromGoogle = (place) => {
  //   setPlaceId(place.value.place_id);
  // };

  // const handleChangeFirstName = (event) => {
  //   setFirstName(event.target.value);
  // };
  // const handleChangeLastName = (event) => {
  //   setLastName(event.target.value);
  // };
  // const handleChangeEmail = (event) => {
  //   setEmail(event.target.value);
  // };
  // const handleChangeLanguage = (event) => {
  //   setLanguage(event.target.value);
  // };
  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };

  // const partnerNames = [];
  // var companyIds = [];

  // const companyNames = companyData?.data?.map((qq, key) => {
  //   partnerNames.push(qq.name);
  // });
  // const companyIdss = companyData?.data?.map((qq, key) => {
  //   companyIds.push(qq);
  // });

  // const getSelectedCompanyId = companyIds
  //   .map((i) => i.name)
  //   .indexOf(partnerAccount1);

  // useEffect(async () => {
  //   if (placeId) {
  //     try {
  //       const res = await axios.get(
  //         `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/place-details/${placeId}`,
  //         config
  //       );
  //       if (res.status == 200) {
  //         setGooglePlaceData(res.data.data.googleData.result);
  //       }
  //     } catch (error) {}
  //   }
  // }, [placeId]);
  // useEffect(async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/company`,
  //       config
  //     );
  //     if (res.status == 200) {
  //       setCompanyData(res.data);
  //     }
  //   } catch (error) {}
  // }, []);
  return (
    <>
      {console.log("edit user", user)}
      <Grid>
        <Grid sx={{ padding: "10px", bgcolor: "white" }}>
          <Formik
            // enableReinitialize={true}
            initialValues={{
              //   accountName: name ? name : "",
              //   addressOne: addressLine1 ? addressLine1 : "",
              //   addressTwo: addressLine2 ? addressLine2 : "",
              //   postalCode: postalCode ? postalCode : "",
              //   city: city ? city : "",
              //   countryName: country ? country : "",
              //   telephone: telephone ? telephone : "",
              //   website: website ? website : "",
              //   accountExternalReference: externalReference
              //     ? externalReference
              //     : "",
              // partnerAccount: "",
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              language: user.language,
              role: user.role,
              submit: false,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .max(255)
                .required("First Name is required"),
              lastName: Yup.string().max(255).required("Last Name is required"),
              // postalCode: Yup.number(),
              // accountExternalReference: Yup.string().max(255),
              // .required("Account External Reference is required"),
              // partnerAccount: Yup.string()
              //   .max(255)
              //   .required("Partner Account is required"),
              // firstName: Yup.string()
              //   .max(255)
              //   .required("First name is required"),
              // lastName: Yup.string().max(255).required("Last name is required"),
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              language: Yup.string().required("Language is required"),
              role: Yup.string().required("Role is required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              console.log("all form values", values);

              try {
                // setIsLoading(true);
                const res = await axios.patch(
                  `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/users/${user.id}`,
                  {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    language: values.language,
                    role: values.role,
                    // companyId: id.id,
                  },
                  config
                );
                if (res.status == 200) {
                  // setIsLoading(false);
                  console.log("updated dataaaa", res.data.data);
                  setMessage(res.data.message);
                  // setTimeout(() => {
                  //   setMessage("");
                  // }, 10000);
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("test");
                  handleSubmit();
                }}
              >
                {/* {errors.submit &&                  <Alert mt={2} mb={1} severity="warning">
                    {errors.submit}
             </Alert>
                )} */}
                {message && (
                  <Alert mt={2} mb={1} severity="success">
                    {message}
                  </Alert>
                )}

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
                    {/* <Typography>{errors.firstName?.message}</Typography> */}
                    <Typography variant="subtitle1">Last Name*</Typography>
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
                    {/* <Typography>{errors.lastName?.message}</Typography> */}
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
                    {" "}
                    <Typography variant="subtitle1">Email Address*</Typography>
                    <TextField
                      type="email"
                      name="email"
                      value={values.email}
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {/* <Typography>{errors.emailName?.message}</Typography> */}
                  </Grid>
                </Grid>

                <Divider variant="middle" />
                <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Language
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      select a language*
                    </Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={Language}
                      sx={{ width: "100%" }}
                      error={Boolean(touched.language && errors.language)}
                      helperText={touched.language && errors.language}
                      value={values.language}
                      onBlur={handleBlur}
                      onChange={(e, value) => {
                        setFieldValue("language", value);
                        console.log("valueeeee", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} name="language" />
                      )}
                    ></Autocomplete>
                    {/* <Typography>{errors.languageName?.message}</Typography> */}
                  </Grid>
                </Grid>

                <Divider variant="middle" />

                <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Role
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      select a Role*
                    </Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={Role}
                      sx={{ width: "100%" }}
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
                      value={values.role}
                      onBlur={handleBlur}
                      onChange={(e, value) => {
                        setFieldValue("role", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} name="role" />
                      )}
                    ></Autocomplete>
                    {/* <Typography>{errors.roleName?.message}</Typography> */}
                  </Grid>
                </Grid>

                {/* <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Address line 2
                    </Typography>
                    <TextField
                      type="text"
                      name="addressTwo"
                      // value={values.addressTwo}
                      error={Boolean(touched.addressTwo && errors.addressTwo)}
                      fullWidth
                      helperText={touched.addressTwo && errors.addressTwo}
                      // onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Grid container>
                      <Grid item xs={5} sx={{ backgroundColor: "" }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Postal code
                        </Typography>
                        <TextField
                          type="number"
                          name="postalCode"
                          // value={values.postalCode}
                          error={Boolean(
                            touched.postalCode && errors.postalCode
                          )}
                          fullWidth
                          helperText={touched.postalCode && errors.postalCode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid xs={1}></Grid>
                      <Grid item xs={6} sx={{ backgroundColor: "" }}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          City
                        </Typography>
                        <TextField
                          type="text"
                          name="city"
                          // value={values.city}
                          error={Boolean(touched.city && errors.city)}
                          fullWidth
                          helperText={touched.city && errors.city}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Country
                    </Typography>
                    <TextField
                      type="text"
                      name="countryName"
                      // value={values.countryName}
                      error={Boolean(touched.countryName && errors.countryName)}
                      fullWidth
                      helperText={touched.countryName && errors.countryName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    /> */}
                {/* <Select
                      displayEmpty
                      value={countryName}
                      fullWidth
                      onChange={handleChangeCountryName}
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
                      {countryNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, countryName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select> */}

                {/* {isLoading && <Loader />}
                <Divider variant="middle" />
                <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Contact Details
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Telephone
                    </Typography>
                    <TextField
                      type="text"
                      name="telephone"
                      // value={values.telephone}
                      error={Boolean(touched.telephone && errors.telephone)}
                      fullWidth
                      helperText={touched.telephone && errors.telephone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Website
                    </Typography>
                    <TextField
                      type="text"
                      name="website"
                      // value={values.website}
                      error={Boolean(touched.website && errors.website)}
                      fullWidth
                      helperText={touched.website && errors.website}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle" /> */}
                {/* <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Reference{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    {!checked && (
                      <>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Account external reference*
                        </Typography>
                        <TextField
                          type="text"
                          name="accountExternalReference"
                          // value={values.accountExternalReference}
                          error={Boolean(
                            touched.accountExternalReference &&
                              errors.accountExternalReference
                          )}
                          fullWidth
                          helperText={
                            touched.accountExternalReference &&
                            errors.accountExternalReference
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </>
                    )}

                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      <Checkbox
                        checked={checked}
                        onChange={(e) => handleChangeCheckButton(e)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      I have no external reference{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant="middle" /> */}
                {/* <Grid container>
                  <Grid item xs={3} sx={{ bgcolor: "" }}>
                    <Typography variant="h4" p={7}>
                      Partner account
                    </Typography>
                  </Grid>
                  <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Select a partner*
                    </Typography>
                    <Select
                      displayEmpty
                      value={partnerAccount}
                      fullWidth
                      // defaultValue={name}
                      onChange={handleChangePartnerName}
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
                      {partnerNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStylesofPartner(
                            name,
                            partnerAccount,
                            theme
                          )}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid> */}
                {/* <Divider variant="middle" />
                <Grid>
                  {" "}
                  <Typography variant="h4" p={7}>
                    Primary user
                    <Typography variant="subtitle1">
                      Fill up the primary user datails
                    </Typography>
                  </Typography>
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
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                      >
                        Email
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
                </Grid> */}
                <Divider variant="middle" />
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  my={3}
                >
                  <Button
                    onClick={() => {
                      onCancel();
                    }}
                    // type="submit"
                    variant="contained"
                    disabled={isSubmitting}
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
                      borderColor: "#3c98eb",
                      color: "primary",
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

export default withTheme(EditUser);
