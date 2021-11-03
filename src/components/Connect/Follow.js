import React from "react";
import { Loader } from "../Loader";
import { USERS } from "../../queries/follow";
import { useQuery } from "@apollo/client";

export const Follow = () => {
  const { loading, error, data } = useQuery(USERS);

  console.log(data);

  if (loading) return <Loader />;

  return (
    <>
      <h1>Boom</h1>
    </>
  );
};
