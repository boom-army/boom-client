import { useState, useEffect, FC, useContext } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
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
import { ThemeContext } from "../../contexts/theme";
import dayjs from "dayjs";

export const UserTipsTable: FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  const [formattedData, setFormattedData] = useState<TipCount>();
  const [activeButton, setActiveButton] = useState("1m");

  const [loadTips, { data, loading, error }] = useTipCountUsersLazyQuery();
  const [dateFrom, setDateFrom] = useState<string | null>(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );

  useEffect(() => {
    loadTips({
      variables: { dateFrom, leaders: 30 },
    });
  }, [dateFrom]);

  useEffect(() => {
    if (data) {
      const totalTips = boomNumFormat(data?.tipCount?.total as string);
      const updatedLeaders = map(data?.tipCount?.leaders, (obj: TipLeader) => ({
        ...obj,
        total: boomNumFormat(obj.total as string),
      }));
      console.log({ ...data, total: totalTips, leaders: updatedLeaders });
      // @ts-ignore
      setFormattedData({ ...data, total: totalTips, leaders: updatedLeaders });
    }
  }, [data]);

  const setTimeFrame = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setActiveButton(newAlignment);
    switch (newAlignment) {
      case "1d":
        setDateFrom(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
        break;
      case "7d":
        setDateFrom(dayjs().subtract(7, "day").format("YYYY-MM-DD"));
        break;
      default:
        setDateFrom(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
        break;
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error) return <CustomResponse text={error.message} />;

  return formattedData ? (
    <Box p={2}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h3" component="h1" alignSelf={"center"}>
          User Tip Leaderboard
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={activeButton}
          exclusive
          onChange={setTimeFrame}
          aria-label="Tip Leader Time Range"
        >
          <ToggleButton value="1d">24h</ToggleButton>
          <ToggleButton value="7d">7d</ToggleButton>
          <ToggleButton value="1m">30d</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid
        container
        justifyContent={"center"}
        my={2}
        p={2}
        sx={{ border: `1px solid ${theme.accentColor}` }}
      >
        <Grid item xs={12} mb={1}>
          <Typography variant="h2" align="center">
            {formattedData?.total} BMA
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p" align="center">
            Total Tips since {dayjs(dateFrom).fromNow()}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="User Tip Leaderboard">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Handle</TableCell>
              <TableCell align="right">Total Tips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedData?.leaders?.map((leader, i) => (
              <TableRow key={leader?.user?.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{leader?.user?.handle}</TableCell>
                <TableCell align="right">{leader?.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;
};
