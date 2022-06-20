import React, { useContext } from "react";
import SearchResult from "./SearchResult";
import { useInput } from "../../hooks/useInput";
import { displayError } from "../../utils";
import { useSnackbar } from "../../contexts/snackbar";
import SearchIcon from "@mui/icons-material/Search";
import {
  useSearchTweetsLazyQuery,
  useSearchUserLazyQuery,
} from "../../generated/graphql";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ThemeContext } from "../../contexts/theme";

const SearchInput = () => {
  const term = useInput("");
  const { theme } = useContext(ThemeContext);

  const [searchTweets, { data: searchTweetData, loading: searchTweetLoading }] =
    useSearchTweetsLazyQuery();

  const [searchUser, { data: searchUserData, loading: searchUserLoading }] =
    useSearchUserLazyQuery();

  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    
    if (!term.value) {
      return enqueueSnackbar("Enter something to search", { variant: "error" });
    }

    try {
      searchTweets({ variables: { term: term.value, type: "tags" } });
      searchTweets({ variables: { term: term.value, type: "text" } });
      searchUser({ variables: { term: term.value } });
    } catch (err) {
      displayError(err, enqueueSnackbar);
    }
  };
  console.log('-----------------boom', searchTweetData);

  return (
    <>
      <Container>
        <Box component="form" noValidate sx={{ mt: 3, mb: 3 }} onSubmit={handleSearch}>
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
        searchTweetLoading={searchTweetLoading}
        searchUserLoading={searchUserLoading}
        users={searchUserData}
        tweets={searchTweetData}
      />
    </>
  );
};

export default SearchInput;
