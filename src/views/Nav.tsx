import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GroupIcon from "@mui/icons-material/Group";
import Language from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import React, { useContext } from "react";
import StyleIcon from "@mui/icons-material/Style";
import TagIcon from "@mui/icons-material/Tag";
import { Avatar, Badge, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChannelStatus } from "../constants";
import { MorePopUp } from "../components/MorePopup";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/theme";
import { User as StoreUser } from "../contexts/user";
import { styled } from "@mui/material/styles";
import { useChannelsQuery } from "../generated/graphql";

interface Props {
  newMentionsCount: number | undefined;
  user: StoreUser | null;
}

export const Nav: React.FC<Props> = ({ newMentionsCount, user }) => {
  const { theme } = useContext(ThemeContext);
  const iconProps = {
    color: theme.accentColor,
  };

  const { data } = useChannelsQuery();

  const activeChannels = () => {
    return data?.channels?.filter((c) => c.status === ChannelStatus.ACTIVE);
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
          <NavLink style={applyActiveStyles} to="/">
            <Stack direction="row" {...stackProps}>
              <Language style={iconProps} />
              <Typography variant="body1">Community</Typography>
            </Stack>
          </NavLink>

          <NavLink style={applyActiveStyles} to="/mint-boom-hero">
            <Stack direction="row" {...stackProps}>
              <AutoGraphIcon sx={iconProps} />
              <Typography variant="body1">Mint Boom Hero</Typography>
            </Stack>
          </NavLink>
          {user?.handle && (
            <NavLink style={applyActiveStyles} to="/channels">
              <Stack direction="row" {...stackProps}>
                <TagIcon sx={iconProps} />
                <Typography variant="body1">Channels</Typography>
              </Stack>
            </NavLink>
          )}
          <NavLink style={applyActiveStyles} to="/mint-nft">
            <Stack direction="row" {...stackProps}>
              <StyleIcon sx={iconProps} />
              <Typography variant="body1">Mint NFT</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/following">
            <Stack direction="row" {...stackProps}>
              <Person sx={iconProps} />
              <Typography variant="body1">
                Following
              </Typography>
            </Stack>
          </NavLink>

          {user?.handle && (
            <>
              <NavLink style={applyActiveStyles} to="/connect">
                <Stack direction="row" {...stackProps}>
                  <GroupIcon sx={iconProps} />
                  <Typography variant="body1">Creators</Typography>
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
            </>
          )}
          <MorePopUp iconProps={iconProps} stackProps={stackProps} />
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
