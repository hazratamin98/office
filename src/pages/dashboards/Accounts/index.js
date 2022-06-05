import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  CardContent,
  Checkbox,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Card,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import MoreVert from "@mui/icons-material/MoreVert";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import Loader from "../../../components/Loader";

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
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },
  closeIcon: {
    height: "100%",
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => ({
    el,
    index,
  }));
  stabilizedThis.sort((a, b) => {
    const order = comparator(a.el, b.el);
    if (order !== 0) return order;
    return a.index - b.index;
  });
  return stabilizedThis.map((element) => element.el);
}

const headCells = [
  { id: "id", alignment: "left", label: "ID" },
  { id: "name", alignment: "left", label: "Name" },
  { id: "Contact", alignment: "left", label: "Contact" },
  { id: "Telephone number", alignment: "left", label: "Telephone number" },
  { id: "locations", alignment: "left", label: "locations" },
  { id: "actions", alignment: "right" },
];

const AccountsOverView = (props) => {
  const classes = useStyles();
  const [loadig, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [allCompanies, setAllCompanies] = useState([]);
  const [partnerFilter, setPartnerFilter] = useState([]);
  const [filterWithName, setFilterWithName] = useState("");
  const [partners, setPartners] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
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
        setPartners(res.data.data);
        console.log("customers", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllCustomer();
  }, []);

  let allCustomer = [];
  partners.forEach((customer) => {
    // console.log("aaaaaa", customer.users);

    allCustomer.push(customer);
  });
  const PartnerHandleChange = (selectedCustomer) => {
    setPartnerFilter(selectedCustomer.id);
  };
  const filterByName = (e) => {
    setFilterWithName(e.target.value);
  };

  const FilterData = async () => {
    console.log("filterWithName", filterWithName);

    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/company?sortBy=${orderBy}&sortOrder=${order}&partnerId=${partnerFilter}&searchTerm=${filterWithName}`,
        config
      );
      if (res.status >= 200) {
        setAllCompanies(res.data.data);
        console.log("SelectedParter", res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allCompanies.length - page * rowsPerPage);
  return (
    <>
      <Typography variant="h2">Accounts overview</Typography>
      <Typography variant="h6">
        With this view you can see all your customers and drill into each and
        everyone of them.
      </Typography>
      <br />

      <Paper>
        <Grid container alignItems="center" display="flex">
          <Grid item xs={0.8} sm={0.8}>
            Partner:{" "}
          </Grid>
          <Grid item xs={2.2} sm={2.2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allCustomer}
              getOptionLabel={(option) => option.name}
              onChange={(e, customer) => {
                PartnerHandleChange(customer);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Filter partners" />
              )}
            />
          </Grid>
          <Grid item xs={0.5} sm={0.5}>
            <IconButton>
              <SearchIcon className={classes.searchIcon} />
            </IconButton>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div className={classes.search}>
              <InputBase
                placeholder="Filter accounts"
                onChange={filterByName}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={0.5} sm={0.5}>
            <CloseIcon className={classes.closeIcon} />
          </Grid>
          <Grid item xs={2} sm={2}>
            <LoadingButton
              sx={{ width: "100%", height: "50px", fontSize: "initial" }}
              variant="contained"
              color="secondary"
              mr={5}
              //   loading={isLaoding}
              onClick={(e) => {
                FilterData(e);
              }}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        {loadig && <Loader />}
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <TableHead sx={{ background: "gray" }}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignment}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {stableSort(allCompanies, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.id}-${index}`}>
                      <TableCell sx={{ cursor: "pointer" }}>{row.id}</TableCell>
                      <TableCell sx={{ cursor: "pointer" }} align="left">
                        <Link to={`${row.id}`}>{row.name}</Link>
                      </TableCell>

                      <TableCell align="left">
                        {row?.users && row.users[0].isPrimary
                          ? row.users[0].firstName +
                            " " +
                            row.users[0].firstName
                          : null}
                      </TableCell>

                      <TableCell align="left">{row.telephone}</TableCell>

                      <TableCell sx={{ cursor: "pointer" }} align="left">
                        {row.locations.length}
                      </TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton
                            aria-label="edit"
                            size="large"
                            //   onClick={() =>
                            //     navigate("/edit_location", {
                            //       state: { row },
                            //     })
                            //   }
                          >
                            <MoreVert />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AccountsOverView;
