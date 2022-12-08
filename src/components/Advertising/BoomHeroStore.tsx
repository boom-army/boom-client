import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import VerifiedIcon from '@mui/icons-material/Verified';

interface BoomHeroStoreProps {
  userData: User | null;
}

export const BoomHeroStore: React.FC<BoomHeroStoreProps> = ({ userData }) => {
  const { theme } = useContext(ThemeContext);

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
            Become a <Typography display={"inline"}><VerifiedIcon sx={{
              color: theme.accentColor,
              fontSize: "18px",
              verticalAlign: "-3px"
            }} /></Typography>VIP on Boom
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            pb={1}
          >
            Set your PFP{" "}
            {userData?.handle ? <Link
              to={`/${userData?.handle}`}
              style={{ color: theme.blue.lightest }}
            >
              by clicking your Boom Hero NFT{" "}
            </Link> : 'Boom Hero NFT'}
             to flex your profile
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
