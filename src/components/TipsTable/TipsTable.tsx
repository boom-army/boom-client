import { useState, useEffect, FC } from "react";
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

export const UserTipsTable: FC<{}> = () => {
  const [DateFrom, setDateFrom] = useState<string | null>(null);

  const [loadTips, { data, loading, error }] = useTipCountUsersLazyQuery({
    variables: { dateFrom: DateFrom },
  });

  useEffect(() => {
    loadTips();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return data ? (
    <TableContainer component={Paper}>
      <Table aria-label="User Tip Leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>User handle</TableCell>
            <TableCell align="right">Total Tips</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.tipCount?.leaders?.map((leader) => (
            <TableRow key={leader?.user?.id}>
              <TableCell component="th" scope="row">
                {leader?.user?.handle}
              </TableCell>
              <TableCell align="right">{leader?.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};
