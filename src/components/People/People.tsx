import React, { useEffect, useContext } from "react";
import { CustomResponse } from "../CustomResponse";
import Grid from "@mui/material/Grid";
import { ConsumerCard } from "./ConsumerCard";
import { Loader } from "../Loader";
import { USERS } from "../../queries/follow";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/theme";
import { User } from "../../generated/graphql";

export const People = () => {
  const { theme } = useContext(ThemeContext);
  const { loading, data, fetchMore } = useQuery(USERS, {
    variables: {
      offset: 0,
    },
  });

  const StyledGrid = styled(Grid)({
    "@media (max-width: 600px)": {
      borderBottom: `1px solid ${theme.secondaryColor}`,
      marginBottom: "1em",
    },
  });

  useEffect(() => {
    //  TODO: This needs to be consolidated into a util
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        fetchMore({
          variables: {
            offset: data?.users?.length,
          },
        });
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, fetchMore]);

  if (loading) return <Loader />;

  return (
    <>
      {data?.users?.length ? (
        <Grid
          container
          spacing={{ md: 2 }}
          sx={{ paddingTop: 3, paddingLeft: 2, paddingRight: 2 }}
        >
          {data.users.map((profile: User) => (
            <StyledGrid item xs={12} md={4} key={`grid-${profile.id}`}>
              <ConsumerCard key={`card-${profile.id}`} profile={profile} />
            </StyledGrid>
          ))}
        </Grid>
      ) : (
        <CustomResponse text="No other Creators to follow right now" />
      )}
      {data?.users?.length && loading && (
        <Box sx={{ marginTop: "1rem" }}>
          <Loader />
        </Box>
      )}
    </>
  );
};
