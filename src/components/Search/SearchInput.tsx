import React, { useContext, useState } from "react";
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

const SearchInput = () => {
  const term = useInput("");
  const { theme } = useContext(ThemeContext);
  const [tabValue, setTabValue] = useState("TWEETS");

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
      switch (tabValue) {
        case "USERS":
          searchUser({ variables: { term: term.value } });
          break;
        case "TAGS":
          searchTweets({ variables: { term: term.value, type: "tags" } });
          break;
        default:
          searchTweets({ variables: { term: term.value, type: "text" } });
          break;
      }
    } catch (err) {
      displayError(err, enqueueSnackbar);
    }
  };
  console.log("-----------------boom", searchTweetData);

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
        data={searchUserData}
        loading={searchUserLoading || searchTweetLoading}
        setTabValue={setTabValue}
      />
    </>
  );
};

export default SearchInput;
