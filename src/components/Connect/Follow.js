import React from "react";
import CustomResponse from "../CustomResponse";
import Grid from "@mui/material/Grid";
import { ConsumerCard } from "./ConsumerCard";
import { Loader } from "../Loader";
import { USERS } from "../../queries/follow";
import { useQuery } from "@apollo/client";

export const Follow = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loader />;

  return (
    <>
      {data?.users?.length ? (
        <Grid
          container
          spacing={{ md: 2 }}
          columns={{ md: 4 }}
        >
          {data.users.map((consumer) => (
            <Grid item md={4} key={`grid-${consumer.id}`}>
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
