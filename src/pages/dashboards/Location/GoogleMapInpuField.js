import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const GoogleMapInpuField = (props) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value && value.value && value?.value?.place_id) {
      props.setPlaceIdFromGoogle(value?.value?.place_id);
    }
  }, []);

  const setPlaceId = (id) => {
    props.setPlaceIdFromGoogle(id);
  };

  return (
    <>
      <Grid>
        <Grid sx={{ padding: "10px", bgcolor: "white" }}>
          <Grid>
            <Typography variant="h4" p={7}>
              Create new account
              <Typography variant="subtitle1">Create your account</Typography>
            </Typography>
            <Grid container>
              <Grid item xs={3} sx={{ bgcolor: "" }}>
                <Typography variant="h4" p={7}>
                  Setup your account
                </Typography>
              </Grid>
              <Grid item xs={9} p={5} sx={{ bgcolor: "" }}>
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyCrTucXlJJfZ2YSZlyXxevyMa0kZuBKuGs"
                  selectProps={{
                    value,
                    onChange: setPlaceId,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GoogleMapInpuField;
