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
  Modal,
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
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { SettingsCell } from "@mui/icons-material";

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

const Languages = [
  "English",
  "Dutch",
  "French",
  "German",
  "Spanish",
  "Italian",
  "Portugese",
];

const Roles = ["account-manager", "location-manager"];

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const styleEditUser = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const headCells = [
  { id: "id", alignment: "left", label: "ID" },
  { id: "firstName", alignment: "left", label: "Name" },
  { id: "Contact", alignment: "left", label: "Email" },
  { id: "Telephone number", alignment: "left", label: "Role" },
  { id: "actions", alignment: "right" },
];

const Users = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("firstName");
  const [allCompanies, setAllCompanies] = useState([]);
  const [partnerFilter, setPartnerFilter] = useState([]);
  const [filterWithName, setFilterWithName] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEditUser, setOpenModalEditUser] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const accessToken = window.localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
    getAllUsers();
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const { id } = props.params;
  console.log("iddddd", id);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/admin/users/${id}?sortBy=${orderBy}&sortOrder=${order}&searchTerm=${filterWithName}`,
        config
      );
      if (res.status == 200) {
        // setAllCompanies(res.data.data);
        setUsers(res.data.data);
        console.log("userssssss", res.data.data);
        setLoading(true);
        setIsLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  // let allUsers = [];
  // users.forEach((user) => {
  //   allUsers.push(user);
  // });
  const PartnerHandleChange = (selectedCustomer) => {
    setPartnerFilter(selectedCustomer.id);
  };
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

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenEditUser = () => {
    // setSelectedUser();

    setOpenModalEditUser(true);
  };
  const handleCloseModalEditUser = () => setOpenModalEditUser(false);

  return (
    <>
      <Typography variant="h2">Users</Typography>
      <Typography variant="h6">
        All users associated to this account are listed below.
      </Typography>
      <br />

      <Paper>
        <Grid container>
          <Grid item xs={8} sm={8}>
            <div className={classes.search}>
              <InputBase
                placeholder="Filter users"
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
              onClick={() => {
                getAllUsers();
              }}
            >
              Search
            </LoadingButton>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button
              sx={{ width: "100%", height: "50px", fontSize: "initial" }}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Add new user
            </Button>
            <Modal
              open={openModal}
              // onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Grid container>
                <Grid item>
                  <Box sx={style}>
                    <Typography>Add New User</Typography>
                    <AddUser
                      Language={Languages}
                      Role={Roles}
                      id={props.params}
                      onCancel={handleCloseModal}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Modal>
          </Grid>
        </Grid>
      </Paper>

      {loading == true ? (
        <>
          <Paper>
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
                  {stableSort(users, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      // console.log({ row });
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={`${row.id}-${index}`}
                        >
                          <TableCell sx={{ cursor: "pointer" }}>
                            {row.id}
                          </TableCell>
                          <TableCell sx={{ cursor: "pointer" }} align="left">
                            {row.firstName + " " + row.lastName}
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>

                          <TableCell align="left">{row.role}</TableCell>
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
                                <Button
                                  sx={{
                                    width: "100%",
                                    height: "50px",
                                    fontSize: "initial",
                                  }}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    handleOpenEditUser();
                                    setSelectedUser(row);
                                    console.log("selected user", selectedUser);
                                  }}
                                >
                                  Edit
                                </Button>
                                {/* <MoreVert
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            /> */}
                              </IconButton>
                              {/* <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            // variant={"selectedMenu"}
                            sx={{}}
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              className={classes.Menu}
                              sx={{ backgroundColor: "#D3D3D3" }}
                              // onClick={handleClose}
                            > */}
                              {/* <Button
                                onClick={(row) => {
                                  handleOpenEditUser(row);
                                  // setSelectedUser(users);
                                }}
                              >
                                Edit
                              </Button>
                            </MenuItem> */}

                              {/* <MenuItem
                              className={classes.Menu}
                              sx={{ backgroundColor: "#D3D3D3" }}
                              // onClick={handleClose}
                              //   disableGutters={true}
                            >
                              Reset password
                            </MenuItem>
                          </Menu> */}
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
                  <Modal
                    open={openModalEditUser}
                    // onClose={handleCloseModalEditUser}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Grid container>
                      <Grid item>
                        <Box sx={styleEditUser}>
                          <Typography>Edit User</Typography>
                          <EditUser
                            Language={Languages}
                            Role={Roles}
                            user={selectedUser}
                            id={props.params}
                            onCancel={handleCloseModalEditUser}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Modal>
                </TableBody>
              </Table>
            </TableContainer>
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Users;
