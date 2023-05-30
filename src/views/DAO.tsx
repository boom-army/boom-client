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
          <Box sx={{ height: "100%" }}>
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
                    Power users splintering into Telegram. Need we say more?
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
      <Grid item xs={12} md={9}>
        <Box>
          <Button variant="contained" onClick={handleSignUp}>
            Join the Waiting List
          </Button>
        </Box>
        <Box>
          <Typography>
            Buy a Boom Hero and be part of the alpha crew with full access and
            participation in the build
          </Typography>
        </Box>
        <Box>
          <Typography>Shit post on Meeper while you wait</Typography>
        </Box>
        <Box>
          <Typography>Read up on how our dev is progressing</Typography>
        </Box>
        <Box>
          <Typography>
            Get some $BMA and beat the supply-demand imbalance
          </Typography>
        </Box>
        <Box>
          <Typography>
            VCs get in touch to be part of the funding round
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
