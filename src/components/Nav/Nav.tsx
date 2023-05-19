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
import React, { ReactElement } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SpeedIcon from "@mui/icons-material/Speed";
import StyleIcon from "@mui/icons-material/Style";
import {
  Badge,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { RoutePath } from "../../constants";
import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { User } from "../../generated/graphql";
import { Logout } from "../Auth/Logout";
import { ColorModeContext } from "../../contexts/theme";

interface Props {
  newMentionsCount: number | undefined;
  user: User | null;
}

interface HeroNavLinkProps {
  icon: ReactElement;
  label: string;
  description: string;
  routePath: RoutePath;
  applyActiveStyles: any;
}

const HeroNavLink: React.FC<HeroNavLinkProps> = ({
  icon,
  label,
  description,
  routePath,
  applyActiveStyles,
}) => {
  const theme = useTheme();
  const h5Styles = {
    my: 0.5,
  };
  const stackProps = {
    justifyContent: "flex-start",
    flexGrow: 1,
    spacing: 2,
    alignItems: "center",
    backgroundColor: theme.blue.darker,
    sx: {
      borderRadius: "3px",
      border: `1px solid ${alpha(theme.accentColor, 0.5)}`,
      width: "100%",
      p: 1,
      "&:hover": {
        backgroundColor: alpha(theme.accentColor, 0.2),
      },
    },
  };
  return (
    <NavLink end style={applyActiveStyles} to={routePath}>
      <Box {...stackProps}>
        <Stack direction="row" alignItems="top">
          <Box>
            {icon}
          </Box>
          <Box ml={1}>
            <Typography variant="h5" sx={h5Styles}>
              {label}
            </Typography>
            <Typography variant="body2" color="secondary">
              {description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </NavLink>
  );
};

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
      px: 1,
    },
  };

  const StyledStack = styled(Stack)({
    height: "calc(100vh - 49px)",
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
        routePath={RoutePath.DAO}
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
          <NavLink style={applyActiveStyles} to={`/${RoutePath.DAO}`}>
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
