import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useTipCountUsersLazyQuery } from "../../generated/graphql";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTipsTable = () => {
  const classes = useStyles();
  const [loadTips] = useTipCountUsersLazyQuery({
    variables: { dateFrom: "" },
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.getUserTips.sort((a, b) => b.totalTips - a.totalTips));
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Total Tips</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user.email}>
              <TableCell component="th" scope="row">
                {user.user.name}
              </TableCell>
              <TableCell align="right">{user.user.email}</TableCell>
              <TableCell align="right">{user.totalTips}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
