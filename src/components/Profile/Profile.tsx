import React, { useContext } from "react";
import ProfileInfo from "./ProfileInfo";
import { Box, Tab } from "@mui/material";
import { Loader } from "../Loader";
import { ShowTweet } from "../Tweet";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { ThemeContext } from "../../contexts/theme";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { useProfileQuery, Tweet } from "../../generated/graphql";

export const Profile: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [tabValue, setTabValue] = React.useState("1");
  let { handle } = useParams<string>();
  handle = handle ? handle : "";

  const { loading, data } = useProfileQuery({
    variables: { handle },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  if (loading) return <Loader />;

  const Wrapper = styled("div")`
    padding-bottom: 5rem;

    .profile-top {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;

      span.tweetsCount {
        margin-top: 0.1rem;
        color: ${theme.secondaryColor};
        font-size: 0.9rem;
      }
    }
  `;

  return (
    <Wrapper>
      <ProfileInfo profile={data && data.profile} />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
      {data && data.profile && data.profile.tweets && data.profile.tweets.length
        ? data.profile.tweets.map((tweet) => (
            <ShowTweet
              key={tweet.id}
              tweet={tweet as Tweet}
              offset={10}
              parentTweetId=""
            />
          ))
        : null}
    </Wrapper>
  );
};
