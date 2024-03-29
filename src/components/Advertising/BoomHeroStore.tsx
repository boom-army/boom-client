import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as MuiLink,
  styled,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../generated/graphql";

import { HerofiedIcon } from "../Icons";
import { RoutePath } from "../../constants";

interface BoomHeroStoreProps {
  userData: User | null;
}

export const BoomHeroStore: React.FC<BoomHeroStoreProps> = ({ userData }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        margin: "1em",
        padding: "1em",
        border: `2px solid ${theme.blue.light}`,
        borderRadius: "5px",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100 }}
        image="assets/tensor-logo.jpeg"
        alt="Tensor Trade Logo"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", p: "0.5em 1em 0 1em" }}>
          <Typography component="div" variant="h4" pb={1}>
            Become a{" "}
            <Typography display={"inline"}>
              <HerofiedIcon
                sx={{
                  fill: theme.accentColor,
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "-2px",
                }}
              />
            </Typography>
            VIP on Boom
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            pb={1}
          >
            Flex your profile{" "}
            {userData?.handle ? (
              <Link
                to={`/${RoutePath.HANDLE_HASH}/${userData?.handle}`}
                style={{ color: theme.blue.lightest }}
              >
                by clicking your Boom Hero NFT{" "}
              </Link>
            ) : (
              "Boom Hero NFT"
            )}
            and making it your PFP
          </Typography>
          <Button
            component={MuiLink}
            size="small"
            variant="contained"
            href="https://www.tensor.trade/trade/boomheroes"
            target="_blank"
          >
            Buy BoomHeroes on Tensor
          </Button>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};
