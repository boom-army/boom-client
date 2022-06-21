import React from "react";
import SearchResultTweets from "./SearchResultTweets";
import SearchResultUsers from "./SearchResultUsers";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  SearchTweetsQuery,
  SearchUserQuery,
} from "../../generated/graphql";

interface SearchResultProps {
  loading: boolean;
  searchTweetData: SearchTweetsQuery | undefined;
  searchUserData: SearchUserQuery | undefined;
  tabValue: string;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResult = ({
  loading,
  searchTweetData,
  searchUserData,
  tabValue,
  setTabValue,
}: SearchResultProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  console.log('****', searchTweetData, searchUserData); 

  return (
    <>
      <Box sx={{ typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Search tablist select"
              variant="fullWidth"
            >
              <Tab sx={{ minWidth: 150 }} label="Tweets" value="TWEETS" />
              <Tab label="Tags" value="TAGS" />
              <Tab label="Users" value="USERS" />
            </TabList>
          </Box>
          <TabPanel value="TWEETS">
            <SearchResultTweets tweets={searchTweetData} loading={loading} />
          </TabPanel>
          <TabPanel value="TAGS">
            <SearchResultTweets tweets={searchTweetData} loading={loading} />
          </TabPanel>
          <TabPanel value="USERS">
            <SearchResultUsers users={searchUserData} loading={loading} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default SearchResult;
