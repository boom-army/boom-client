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
  Link,
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
import { boomNumFormat, HARKL_ID } from "../../utils/utils";
import { map } from "lodash";
import { ThemeContext } from "../../contexts/theme";
import dayjs from "dayjs";
import { UserAvatar } from "../UserAvatar";
import { HerofiedIcon } from "../Icons";

export const UserTipsTable: FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  const [formattedData, setFormattedData] = useState<TipCount>();
  const [activeButton, setActiveButton] = useState("30 days");

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
      // @ts-ignore
      setFormattedData({ ...data, total: totalTips, leaders: updatedLeaders });
    }
  }, [data]);

  const awardColorSelect = (index: number) => {
    switch (index) {
      case 0:
        return "#c3a400";
      case 1:
        return "#B4B4B4";
      case 2:
        return "#af956d";
      default:
        return "inherit";
    }
  };

  const setTimeFrame = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setActiveButton(newAlignment);
    switch (newAlignment) {
      case "24 hours":
        setDateFrom(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
        break;
      case "7 days":
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
          Tipping Leaderboard
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={activeButton}
          exclusive
          onChange={setTimeFrame}
          aria-label="Tip Leader Time Range"
        >
          <ToggleButton value="24 hours">24h</ToggleButton>
          <ToggleButton value="7 days">7d</ToggleButton>
          <ToggleButton value="30 days">30d</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid
        container
        justifyContent={"center"}
        my={2}
        py={3}
        sx={{
          border: `1px solid ${theme.accentColor}`,
          backgroundColor: theme.tertiaryColor2,
        }}
      >
        <Grid item xs={12} mb={1.5}>
          <Typography variant="h2" align="center">
            {formattedData?.total} BMA
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p" align="center">
            total tips given in the last {activeButton}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Table aria-label="User Tip Leaderboard">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Tipper</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedData?.leaders?.map((leader, i) => (
              <TableRow
                key={leader?.user?.id}
                sx={{ backgroundColor: awardColorSelect(i) }}
              >
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell>
                  <Box display={"flex"}>
                    <Box>
                      <UserAvatar
                        avatar={leader?.user?.avatar}
                        isNFT={leader?.user?.data?.avatarMint}
                        sx={{ width: 20, height: 20, mr: 1 }}
                      />
                    </Box>
                    <Box>
                      <Link
                        href={`/${leader?.user?.handle}`}
                        sx={{ textDecoration: "none" }}
                        mr={1}
                      >
                        <strong>@{leader?.user?.handle}</strong>
                        {leader?.user?.data?.avatarUpdateAuthority ===
                          HARKL_ID && (
                          <HerofiedIcon
                            sx={{
                              fill: theme.accentColor,
                              width: "1rem",
                              height: "1rem",
                              verticalAlign: "-3px",
                              marginLeft: "0.2rem",
                              opacity: "0.5",
                            }}
                          />
                        )}
                      </Link>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{leader?.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;
};
