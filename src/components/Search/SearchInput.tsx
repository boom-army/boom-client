import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchResult from "./SearchResult";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { displayError } from "../../utils";
import { useInput } from "../../hooks/useInput";
import {
  useSearchTweetsLazyQuery,
  useSearchUserLazyQuery,
} from "../../generated/graphql";
import { useSnackbar } from "../../contexts/snackbar";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const { theme } = useContext(ThemeContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(
    searchParams.get("type") || "TWEETS"
  );
  const term = useInput(searchParams.get("term") || "");

  const [searchTweets, { data: searchTweetData, loading: searchTweetLoading, fetchMore: fetchMoreTweets }] =
    useSearchTweetsLazyQuery({ fetchPolicy: "network-only" });

  const [searchUser, { data: searchUserData, loading: searchUserLoading, fetchMore: fetchMoreUsers }] =
    useSearchUserLazyQuery({ fetchPolicy: "network-only" });

  const { enqueueSnackbar } = useSnackbar();

  const runQuery = () => {
    try {
      switch (tabValue) {
        case "USERS":
          setSearchParams({ type: "USERS", term: term.value });
          searchUser({ variables: { term: term.value } });
          break;
        case "TAGS":
          const value =
            term.value.substring(0, 1) === "#" ? term.value : `#${term.value}`;
          setSearchParams({ type: "TAGS", term: value });
          searchTweets({ variables: { term: value, type: "tags" } });
          break;
        default:
          setSearchParams({ type: "TWEETS", term: term.value });
          searchTweets({ variables: { term: term.value, type: "text" } });
          break;
      }
    } catch (err) {
      displayError(err, enqueueSnackbar);
    }
  };

  useEffect(() => {
    if (searchParams.has("term")) {
      runQuery();
    }
  }, [tabValue]);

  const handleSearch = async (e: any | null) => {
    if (e) e.preventDefault();

    if (!term.value) {
      return enqueueSnackbar("Enter something to search", { variant: "error" });
    }

    runQuery();
  };

  return (
    <>
      <Container>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3, mb: 3 }}
          onSubmit={handleSearch}
        >
          <TextField
            name="search"
            fullWidth
            autoFocus
            id="search"
            label="Search"
            InputLabelProps={{
              shrink: true,
              style: { color: theme.secondaryColor },
            }}
            InputProps={{
              style: { color: theme.secondaryColor },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={term.value}
            onChange={term.onChange}
          />
        </Box>
      </Container>
      <SearchResult
        tabValue={tabValue}
        searchTweetData={searchTweetData}
        searchUserData={searchUserData}
        fetchMoreTweets={fetchMoreTweets}
        fetchMoreUsers={fetchMoreUsers}
        loading={searchUserLoading || searchTweetLoading}
        setTabValue={setTabValue}
      />
    </>
  );
};

export default SearchInput;
