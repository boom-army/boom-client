import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { Box, Tab } from "@mui/material";
import { Loader } from "../Loader";
import { Meeps } from "./Meeps";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "../../generated/graphql";
import { NFTGallery } from "./NFTGallery";
import { CustomResponse } from "../CustomResponse";

export const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState("1");

  let { handle } = useParams<string>();

  const { loading, data } = useProfileQuery({ variables: { handle } });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <Loader />;
  }
  if (!loading && !data) {
    return (
      <CustomResponse text="You're unable to view that profile currently" />
    );
  }

  return (
    <>
      <ProfileInfo profile={data && data.profile} />
      <Box sx={{ typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Profile tablist select"
            >
              <Tab sx={{ minWidth: 150 }} label="NFT Gallery" value="1" />
              <Tab label="Meeps" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {data && <NFTGallery publicAddress={data?.profile.publicAddress} />}
          </TabPanel>
          <TabPanel value="2">
            <Meeps data={data} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
