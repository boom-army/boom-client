import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import HubIcon from "@mui/icons-material/Hub";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SpeedIcon from "@mui/icons-material/Speed";
import StyleIcon from "@mui/icons-material/Style";
import { Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import { RoutePath } from "../../constants";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { User } from "../../generated/graphql";
import { Logout } from "../Auth/Logout";
import { ColorModeContext } from "../../contexts/theme";
import { HeroNavLink } from ".";

interface Props {
  newMentionsCount: number | undefined;
  user: User | null;
}

export const Nav: React.FC<Props> = ({ newMentionsCount, user }) => {
  const theme = useTheme();
  const { toggleColorMode } = React.useContext(ColorModeContext);

  const applyActiveStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive
      ? theme.accentColor
      : (theme.palette.secondary as unknown as string),
    width: "100%",
  });

  const iconProps = {
    color: theme.accentColor,
  };

  const stackProps = {
    justifyContent: "flex-start",
    flexGrow: 1,
    spacing: 2,
    alignItems: "center",
    sx: {
      width: "100%",
    },
  };

  const StyledStack = styled(Stack)({
    paddingTop: "0.5rem",
    width: "95%",
    fontWeight: 500,
    alignItems: "flex-start",
    "@media screen and (max-width: 900px)": {
      minWidth: "150px",
    },
  });

  return (
    <StyledStack key="main-stack" direction="column" spacing={1}>
      <HeroNavLink
        icon={<HubIcon style={iconProps} />}
        label="DAOs"
        description="DAOs are the heart of Boom. They are NFT gated communities made up of Solana's biggest fans."
        routePath={RoutePath.HOME}
        applyActiveStyles={applyActiveStyles}
      />
      <HeroNavLink
        icon={<FeedIcon style={iconProps} />}
        label="Feed"
        description="The Feed is like Twitter where you can post Meeps by connecting your wallet. It's a great place to start."
        routePath={RoutePath.FEED}
        applyActiveStyles={applyActiveStyles}
      />
      <HeroNavLink
        icon={<NewspaperIcon style={iconProps} />}
        label="News"
        description="News pulls in all the latest news from the Solana ecosystem. It's your place to keep up to date."
        routePath={RoutePath.NEWS}
        applyActiveStyles={applyActiveStyles}
      />
      <HeroNavLink
        icon={<ScienceIcon style={iconProps} />}
        label="Lab"
        description="The Lab is where you can find all Boom's latest Solana experiments and tools."
        routePath={RoutePath.LAB}
        applyActiveStyles={applyActiveStyles}
      />
      <NavLink end style={applyActiveStyles} to={RoutePath.HOME}>
        <Stack direction="row" {...stackProps}>
          <HomeIcon style={iconProps} />
          <Typography variant="body1">Home</Typography>
        </Stack>
      </NavLink>
      <NavLink end style={applyActiveStyles} to={`${RoutePath.DASHBOARD}`}>
        <Stack direction="row" {...stackProps}>
          <SpeedIcon style={iconProps} />
          <Typography variant="body1">Dashboard</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to={`${RoutePath.NEWS}`}>
        <Stack direction="row" {...stackProps}>
          <NewspaperIcon style={iconProps} />
          <Typography variant="body1">News</Typography>
        </Stack>
      </NavLink>
      {/* <NavLink style={applyActiveStyles} to={`${RoutePath.AUCTIONS}`}>
            <Stack direction="row" {...stackProps}>
              <GavelIcon style={iconProps} />
              <Typography variant="body1">Auctions</Typography>
            </Stack>
          </NavLink> */}
      <NavLink style={applyActiveStyles} to={`${RoutePath.MINT_NFT}`}>
        <Stack direction="row" {...stackProps}>
          <StyleIcon sx={iconProps} />
          <Typography variant="body1">Mint NFT</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to={`${RoutePath.PEOPLE}`}>
        <Stack direction="row" {...stackProps}>
          <GroupIcon sx={iconProps} />
          <Typography variant="body1">People</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to={`${RoutePath.EXPLORE}`}>
        <Stack direction="row" {...stackProps}>
          <SearchIcon sx={iconProps} />
          <Typography variant="body1">Search</Typography>
        </Stack>
      </NavLink>
      <NavLink style={applyActiveStyles} to={`${RoutePath.LEADERBOARD}`}>
        <Stack direction="row" {...stackProps}>
          <SavingsIcon sx={iconProps} />
          <Typography variant="body1">Tip Leaders</Typography>
        </Stack>
      </NavLink>
      {/* <NavLink style={applyActiveStyles} to={`${RoutePath.MINT_HERO}`}>
            <Stack direction="row" {...stackProps}>
              <AutoGraphIcon sx={iconProps} />
              <Typography variant="body1">Mint Boom Hero</Typography>
            </Stack>
          </NavLink> */}
      {user?.handle && (
        <>
          <NavLink style={applyActiveStyles} to={RoutePath.HOME}>
            <Stack direction="row" {...stackProps}>
              <LockPersonIcon sx={iconProps} />
              <Typography variant="body1">NFT DAOs</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to={`${RoutePath.FOLLOWING}`}>
            <Stack direction="row" {...stackProps}>
              <Person sx={iconProps} />
              <Typography variant="body1">Following</Typography>
            </Stack>
          </NavLink>
          <NavLink style={applyActiveStyles} to={`${RoutePath.NOTIFICATIONS}`}>
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
          <NavLink
            style={applyActiveStyles}
            to={`${RoutePath.HANDLE_HASH}/${user?.handle}`}
          >
            <Stack direction="row" {...stackProps}>
              <AccountCircleIcon sx={iconProps} />
              <Typography variant="body1">Profile</Typography>
            </Stack>
          </NavLink>
          <Stack
            onClick={toggleColorMode}
            direction="row"
            {...stackProps}
            sx={{ cursor: "pointer" }}
          >
            <InvertColorsIcon sx={iconProps} />
            <Typography variant="body1">Theme</Typography>
          </Stack>
          {/* <ChangeColor stackProps={stackProps} iconProps={iconProps} /> */}
          <Logout stackProps={stackProps} iconProps={iconProps} />
        </>
      )}
    </StyledStack>
  );
};
