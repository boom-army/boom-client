import React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { HeroNavLink } from "../components/Nav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import Person from "@mui/icons-material/Person";
import SavingsIcon from "@mui/icons-material/Savings";
import SearchIcon from "@mui/icons-material/Search";
import SpeedIcon from "@mui/icons-material/Speed";
import StyleIcon from "@mui/icons-material/Style";
import ScienceIcon from "@mui/icons-material/Science";
import { RoutePath } from "../constants";
import { headerOffset } from "../utils/boom-web3/constants";

export const Lab = () => {
  const theme = useTheme();
  const iconProps = {
    color: theme.accentColor,
  };
  const user = { handle: "harkl" };
  return (
    <Grid container spacing={1} p={2} sx={{ height: headerOffset }}>
      <Grid item xs={12} display={"flex"}>
        <ScienceIcon fontSize="large" />
        <Typography variant="h1" display={"inline"}>
          The Lab
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/assets/lab.png"
            alt="LAB"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              width: "auto",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Stack spacing={1}>
          <Typography variant="body1">
            In the vile underbelly of the digital beast, there exists a lunatic
            asylum of progressive ideals and audacious functionality, aptly
            dubbed - "The Lab."
          </Typography>
          <Typography variant="body1">
            Here, the brave and the mad ride the turbulent waves of Solana's
            burgeoning techscape, daring to dream, to innovate, to fathom the
            unfathomable. Each pixel thrums with the uncontainable potential of
            the unknown, sparking in the lunacy of 400 milliseconds.
          </Typography>
          <Typography variant="body1">
            The Lab, my dear savages, is not a mere corner of the web; it's a
            feverish vortex of intellectual anarchy, a technicolor cauldron of
            cyber alchemists desperately attempting to transmute digital lead
            into gold.
          </Typography>
          <Typography variant="body1">
            It's a psychedelic funhouse where boundaries are pulverized and
            paradigms are vaporized. Where quantum wizards and blockchain
            conjurers spit in the face of convention, daring to dance with the
            whirlwind of the ceaseless digital torrent.
          </Typography>
          <Typography variant="body1">
            Every failure, every triumph, every mad dash towards the unforeseen
            future is captured here, in this manic mecca of cybernetic
            pioneering. The Lab is more than an experiment, it's the digital
            equivalent of plunging into the abyss with nothing but a transistor
            radio and a fistful of audacity. Here, on the knife edge of the
            tomorrow, we find the spirit of the internet.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<SpeedIcon sx={iconProps} />}
          label="Dashboard"
          description="Provides an overview of your account and activity."
          // @ts-ignore
          routePath={`../${RoutePath.DASHBOARD}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<SavingsIcon sx={iconProps} />}
          label="Tip Leaders"
          description="Displays the leaderboard of top tip earners."
          // @ts-ignore
          routePath={`../${RoutePath.LEADERBOARD}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<GroupIcon sx={iconProps} />}
          label="People"
          description="Shows a list of all users on the platform."
          // @ts-ignore
          routePath={`../${RoutePath.PEOPLE}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<SearchIcon sx={iconProps} />}
          label="Search"
          description="Enables you to search for specific content or users."
          // @ts-ignore
          routePath={`../${RoutePath.EXPLORE}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<StyleIcon sx={iconProps} />}
          label="Mint NFT"
          description="Allows you to mint and create your own NFTs."
          // @ts-ignore
          routePath={`../${RoutePath.MINT_NFT}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<Person sx={iconProps} />}
          label="Following"
          description="Shows the list of users you are following."
          // @ts-ignore
          routePath={`../${RoutePath.FOLLOWING}`}
        />
      </Grid>
      <Grid item xs={12}>
        <HeroNavLink
          icon={<AccountCircleIcon sx={iconProps} />}
          label="Profile"
          description="Displays your user profile."
          // @ts-ignore
          routePath={`../${RoutePath.HANDLE_HASH}/${user?.handle}`}
        />
      </Grid>
    </Grid>
  );
};
