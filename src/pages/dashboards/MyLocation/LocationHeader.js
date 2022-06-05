import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Stack,
  Box,
  Paper,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: "1px solid black",
    padding: "7px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),

    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "96%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const LocationHeader = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [customerFilter, setCustomerFilter] = useState([]);
  const [productFilter, setProductFilter] = useState([]);

  const [productIds, setProductIds] = useState([]);
  const [customerIds, setCustomerIds] = useState([]);

  const [apiData, setApiData] = useState([]);
  const [loadig, setLoading] = React.useState(false);

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getAllSubscrpition = async () => {
    try {
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/subscriptions`,
        config
      );
      if (res.status == 200) {
        setApiData(res.data.data);
        console.log("AAAAAAA", res.data.data);
      }
    } catch (error) {}
  };

  const getAllCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company`,
        config
      );
      if (res.status == 200) {
        setAllCompanies(res.data.data);
        console.log("customers", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCustomer();
    getAllSubscrpition();
  }, []);

  const classes = useStyles();

  //   let allSubscription = [];
  //   apiData.forEach((subscriber) => {
  //     allSubscription.push(subscriber.name);
  //   });

  let allCustomer = [];
  allCompanies.forEach((customer) => {
    allCustomer.push(customer);
  });
  // let getLocation = [];
  const locationFilter = async (e) => {
    // console.log(productIds);
    setLoading(true);
    // props.filterList(locationSearch);
    try {
      setLoading(true);
      console.log("locationSearch", locationSearch);

      let selectedProdutArr = [];

      productFilter.forEach((element) => {
        selectedProdutArr.push(element.id);
      });

      console.log("product filer ", selectedProdutArr.join(","));

      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/search?subscriptionIds=${selectedProdutArr.join(
          ","
        )}&searchTerm=${locationSearch}&partnerId=${customerFilter}`,
        config
      );
      if (res.status == 200) {
        console.log("searchLocations", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };

  const customerHandleChange = (selectedCustomer) => {
    setCustomerFilter(selectedCustomer.id);
  };

  const productHandleChange = (selectedProducts) => {
    setProductFilter(selectedProducts);
  };

  const filterLocationHandleChange = (e) => {
    setLocationSearch(e.target.value);
  };

  return (
    <>
      <Paper>
        <Grid container>
          <Grid container xs={6} sm={6} display="flex">
            <Grid item xs={4} sm={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allCustomer}
                getOptionLabel={(option) => option.name}
                onChange={(e, customer) => {
                  customerHandleChange(customer);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Filter by customers" />
                )}
              />
            </Grid>
            <Grid item xs={8} sm={8}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={apiData}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                onChange={(e, values) => {
                  productHandleChange(values);
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Filter by product" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={5} sm={5}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Filter by location"
                onChange={filterLocationHandleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={1} sm={1}>
            <LoadingButton
              sx={{ width: "100%", height: "50px" }}
              variant="contained"
              color="secondary"
              mr={5}
              // loading={isLaoding}
              onClick={(e) => {
                locationFilter();
              }}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default LocationHeader;
