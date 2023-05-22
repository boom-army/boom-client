import ArticleIcon from '@mui/icons-material/Article';
import FeedIcon from "@mui/icons-material/Feed";
import GitHubIcon from '@mui/icons-material/GitHub';
import HubIcon from "@mui/icons-material/Hub";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import StarsIcon from '@mui/icons-material/Stars';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { ColorModeContext } from "../../contexts/theme";
import { HeroNavLink } from ".";
import { Logout } from "../Auth/Logout";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants";
import { Stack, Typography, useTheme } from "@mui/material";
import { User } from "../../generated/graphql";
import { styled } from "@mui/material/styles";

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
    spacing: 1,
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
    justifyContent: "space-between",
    height: "100vh",
    "@media screen and (max-width: 900px)": {
      minWidth: "150px",
    },
  });

  return (
    <StyledStack key="main-stack" direction="column" spacing={1}>
      <Stack key="top-nav-stack" direction="column" spacing={1}>
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
      </Stack>
      <Stack key="bottom-nav-stack" direction="column" spacing={1}>
        <NavLink style={applyActiveStyles} to={"https://www.tensor.trade/trade/boomheroes"} target="_blank">
          <Stack direction="row" {...stackProps}>
            <StarsIcon sx={iconProps} fontSize="small" />
            <Typography variant="body2" color="secondary">Buy a Boom DAO NFT</Typography>
          </Stack>
        </NavLink>
        <NavLink style={applyActiveStyles} to={"https://moonrank.app/collection/boom_heroes"} target="_blank">
          <Stack direction="row" {...stackProps}>
            <WorkspacePremiumIcon sx={iconProps} fontSize="small" />
            <Typography variant="body2" color="secondary">Boom Heroes Rarity</Typography>
          </Stack>
        </NavLink>
        <NavLink style={applyActiveStyles} to={"https://docs.boom.army/blog/"} target="_blank">
          <Stack direction="row" {...stackProps}>
            <ArticleIcon sx={iconProps} fontSize="small" />
            <Typography variant="body2" color="secondary">Blog</Typography>
          </Stack>
        </NavLink>
        <NavLink style={applyActiveStyles} to={"https://jup.ag/swap/USDC-BMA"} target="_blank">
          <Stack direction="row" {...stackProps}>
            <SwapHorizontalCircleIcon sx={iconProps} fontSize="small" />
            <Typography variant="body2" color="secondary">USDC-BMA</Typography>
          </Stack>
        </NavLink>
        <NavLink style={applyActiveStyles} to={"https://github.com/boom-army"} target="_blank">
          <Stack direction="row" {...stackProps}>
            <GitHubIcon sx={iconProps} fontSize="small" />
            <Typography variant="body2" color="secondary">Boom Github</Typography>
          </Stack>
        </NavLink>
      </Stack>
    </StyledStack>
  );
};
