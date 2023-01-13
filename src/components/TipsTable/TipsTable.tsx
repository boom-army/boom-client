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
import {
  TipCount,
  TipLeader,
  useTipCountUsersLazyQuery,
} from "../../generated/graphql";
import { Loader } from "../Loader";
import { CustomResponse } from "../CustomResponse";
import { boomNumFormat } from "../../utils/utils";
import { map } from "lodash";

export const UserTipsTable: FC<{}> = () => {
  const [DateFrom, setDateFrom] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<TipCount>();

  const [loadTips, { data, loading, error }] = useTipCountUsersLazyQuery();

  useEffect(() => {
    loadTips({
      variables: { dateFrom: DateFrom },
    });
  }, []);

  useEffect(() => {
    if (data) {
      const totalTips = `${boomNumFormat(data?.tipCount?.total as string)} BMA`;
      const updatedLeaders = map(data?.tipCount?.leaders, (obj: TipLeader) => ({
        ...obj,
        total: `${boomNumFormat(obj.total as string)} BMA`,
      }));
      console.log({ ...data, total: totalTips, leaders: updatedLeaders });
      // @ts-ignore
      setFormattedData({ ...data, total: totalTips, leaders: updatedLeaders });
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }
  if (error) return <CustomResponse text={error.message} />;

  return formattedData ? (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="User Tip Leaderboard">
          <TableHead>
            <TableRow>
              <TableCell>User handle</TableCell>
              <TableCell align="right">Total Tips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedData?.leaders?.map((leader) => (
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
    </>
  ) : null;
};
