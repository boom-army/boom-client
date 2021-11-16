import React, { useEffect } from "react";
import CustomResponse from "../CustomResponse";
import Grid from "@mui/material/Grid";
import { ConsumerCard } from "./ConsumerCard";
import { Loader } from "../Loader";
import { USERS } from "../../queries/follow";
import { useQuery } from "@apollo/client";

export const Connect = () => {
  const { loading, error, data, fetchMore } = useQuery(USERS, {
    variables: {
      offset: 0,
    },
  });

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  if (loading) return <Loader />;

  return (
    <>
      {data?.users?.length ? (
        <Grid
          container
          spacing={{ md: 2 }}
          sx={{ paddingTop: 3, paddingLeft: 2, paddingRight: 2 }}
        >
          {data.users.map((consumer) => (
            <Grid item md={4}>
              <ConsumerCard key={`card-${consumer.id}`} consumer={consumer} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CustomResponse text="No other Creators to follow right now" />
      )}
    </>
  );
};
