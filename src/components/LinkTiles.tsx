import React, { useContext } from "react";
import {
  Card,
  Grid,
  IconButton,
  Typography,
  CardContent,
  styled,
  Link,
} from "@mui/material";
import Language from "@mui/icons-material/Language";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SavingsIcon from "@mui/icons-material/Savings";
import { ThemeContext } from "../contexts/theme";
import { RoutePath } from "../constants";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 3,
  borderColor: theme.tertiaryColor2,
  borderStyle: "solid",
  borderWidth: 1,
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    borderColor: theme.accentColor,
    h6: {
      color: theme.accentColor,
    },
    "& svg": {
      color: theme.accentColor,
    },
  },
}));

export const LinkTilesGrid = () => {
  const { theme } = useContext(ThemeContext);

  const tiles = [
    { icon: <Language />, label: "Feed", link: `/${RoutePath.FEED}` },
    { icon: <LockPersonIcon />, label: "NFT DAOS", link: `/${RoutePath.DAO}` },
    { icon: <NewspaperIcon />, label: "News", link: `/${RoutePath.NEWS}` },
    { icon: <SavingsIcon />, label: "Tip Leaderboard", link: `/${RoutePath.LEADERBOARD}` },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {tiles.map((tile, index) => (
        <Grid key={index} item xs={6} sm={3}>
          <Link href={tile.link} sx={{ textDecoration: "none" }}>
            <StyledCard>
              <CardContent>
                <IconButton>{tile.icon}</IconButton>
                <Typography
                  variant="subtitle1"
                  color={theme.secondaryColor}
                  sx={{
                    fontWeight: 300,
                  }}
                >
                  {tile.label}
                </Typography>
              </CardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
