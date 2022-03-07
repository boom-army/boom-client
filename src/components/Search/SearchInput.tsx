import React from "react";
import SearchResult from "./SearchResult";
import { useInput } from "../../hooks/useInput";
import {
  SEARCH_BY_TAG,
  SEARCH_BY_TWEET,
  SEARCH_BY_USER,
} from "../../queries/search";
import { displayError } from "../../utils";
import { useLazyQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")((props) => ({
  margin: "1rem 0",
  marginLeft: "1rem",
  input: {
    height: "40px",
    width: "70%",
    borderRadius: "30px",
    background: props.theme.tertiaryColor2,
    border: props.theme.tertiaryColor2,
    color: props.theme.secondaryColor,
    fontFamily: props.theme.font,
    fontSize: "1rem",
    paddingLeft: "1.2rem",
  },

  "@media screen and (max-width: 530px)": {
    input: {
      fontSize: "0.9rem",
    },
  },
}));

const SearchInput = () => {
  const term = useInput("");

  const [searchByTag, { data: searchTagData, loading: searchTagLoading }] =
    useLazyQuery(SEARCH_BY_TAG);

  const [
    searchByTweet,
    { data: searchTweetData, loading: searchTweetLoading },
  ] = useLazyQuery(SEARCH_BY_TWEET);

  const [searchByUser, { data: searchUserData, loading: searchUserLoading }] =
    useLazyQuery(SEARCH_BY_USER);

  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (!term.value) {
      return enqueueSnackbar("Enter something to search", { variant: "error" });
    }

    try {
      await searchByTag({ variables: { term: term.value } });
      await searchByTweet({ variables: { term: term.value } });
      await searchByUser({ variables: { term: term.value } });
    } catch (err) {
      displayError(err, enqueueSnackbar);
    }
    term.setValue("");
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            placeholder="Search by tags, tweets, people"
            type="text"
            value={term.value}
            onChange={term.onChange}
          />
        </form>
      </Wrapper>
      <SearchResult
        searchTagLoading={searchTagLoading}
        searchTweetLoading={searchTweetLoading}
        searchUserLoading={searchUserLoading}
        tags={searchTagData}
        users={searchUserData}
        tweets={searchTweetData}
      />
    </>
  );
};

export default SearchInput;
