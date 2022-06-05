import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
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
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Card,
} from "@mui/material";
import Loader from "../../../components/Loader";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SubscriptionBox from "./SubscriptionBox";
import { green, orange, red } from "@mui/material/colors";
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  Edit,
  MyLocation,
} from "@mui/icons-material";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LocationOnIcon from "@mui/icons-material/ViewModule";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { spacing, SpacingProps } from "@mui/system";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "grey",
  },
});
const CustomWidthTooltipOfDelete = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "red",
  },
});

const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

var rows = [];

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
  { id: "location_name", alignment: "left", label: "Location Name" },
  { id: "customer", alignment: "left", label: "Partner" },
  { id: "products", alignment: "left", label: "Products" },
  { id: "status", alignment: "left", label: "Status" },
  { id: "actions", alignment: "right", label: "Actions" },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
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
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loadig, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [allCompanies, setAllCompanies] = useState([]);
  const [allSubscrpitions, setAllSubscrpitions] = useState([]);

  // ........Dialogue......................
  const [open, setOpen] = React.useState(false);
  const [subBoxOpen, setSubBoxOpen] = React.useState(false);

  const [deleteId, setDeleteId] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [stateSub, setSubState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setSubState({ ...stateSub, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = stateSub;
  const handleSubClickOpen = () => {
    setSubBoxOpen(true);
  };

  const handleSubClose = () => {
    setSubBoxOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteLocation = async () => {
    try {
      const res = await axios.delete(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/${deleteId}`,
        config
      );
      if (res.status == 200) {
        setOpen(false);
        toast("Location deleted successfully");
        getAllLocation();
      }
    } catch (error) {
      console.log("error".error);
    }
  };
  //..........Dialogue end...................

  const getAllLocation = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location`,
        config
      );
      if (res.status == 200) {
        setAllCompanies(res.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(async () => {
    getAllLocation();
  }, []);

  const getAllSubscrpitions = async () => {
    try {
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/subscriptions`,
        config
      );
      if (res.status == 200) {
        setAllSubscrpitions(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(async () => {
    getAllSubscrpitions();
  }, []);
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
    <div>
      {loadig && <Loader />}
      <Paper>
        <Dialog open={subBoxOpen} onClose={handleSubClose}>
          <DialogTitle>Edit Subscriptions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit subscribe of this location please update selection.
            </DialogContentText>
            <Card mb={6}>
              <CardContent>
                <Paper mt={3}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      {allSubscrpitions.map((subscription, index) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={handleChange}
                              name={subscription.name}
                            />
                          }
                          label={subscription.name}
                        />
                        // <div>{subscription.name}</div>
                      ))}
                    </FormGroup>
                  </FormControl>
                </Paper>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubClose}>Cancel</Button>
            <Button onClick={handleSubClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={allCompanies.length}
            />
            <TableBody>
              {stableSort(allCompanies, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={`${row.id}-${index}`}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.partner.name}</TableCell>
                      <TableCell padding="none" align="">
                        {row?.locationSubscription?.length == 0 ? (
                          ""
                        ) : (
                          <Box mr={2}>
                            {row?.locationSubscription.map(function (item, i) {
                              return (
                                <>
                                  {item.subscription.name == "listing" ? (
                                    <CustomWidthTooltip title="Listing">
                                      <IconButton
                                        aria-label="listing"
                                        size="large"
                                      >
                                        <LocationOnIcon />
                                      </IconButton>
                                    </CustomWidthTooltip>
                                  ) : (
                                    ""
                                  )}
                                  {item.subscription.name == "reviews" ? (
                                    <CustomWidthTooltip title="Reviews">
                                      <IconButton
                                        aria-label="reviews"
                                        size="large"
                                      >
                                        <ReviewsIcon />
                                      </IconButton>
                                    </CustomWidthTooltip>
                                  ) : (
                                    ""
                                  )}
                                  {item.subscription.name == "wifiMarketing" ? (
                                    <CustomWidthTooltip title="Wifi Marketing">
                                      <IconButton
                                        aria-label="wifiMarketing"
                                        size="large"
                                      >
                                        <NetworkWifiIcon />
                                      </IconButton>
                                    </CustomWidthTooltip>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <CustomWidthTooltip title="Edit location">
                            <IconButton
                              aria-label="edit"
                              size="large"
                              onClick={() =>
                                navigate("/edit_location", {
                                  state: { row },
                                })
                              }
                            >
                              <Edit />
                            </IconButton>
                          </CustomWidthTooltip>
                          <CustomWidthTooltip title="View location">
                            <IconButton
                              aria-label="view"
                              size="large"
                              onClick={() =>
                                navigate("/view_location/" + row.id, {
                                  state: { row },
                                })
                              }
                            >
                              <LocationOnIcon />
                            </IconButton>
                          </CustomWidthTooltip>
                          <CustomWidthTooltip title="Eit Subscription">
                            <IconButton
                              aria-label="view"
                              size="large"
                              onClick={() => handleSubClickOpen()}
                            >
                              <SubscriptionsIcon />
                            </IconButton>
                          </CustomWidthTooltip>
                          <CustomWidthTooltipOfDelete title="Delete location">
                            <IconButton
                              aria-label="delete"
                              size="large"
                              onClick={() => (
                                setOpen(true), setDeleteId(row.id)
                              )}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CustomWidthTooltipOfDelete>
                          <CustomWidthTooltip title="Active/Inactive Status">
                            <IconButton aria-label="details" size="large">
                              <MoreVertIcon />
                            </IconButton>
                          </CustomWidthTooltip>
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
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Are you sure to delete location?"}
              </DialogTitle>
              {/* <DialogContent>
                <DialogContentText>
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent> */}
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Disagree
                </Button>
                <Button onClick={handleDeleteLocation} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allCompanies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
function MyLocations() {
  return (
    <React.Fragment>
      <Helmet title="Locations" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Location Overview{" "}
          </Typography>

          <Typography variant="subtitle1">
            List of all locations managed by you. Filter or search by using the
            options in the bar below.
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Grid>
    </React.Fragment>
  );
}

export default MyLocations;
