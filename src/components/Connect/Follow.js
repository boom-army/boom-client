import React from "react";
import { Loader } from "../Loader";
import { USERS } from "../../queries/follow";
import { useQuery } from "@apollo/client";
import { ConsumerCard } from "./ConsumerCard";
import CustomResponse from "../CustomResponse";

export const Follow = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loader />;

  return (
    <>
      {data?.users?.length ? (
        data.users.map((consumer) => (
          <ConsumerCard key={consumer.id} consumer={consumer} />
        ))
      ) : (
        <CustomResponse text="No other Creators to follow right now" />
      )}
    </>
  );
};
