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
  id?: string;
  label: string;
  avatar: string;
  membersCount?: number;
  mintAuthority?: string | undefined;
  verified?: boolean;
  status?: string;
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
          const label = metaDataFetch?.collection
            ? `${metaDataFetch?.collection?.family} - ${metaDataFetch?.collection?.name}`
            : metaDataFetch?.name;            
          return {
            id: meta.mint,
            label,
            avatar: metaDataFetch.image,
            mintAuthority: meta.updateAuthority
          };
        });
        const channelData = await Promise.all(formatChannelData);
        const uniqueChannels = uniqBy(channelData, "label");
        console.log(uniqueChannels);
        setChannels(uniqueChannels);
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
    ".status": {
      width: "14px",
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
      {channels?.length ? (
        channels.map((d) => (
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
              <Avatar sx={{ width: "60px", height: "60px" }} src={d.avatar} />
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
                      <VerifiedIcon fontSize="small" sx={{ verticalAlign: "sub" }} />
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
                      <AddIcon className="status" />
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{ width: 16, height: 16, background: theme.success }}
                    >
                      <CheckIcon className="status" />
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
                    {d.membersCount ? d.membersCount : 0} members
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {d.mintAuthority ? shortenAddress(d.mintAuthority) : ''}
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
