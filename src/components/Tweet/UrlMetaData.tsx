import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetMetaQuery } from "../../generated/graphql";

interface Props {
  url: string;
}

export const UrlMetaData: React.FC<Props> = ({ url }: Props) => {

  const { data, loading, error } = useGetMetaQuery({
    variables: {
      url,
    }
  });

  console.log('2', data);

  return (
    <Box>{data?.getMeta?.title}</Box>
  );
};
