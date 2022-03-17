import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import Language from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StyleIcon from "@mui/icons-material/Style";
import TagIcon from "@mui/icons-material/Tag";
import { Avatar, Badge, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MorePopUp } from "../components/MorePopup";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/theme";
import { User as StoreUser } from "../contexts/user";
import { styled } from "@mui/material/styles";
import { useChannelsQuery } from "../generated/graphql";
import { ChannelStatus } from "../constants";

interface Props {
  newMentionsCount: Number | undefined;
  user: StoreUser | null;
}

export const Nav: React.FC<Props> = ({ newMentionsCount, user }) => {
  const { theme } = useContext(ThemeContext);
  const iconProps = {
    color: theme.accentColor,
  };

  const { data } = useChannelsQuery();

  const hasActiveChannels = () => {
    const activeChannels = data?.channels?.filter(
      (c) => c.status === ChannelStatus.ACTIVE
    );
    return activeChannels?.length ? true : false;
  };

  const applyActiveStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? theme.accentColor : theme.primaryColor,
  });

  const stackProps = {
    justifyContent: "flex-end",
    spacing: 2,
    alignItems: "center",
    marginRight: "5rem",
  };

  const StyledStack = styled(Stack)({
    minHeight: "100vh",
    paddingTop: "1.3rem",
    marginLeft: "0.5em",
    fontWeight: 500,
    alignItems: "flex-start",
  });

  const StyledStack2 = styled(Stack)({
    minHeight: "100vh",
    paddingTop: "1.3rem",
    borderLeft: `1px solid ${theme.tertiaryColor}`,
    width: "5rem",
    overflowY: "scroll",
    scrollbarWidth: "none",
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
        }}
      >
        <StyledStack direction="column" spacing={4.5}>
          <NavLink style={applyActiveStyles} to="/">
            <Stack direction="row" {...stackProps}>
              <Language style={iconProps} />
              <Typography variant="body1">Community</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/channels">
            <Stack direction="row" {...stackProps}>
              <TagIcon sx={iconProps} />
              <Typography variant="body1">Channels</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to="/mint-nft">
            <Stack direction="row" {...stackProps}>
              <StyleIcon sx={iconProps} />
              <Typography variant="body1">Mint NFT</Typography>
            </Stack>
          </NavLink>
          {/* <NavLink style={applyActiveStyles} to="/following">
        <Stack direction="row" {...stackProps}>
          <Person sx={iconProps} />
          <Typography variant="body1" display={displayProps}>
            Following
          </Typography>
        </Stack>
      </NavLink> */}
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
          {user?.handle && (
            <NavLink style={applyActiveStyles} to={`/${user?.handle}`}>
              <Stack direction="row" {...stackProps}>
                <AccountCircleIcon sx={iconProps} />
                <Typography variant="body1">Profile</Typography>
              </Stack>
            </NavLink>
          )}
          <MorePopUp iconProps={iconProps} stackProps={stackProps} />
        </StyledStack>
        {data && hasActiveChannels() && (
          <StyledStack2>
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              {data &&
                data.channels.map((channel) => (
                  <>
                    <NavLink to={`channels/${channel?.id}`}>
                      <Avatar
                        sx={{ width: 60, height: 60, cursor: "pointer" }}
                        src={channel?.image as string}
                      />
                    </NavLink>
                  </>
                ))}
            </Stack>
          </StyledStack2>
        )}
      </Box>
    </>
  );
};
