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
  Button,
  Menu,
  MenuItem,
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
import CollapsibleTable from "./CollapseTable";

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
  Menu: {
    "&:hover": {
      backgroundColor: "gray !important",
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

// const headCells = [
//   { id: "Name", alignment: "left", label: "Name" },
//   { id: "Products", alignment: "left", label: "Products" },
//   { id: "Actions", alignment: "left", label: "Actions" },
// ];
// const bodyCells = [
//   { id: "Name", alignment: "left", label: "products" },
//   { id: "Products", alignment: "left", label: "Start date" },
//   { id: "Actions", alignment: "left", label: "Renewal date" },
// ];

const ActiveProducts = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [allCompanies, setAllCompanies] = useState([]);
  const [partnerFilter, setPartnerFilter] = useState([]);
  const [filterWithName, setFilterWithName] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const { id } = props.params;
  console.log("companyId", id);
  const getActiveProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/location?partnerId=${id}&sortBy=${orderBy}&sortOrder=${order}&searchTerm=${filterWithName}`,
        config
      );
      if (res.status == 200) {
        // setAllCompanies(usersArr);
        console.log("Active-productsssss", res.data.data);
        setProducts(res.data.data);
        setLoading(true);
        setIsLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getActiveProducts();
  }, []);

  // let allUsers = [];
  // users.forEach((user) => {
  //   allUsers.push(user);
  // });
  // const PartnerHandleChange = (selectedCustomer) => {
  //   setPartnerFilter(selectedCustomer.id);
  // };
  const filterByName = (e) => {
    setFilterWithName(e.target.value);
  };

  //   const FilterData = async () => {
  //     console.log("filterWithName", filterWithName);

  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/company?partnerId=${partnerFilter}&searchTerm=${filterWithName}`,
  //         config
  //       );
  //       if (res.status >= 200) {
  //         setAllCompanies(res.data.data);
  //         console.log("SelectedParter", res.data.data);
  //         setLoading(false);
  //       }
  //     } catch (error) {}
  //   };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
    getActiveProducts();
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
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <Typography marginTop={"50px"} variant="h5">
        Active Products
      </Typography>
      <br />

      <Paper>
        <Grid container>
          <Grid item xs={8} sm={8}>
            <div className={classes.search}>
              <InputBase
                placeholder="Filter locations"
                onChange={filterByName}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={2} sm={2}>
            <LoadingButton
              sx={{ width: "100%", height: "50px", fontSize: "initial" }}
              variant="contained"
              color="secondary"
              mr={5}
              loading={isLoading}
              //   loading={isLaoding}
              onClick={() => {
                getActiveProducts();
              }}
            >
              Search
            </LoadingButton>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button
              sx={{ width: "100%", height: "50px", fontSize: "initial" }}
              variant="contained"
              color="secondary"
              mr={5}
              //   loading={isLaoding}
            >
              Add new product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading == true ? (
        <>
          <Paper>
            <CollapsibleTable
              stableSort={stableSort}
              getComparator={getComparator}
              page={page}
              rowsPerPage={rowsPerPage}
              product={products}
              emptyRows={emptyRows}
              createSortHandler={createSortHandler}
            />
          </Paper>
        </>
      ) : (
        <>
          <Typography>Loading</Typography>
        </>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.locations?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ActiveProducts;
