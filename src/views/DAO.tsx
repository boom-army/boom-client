import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Fxnction } from "../components/DAOTweets/Fxnction";
import { DAOPromo } from "../components/Advertising/DAOPromo";
import { RoutePath } from "../constants";

export const DAOView = () => {
  const handleSignUp = () => {};
  const theme = useTheme();

  return (
    <Grid container justifyContent="center" mt={2} px={2}>
      <Grid item xs={12}>
        <Typography variant="h1" mb={2} textAlign="center">
          DAO Infrastructure is Broken on Solana...
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={4}
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <Box sx={{ height: "100%", maxWidth: "100%" }}>
            <Fxnction />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <Stack
              direction="column"
              spacing={2}
              mt={2}
              width="100%"
              sx={{
                p: 2,
                my: 2,
                border: `1px solid ${theme.accentColor}`,
                height: "100%", // Set the height to 100% to match the parent's height
              }}
            >
              <Typography variant="h2" py={1}>
                Really? What are the problems?
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ErrorOutlineIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Solana's native Social based DAO solution? Still missing.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Discord DAOs: too often, just a power party.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Power traits splintering into Telegram. Need we say more?
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Forced 3rd party integration with Solana? Yep.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Day-to-day governance: a literal nightmare.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUserIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Path to the council for users: unclear at best.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ErrorOutlineIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Clear vision and measurable goals? Hardly.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedUserIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    Real incentives for user participation? Non-existent.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LockOpenIcon sx={{ color: theme.accentColor }} />
                  </ListItemIcon>
                  <ListItemText>
                    3rd party lock-in? Totally at the mercy of their API.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsActiveIcon
                      sx={{ color: theme.accentColor }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    Notifications? Scattered around like confetti in different
                    view panes.
                  </ListItemText>
                </ListItem>
              </List>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box py={4}>
          <Typography variant="h2" textAlign="center">
            Boom is building a better way
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <DAOPromo
          heading="Become part of #BoomDAODAO"
          body="Become part of the alpha crew, with full access and participation in Solana's first native Social DAO infrastructure by getting a Boom Hero NFT."
          buttonText="Get a Boom Hero"
          buttonLink="https://www.tensor.trade/trade/boomheroes"
          openBlank={true}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DAOPromo
          heading="Get updates in the Feed"
          body="We'll be posting regular updates and progress to the Feed. You'll be able to publicly comment and interact with the Boom team and other Boom Heroes."
          buttonText="Go to the Feed"
          buttonLink={`/${RoutePath.FEED}`}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DAOPromo
          heading="Read the dev diaries"
          body="Dive into our dev journey and read about the nuts and bolts of delivery. Stay up-to-date with the latest news about DAOs through regular blog entries from harkl."
          buttonText="Read the blog"
          buttonLink="https://docs.boom.army/blog/"
          openBlank={true}
        />
      </Grid>
      <Grid item xs={12}>
        <Box py={4}>
          <Typography variant="h2" textAlign="center">
            We're actively looking for Investment Partners
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DAOPromo
          heading="Invest in the Future of DAOs on Solana"
          body="We're actively seeking visionary venture capitalists who believe in the transformative power of Solana. Partner with us and contribute to the development of the first native Social DAO infrastructure on Solana. Bring your experience, passion, and vision to this journey."
          buttonText="DM harkl on Twitter"
          buttonLink="https://twitter.com/harkl_"
          openBlank={true}
        />
      </Grid>
    </Grid>
  );
};
