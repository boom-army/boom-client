import React, { useContext, useEffect, useState } from "react";
import { uniqBy } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box, Typography } from "@mui/material";
import { CustomResponse } from "../components/CustomResponse";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { ThemeContext } from "../contexts/theme";
import { shortenAddress } from "../utils/utils";
import { styled } from "@mui/material/styles";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useSnackbar } from "notistack";
import { displayError } from "../utils";

import data from "./data.json";
// const data: any[] = [];

interface channelData {
  id: String;
  avatar: String;
  label: String;
  membersCount: Number;
  mintAuthority: String;
  verified: Boolean;
  status: String;
}

export const ChannelView: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const wallet = anchorWallet;
  const { enqueueSnackbar } = useSnackbar();

  const [channelActive, toggleChannelActive] = useState(false);
  const [channels, setChannels] = useState<channelData[] | null>(null);

  useEffect(() => {
    console.log(connection);

    (async () => {
      try {
        const nftData = wallet?.publicKey
          ? await Metadata.findDataByOwner(
              connection,
              wallet?.publicKey.toString()
            )
          : [];

        const formatChannelData = nftData.map(async (meta, i) => {
          const metaDataFetch = await fetch(meta.data.uri).then((response) =>
            response.json()
          );
          console.log("n ", i, metaDataFetch);
          const name = metaDataFetch?.collection
            ? `${metaDataFetch?.collection?.family} - ${metaDataFetch?.collection?.name}`
            : metaDataFetch?.name;
          return { name, authority: meta.updateAuthority, image: metaDataFetch.image };
        });
        const channelData = await Promise.all(formatChannelData);
        const uniqueChannels = uniqBy(channelData, 'name');
        console.log("****", uniqueChannels);
      } catch (error) {
        console.log(error);
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [connection, wallet]);

  const toggleChannel = async () => {
    toggleChannelActive(!channelActive);
  };

  const BoxStyled = styled(Box)({
    h3: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "22px",
      padding: "0.2em 0 0.5em",
    },
    "& .MuiTypography-body2": {
      fontWeight: 300,
    },
    "@media screen and (max-width: 530px)": {
      margin: 0,
      marginTop: "1em",
    },
  });

  return (
    <>
      <Box m={1}>
        <Typography variant="h2" sx={{ fontSize: "18px" }}>
          Select channels to display
        </Typography>
      </Box>
      {data?.length ? (
        data.map((d) => (
          <BoxStyled
            sx={{
              backgroundColor: !d.status ? theme.bluePrimary : theme.background,
              borderRadius: 1,
              display: "flex",
              border: !d.status ? 0 : `1px solid ${theme.secondaryColor}`,
              cursor: "pointer",
              margin: 1,
              padding: 1,
            }}
            onClick={toggleChannel}
            key={d.id}
          >
            <Box mr={1}>
              <Avatar sx={{ width: 60, height: 60 }} src={d.avatar} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h3">
                    {d.label}{" "}
                    {d.verified && (
                      <VerifiedIcon
                        sx={{ fontSize: "18px", verticalAlign: "sub" }}
                      />
                    )}
                  </Typography>
                </Box>
                <Box>
                  {!d.status ? (
                    <Avatar
                      sx={{
                        width: 16,
                        height: 16,
                        background: theme.blueSecondary,
                      }}
                    >
                      <AddIcon sx={{ width: 16 }} />
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{ width: 16, height: 16, background: theme.success }}
                    >
                      <CheckIcon sx={{ width: 14 }} />
                    </Avatar>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="body2">
                    {d.membersCount} members
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {shortenAddress(d.mintAuthority)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </BoxStyled>
        ))
      ) : (
        <CustomResponse text="No NFTs in your wallet" />
      )}
    </>
  );
};
