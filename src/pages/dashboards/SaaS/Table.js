import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { MoreVertical } from "react-feather";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

// Data
let id = 0;
function createData(name, license, tech, tickets, sales) {
  id += 1;
  return { id, name, license, tech, tickets, sales };
}

const DashboardTable = ({ allReviews }) => {
  return (
    <>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SourceName </TableCell>
              <TableCell>Average Rating</TableCell>
              <TableCell>Reviews Count </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allReviews.reviewSummary?.sources.map((source) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {source.sourceName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {source.avgRating}
                </TableCell>
                <TableCell component="th" scope="row">
                  {source.reviewCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  );
};

export default DashboardTable;
