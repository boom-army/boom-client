import React from "react";
import { CustomResponse } from "../CustomResponse";
import { ShowTweet } from "../Tweet";
import { Loader } from "../Loader";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  position: "relative",
});

const SearchResultTweets = ({ tweets, loading }: any) => {
  if (loading) return <Loader />;

  if (tweets === undefined)
    return (
      <CustomResponse text="Use the search bar to find tags, people and meeps" />
    );

  return (
    <Wrapper>
      {tweets?.searchByTweet?.length ? (
        tweets.searchByTweet.map((tweet: any) => (
          <ShowTweet key={tweet.id} tweet={tweet} />
        ))
      ) : (
        <CustomResponse text="No Meeps found, try a different search" />
      )}
    </Wrapper>
  );
};

export default SearchResultTweets;
