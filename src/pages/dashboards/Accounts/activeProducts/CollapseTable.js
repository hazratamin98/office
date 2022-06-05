import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip } from "@mui/material";
import { important } from "polished";
function Row(props) {
  const { row } = props;
  const { emptyRows } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover tabIndex={-1} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
          <br />
          {"Location ID: " + row.id}
        </TableCell>

        {/* <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={8} />
        </TableRow>
      )} */}

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow hover tabIndex={-1}>
                    <TableCell>Products</TableCell>
                    <TableCell>Start date</TableCell>
                    <TableCell align="right">Renewal date</TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.locationSubscription.map((sub) => (
                    <TableRow hover tabIndex={-1} key={sub.subscription.id}>
                      <TableCell
                        sx={{ color: "#87CEFA" }}
                        component="th"
                        scope="row"
                      >
                        {sub.subscription.name}
                      </TableCell>
                      <TableCell>{sub.subscription.createdAt}</TableCell>
                      <TableCell align="right">
                        {sub.subscription.updatedAt}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          sx={{
                            height: "35px",
                            fontSize: "initial",
                          }}
                          variant="contained"
                          color="secondary"
                          mr={5}
                        >
                          View product
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  stableSort,
  getComparator,
  page,
  rowsPerPage,
  product,
  order,
  orderBy,
  emptyRows,
  createSortHandler,
}) {
  return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "gray" }}>
          <TableRow>
            <TableCell />
            <TableCell
              key="name"
              sx={{
                width: "100%",
              }}
              align="left"
              padding="normal"
              sortDirection={orderBy === "name" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={createSortHandler("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(product, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <Row key={`${row.id}-${index}`} row={row} emptyRows={emptyRows} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
