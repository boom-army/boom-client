import React from "react";
import SearchInput from "../components/Search/SearchInput";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  paddingBottom: "5rem",
});

export const Explore = () => {
  return (
    <Wrapper>
      <SearchInput />
    </Wrapper>
  );
};
