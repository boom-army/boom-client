import React, { useState } from "react";
import SearchResultTweets from "./SearchResultTweets";
import SearchResultTags from "./SearchResultTags";
import SearchResultUsers from "./SearchResultUsers";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")((props) => ({
  ".tabs": {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: `2px solid ${props.theme.tertiaryColor}`,
  },

  span: {
    cursor: "pointer",
    marginBottom: "0.4rem",
  },

  "span.active": {
    borderBottom: `2px solid ${props.theme.accentColor}`,
    fontWeight: "500",
    color: props.theme.accentColor,
  },
}));

const SearchResult = ({
  searchTweetLoading,
  searchUserLoading,
  searchTagLoading,
  tags,
  users,
  tweets,
}) => {
  const [searchResultAction, setSearchResultAction] = useState("TWEETS");

  const changeToTweets = () => setSearchResultAction("TWEETS");
  const changeToTags = () => setSearchResultAction("TAGS");
  const changeToUsers = () => setSearchResultAction("USERS");

  return (
    <Wrapper>
      <div className="tabs">
        <span
          className={searchResultAction === "TWEETS" ? "active" : ""}
          onClick={changeToTweets}
        >
          Tweets
        </span>
        <span
          className={searchResultAction === "TAGS" ? "active" : ""}
          onClick={changeToTags}
        >
          Tags
        </span>
        <span
          className={searchResultAction === "USERS" ? "active" : ""}
          onClick={changeToUsers}
        >
          Users
        </span>
      </div>

      {searchResultAction === "TWEETS" && (
        <SearchResultTweets tweets={tweets} loading={searchTweetLoading} />
      )}
      {searchResultAction === "TAGS" && (
        <SearchResultTags tags={tags} loading={searchTagLoading} />
      )}
      {searchResultAction === "USERS" && (
        <SearchResultUsers users={users} loading={searchUserLoading} />
      )}
    </Wrapper>
  );
};

export default SearchResult;
