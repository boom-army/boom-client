import React from "react";
import { CustomResponse } from "../CustomResponse";
import { ShowTweet } from "../Tweet";
import { Loader } from "../Loader";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")({
  position: "relative",
});

const SearchResultTweets = ({ tweets, loading }) => {
  if (loading) return <Loader />;

  if (tweets === undefined)
    return (
      <CustomResponse text="Use the search bar to find tags, people and tweets" />
    );

  return (
    <Wrapper>
      {tweets?.searchByTweet?.length ? (
        tweets.searchByTweet.map((tweet) => (
          <ShowTweet key={tweet.id} tweet={tweet} />
        ))
      ) : (
        <CustomResponse text="No tweets found, try a different search" />
      )}
    </Wrapper>
  );
};

export default SearchResultTweets;
