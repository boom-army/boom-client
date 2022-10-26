import React, { useContext } from "react";
import {
  BoomOnes
} from "../views";
import { User } from "../contexts/user";
import { ThemeContext } from "../contexts/theme";
import { Exact, Maybe, ProfileQuery } from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Grid, Paper } from "@mui/material";

interface GridProps {
  data: ProfileQuery | undefined;
  loading: boolean;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            handle?: Maybe<string> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
  setUser: (user: User | null) => User | void;
  user: User | null;
}

export const GridAuction: React.FC<GridProps> = ({
  data,
  loading,
  refetch,
  setUser,
  user,
}) => {
  const { theme } = useContext(ThemeContext);

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,

    "@media screen and (max-width: 530px)": {
      border: 0,
    },
  };
  return (
    <Grid container>
      <Paper
        component={Grid}
        item
        xs={12}
        sm={12}
        md={6}
        sx={middleColStyles}
        elevation={0}
      >
        <BoomOnes />
      </Paper>
      <Grid item md={6} display={{ xs: "none", sm: "none", md: "block" }}>
        
      </Grid>
    </Grid>
  );
};
