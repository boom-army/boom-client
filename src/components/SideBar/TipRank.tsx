import { useState, useEffect, FC, useContext } from "react";
import {
  Typography,
  Box,
  Link,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
} from "@mui/material";
import BMAIcon from "../../icons/bma.svg";
import {
  Maybe,
  TipCount,
  TipLeader,
  User,
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
import { styled } from "@mui/material/styles";

const BMAIconWrapper = styled("span")((props) => ({
  svg: {
    verticalAlign: "-4px",
    path: {
      fill: props.theme.secondaryColor,
    },
  },
}));

export const TipRank: FC<{}> = () => {
  const { theme } = useContext(ThemeContext);
  const [formattedData, setFormattedData] = useState<TipCount>();
  const [activeButton, setActiveButton] = useState("30 days");

  const [loadTips, { data, loading, error }] = useTipCountUsersLazyQuery();
  const [dateFrom, setDateFrom] = useState<string | null>(
    dayjs().subtract(30, "day").format("YYYY-MM-DD")
  );

  useEffect(() => {
    loadTips({
      variables: { dateFrom, leaders: 3 },
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

  const rowPlacement = (index: number) => {
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

  const NameCard = ({ user }: { user: Maybe<User> | undefined }) => (
    <Box sx={{ overflow: "hidden" }}>
      <Link
        href={`/${user?.handle}`}
        sx={{
          textDecoration: "none",
          wordWrap: "break-word",
          fontSize: "1rem",
        }}
      >
        <strong>@{user?.handle}</strong>
        {user?.data?.avatarUpdateAuthority === HARKL_ID && (
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
  );

  if (loading) {
    return <Loader />;
  }
  if (error) return <CustomResponse text={error.message} />;

  return formattedData ? (
    <Box p={2}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          sx={{ color: theme.secondaryColor }}
          variant="body2"
          alignSelf={"center"}
        >
          <BMAIconWrapper>
            <BMAIcon />
          </BMAIconWrapper>{" "}
          Top Tippers
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
      <List>
        {formattedData?.leaders?.map((leader, i) => (
          <ListItem key={leader?.user?.id} sx={{ padding: 0 }}>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: rowPlacement(i),
                    color: rowPlacement(i),
                    boxShadow: `0 0 0 2px ${theme.background}`,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                  },
                }}
              >
                <UserAvatar
                  avatar={leader?.user?.avatar}
                  isNFT={leader?.user?.data?.avatarMint}
                  sx={{ width: 38, height: 38, mr: 0.2 }}
                />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={<NameCard user={leader?.user} />}
              secondary={`${leader?.total} BMA`}
            />
          </ListItem>
        ))}
      </List>
      <Box>
        <Link
          href={`/leaderboard`}
          sx={{ textDecoration: "none", fontSize: "14px" }}
        >
          goto leaderboard
        </Link>
      </Box>
    </Box>
  ) : null;
};
