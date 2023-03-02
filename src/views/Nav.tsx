import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import GavelIcon from "@mui/icons-material/Gavel";
import GroupIcon from "@mui/icons-material/Group";
import Language from "@mui/icons-material/Language";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import React, { useContext } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import SearchIcon from "@mui/icons-material/Search";
import StyleIcon from "@mui/icons-material/Style";
import { Avatar, Badge, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChannelStatus } from "../constants";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/theme";
import { styled } from "@mui/material/styles";
import { useGetChannelsQuery, User } from "../generated/graphql";
import { Logout } from "../components/Auth/Logout";
import { ChangeColor } from "../components/ChangeColor";
import { ToggleTheme } from "../components/ToggleTheme";
interface Props {
  newMentionsCount: number | undefined;
  user: User | null;
}

export const Nav: React.FC<Props> = ({ newMentionsCount, user }) => {
  const { theme } = useContext(ThemeContext);
  const iconProps = {
    color: theme.accentColor,
  };

  const { data } = useGetChannelsQuery();

  const activeChannels = () => {
    return data?.getChannels?.filter((c) => c.status === ChannelStatus.ACTIVE);
  };

  const applyActiveStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? theme.accentColor : theme.primaryColor,
  });

  const stackProps = {
    justifyContent: "flex-end",
    spacing: 2,
    alignItems: "center",
  };

  const StyledStack = styled(Stack)({
    minHeight: "100vh",
    paddingTop: "1.3rem",
    width: "70%",
    marginLeft: "0.5em",
    fontWeight: 500,
    alignItems: "flex-start",
    "@media screen and (max-width: 900px)": {
      minWidth: "150px",
    },
  });

  const StyledStack2 = styled(Stack)({
    minHeight: "100vh",
    paddingTop: "1.3rem",
    borderLeft: `1px solid ${theme.tertiaryColor}`,
    overflowY: "scroll",
    scrollbarWidth: "none",
    width: "30%",
    "@media screen and (max-width: 900px)": {
      minWidth: "70px",
    },
    ".active": {
      "& .MuiAvatar-root": {
        border: `3px solid ${theme.accentColor}`,
      },
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& .MuiAvatar-root": {
      "&:hover": {
        border: `3px solid ${theme.accentColor}`,
        filter: "saturate(150%)",
      },
    },
  });

  const DynamicAvatar = styled(Avatar)`
    cursor: "pointer";
    ${(props) => props.theme.breakpoints.up("sm")} {
      width: 30px;
      height: 30px;
    }
    ${(props) => props.theme.breakpoints.up("md")} {
      width: 40px;
      height: 40px;
    }
    ${(props) => props.theme.breakpoints.up("lg")} {
      width: 50px;
      height: 50px;
    }
    ${(props) => props.theme.breakpoints.up("xl")} {
      width: 60px;
      height: 60px;
    }
  `;

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          width: "100%",
        }}
      >
        <StyledStack key="main-stack" direction="column" spacing={4.5}>
          <NavLink end style={applyActiveStyles} to="/">
            <Stack direction="row" {...stackProps}>
              <Language style={iconProps} />
              <Typography variant="body1">Hero Feed</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/news">
            <Stack direction="row" {...stackProps}>
              <NewspaperIcon style={iconProps} />
              <Typography variant="body1">News</Typography>
            </Stack>
          </NavLink>
          {/* <NavLink style={applyActiveStyles} to="/auctions">
            <Stack direction="row" {...stackProps}>
              <GavelIcon style={iconProps} />
              <Typography variant="body1">Auctions</Typography>
            </Stack>
          </NavLink> */}
          <NavLink style={applyActiveStyles} to="/mint-nft">
            <Stack direction="row" {...stackProps}>
              <StyleIcon sx={iconProps} />
              <Typography variant="body1">Mint NFT</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/connect">
            <Stack direction="row" {...stackProps}>
              <GroupIcon sx={iconProps} />
              <Typography variant="body1">People</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/explore">
            <Stack direction="row" {...stackProps}>
              <SearchIcon sx={iconProps} />
              <Typography variant="body1">Search</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/leaderboard">
            <Stack direction="row" {...stackProps}>
              <SavingsIcon sx={iconProps} />
              <Typography variant="body1">Tip Leaders</Typography>
            </Stack>
          </NavLink>
          {/* <NavLink style={applyActiveStyles} to="/mint-boom-hero">
            <Stack direction="row" {...stackProps}>
              <AutoGraphIcon sx={iconProps} />
              <Typography variant="body1">Mint Boom Hero</Typography>
            </Stack>
          </NavLink> */}
          {user?.handle && (
            <>
              <NavLink style={applyActiveStyles} to="/channels">
                <Stack direction="row" {...stackProps}>
                  <LockPersonIcon sx={iconProps} />
                  <Typography variant="body1">NFT Chat</Typography>
                </Stack>
              </NavLink>
              <NavLink style={applyActiveStyles} to="/following">
                <Stack direction="row" {...stackProps}>
                  <Person sx={iconProps} />
                  <Typography variant="body1">Following</Typography>
                </Stack>
              </NavLink>
              <NavLink style={applyActiveStyles} to="/notifications">
                <Stack direction="row" {...stackProps}>
                  <Badge
                    max={99}
                    badgeContent={newMentionsCount ?? 0}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "#FFFFFF",
                        backgroundColor: theme.accentColor,
                      },
                    }}
                  >
                    <NotificationsIcon sx={iconProps} />
                  </Badge>
                  <Typography variant="body1">Notifications</Typography>
                </Stack>
              </NavLink>
              <NavLink style={applyActiveStyles} to={`/${user?.handle}`}>
                <Stack direction="row" {...stackProps}>
                  <AccountCircleIcon sx={iconProps} />
                  <Typography variant="body1">Profile</Typography>
                </Stack>
              </NavLink>
              <ToggleTheme stackProps={stackProps} iconProps={iconProps} />
              <ChangeColor stackProps={stackProps} iconProps={iconProps} />
              <Logout stackProps={stackProps} iconProps={iconProps} />
            </>
          )}
        </StyledStack>
        {activeChannels()?.length ? (
          <StyledStack2 key="channel-stack">
            <Stack
              key="channel-stack-child"
              direction="column"
              sx={{ justifyContent: "center" }}
            >
              {activeChannels()?.map((channel) => (
                <Box
                  key={channel.id}
                  mb={2}
                  display={"flex"}
                  sx={{ justifyContent: "center" }}
                >
                  <NavLink to={`channels/${channel?.id}`}>
                    <DynamicAvatar src={channel?.image as string} />
                  </NavLink>
                </Box>
              ))}
            </Stack>
          </StyledStack2>
        ) : null}
      </Box>
    </>
  );
};
