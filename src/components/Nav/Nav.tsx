import FeedIcon from "@mui/icons-material/Feed";
import HubIcon from "@mui/icons-material/Hub";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
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
        icon={<HubIcon sx={iconProps} />}
        label="DAOs"
        description="DAOs are the heart of Boom. They are NFT gated communities made up of Solana's biggest fans."
        routePath={RoutePath.HOME}
      />
      <HeroNavLink
        icon={<FeedIcon sx={iconProps} />}
        label="Feed"
        description="The Feed is like Twitter where you can post Meeps by connecting your wallet. It's a great place to start."
        routePath={RoutePath.FEED}
      />
      <HeroNavLink
        icon={<NewspaperIcon sx={iconProps} />}
        label="News"
        description="News pulls in all the latest news from the Solana ecosystem. It's your place to keep up to date."
        routePath={RoutePath.NEWS}
      />
      <HeroNavLink
        icon={<ScienceIcon sx={iconProps} />}
        label="Lab"
        description="The Lab is where you can find all Boom's latest Solana experiments and tools."
        routePath={RoutePath.LAB}
      />
      <NavLink style={applyActiveStyles} to={`${RoutePath.MINT_NFT}`}>
        <Stack direction="row" {...stackProps}>
          {/* <StyleIcon sx={iconProps} /> */}
          <Typography variant="body1">Mint NFT</Typography>
        </Stack>
      </NavLink>
      {/* <NavLink sx={applyActiveStyles} to={`${RoutePath.AUCTIONS}`}>
            <Stack direction="row" {...stackProps}>
              <GavelIcon sx={iconProps} />
              <Typography variant="body1">Auctions</Typography>
            </Stack>
          </NavLink> */}
    </StyledStack>
  );
};
