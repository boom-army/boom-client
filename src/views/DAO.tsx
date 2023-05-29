import React from "react";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
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
import { headerOffset } from "../utils/boom-web3/constants";

export const DAOView = () => {
  const handleSignUp = () => {};
  const theme = useTheme();

  return (
    <Grid container justifyContent="center" mt={2}>
      <Grid item xs={12} md={9}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h1" mb={2}>
            Have we really been doing DAO's right on Solana?
          </Typography>
          <img src="/assets/connect.png" alt="Are we connected?" width="80%" />
          <Stack
            direction="column"
            spacing={2}
            mt={2}
            width="100%"
            sx={{ p: 2, my: 2, border: `1px solid ${theme.accentColor}` }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <HelpOutlineIcon
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  Are you tired of using extra plugins and complicated stuff to
                  make your DAO (Decentralized Autonomous Organization) work?
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HelpOutlineIcon
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  Or joining chat groups that say they're DAOs but are actually
                  controlled by just a few people with opaque governance?
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineOutlined
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  Boom is creating the best solution ever for easy and
                  decentralized governance and working together as a community.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SentimentVerySatisfiedIcon
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  You won't need to shout at your friends to get their contact
                  details on Telegram anymore.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SentimentVerySatisfiedIcon
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  You won't have to struggle to make your DAO work with your
                  NFTs.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineOutlined
                    sx={{ color: theme.accentColor }}
                  />
                </ListItemIcon>
                <ListItemText>
                  Boom is here to make everything easy for you and to bring the
                  integrity back to DAOs.
                </ListItemText>
              </ListItem>
            </List>
          </Stack>
        </Box>
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
