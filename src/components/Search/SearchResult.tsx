import React, { useState } from "react";
import SearchResultTweets from "./SearchResultTweets";
import SearchResultTags from "./SearchResultTags";
import SearchResultUsers from "./SearchResultUsers";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const SearchResult = ({
  searchTweetLoading,
  searchUserLoading,
  users,
  tweets,
}: any) => {
  const [searchResultAction, setSearchResultAction] = useState("TWEETS");

  const changeToTweets = () => setSearchResultAction("TWEETS");
  const changeToUsers = () => setSearchResultAction("USERS");
  const changeToTags = () => setSearchResultAction("TAGS");

  const [tabValue, setTabValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
    <Box sx={{ typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Profile tablist select"
              variant="fullWidth"
            >
              <Tab sx={{ minWidth: 150 }} label="Tweets" value="1" />
              <Tab label="Tags" value="2" />
              <Tab label="Users" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            1111111
          </TabPanel>
          <TabPanel value="2">
            222222222
          </TabPanel>
          <TabPanel value="3">
            33333333
          </TabPanel>
        </TabContext>
      </Box>
      {/* <div className="tabs">
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
        <SearchResultTweets tweets={tweets} loading={searchTweetLoading} />
      )}
      {searchResultAction === "USERS" && (
        <SearchResultUsers users={users} loading={searchUserLoading} />
      )} */}
    </>
  );
};

export default SearchResult;
