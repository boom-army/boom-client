import React from "react";
import { Loader } from "../Loader";
import { PROFILE } from "../../queries/profile";
import { useQuery } from "@apollo/client";

export const Follow = () => {
  const { loading, error, data } = useQuery(PROFILE);

  if (loading) return <Loader />;

  return (
    <>
      <h1>Boom</h1>
    </>
  );
};
