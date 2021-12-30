import React, { useContext } from "react";
import ProfileInfo from "./ProfileInfo";
import { Box, Tab } from "@mui/material";
import { Loader } from "../Loader";
import { Meeps } from "./Meeps";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { ThemeContext } from "../../contexts/theme";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "../../generated/graphql";
import { NFTGallery } from "./NFTGallery";

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
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Profile tablist select"
            >
              <Tab label="Meeps" value="1" />
              <Tab label="NFT Gallery" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Meeps data={data} />
          </TabPanel>
          <TabPanel value="2">
            <NFTGallery />
          </TabPanel>
        </TabContext>
      </Box>
    </Wrapper>
  );
};
