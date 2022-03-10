import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box, Typography } from "@mui/material";
import { shortenAddress } from "../../utils/utils";
import { useAddChannelMutation } from "../../generated/graphql";
import { ThemeContext } from "../../contexts/theme";
import { styled } from "@mui/material/styles";

interface Props {
  nft: NFTData;
}

interface NFTData {
  id?: string;
  label: string;
  image: string;
  membersCount?: number;
  mintAuthority?: string | undefined;
  verified?: boolean;
  status?: string;
}

export const ChannelTile: React.FC<Props> = ({ nft }) => {
  const { theme } = useContext(ThemeContext);
  const [addChannelMutation, { data, loading, error }] = useAddChannelMutation({
    variables: {
      mintAuthority: "",
      name: "",
      family: "",
      description: "",
      image: "",
      status: "",
      channelParentId: "",
    },
  });

  const toggleChannel = async () => {};

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
      <BoxStyled
        sx={{
          backgroundColor: !nft.status ? theme.bluePrimary : theme.background,
          borderRadius: 1,
          display: "flex",
          border: !nft.status ? 0 : `1px solid ${theme.secondaryColor}`,
          cursor: "pointer",
          margin: 1,
          padding: 1,
        }}
        onClick={toggleChannel}
        key={nft.id}
      >
        <Box mr={1}>
          <Avatar sx={{ width: "60px", height: "60px" }} src={nft.image} />
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
                {nft.label}{" "}
                {nft.verified && (
                  <VerifiedIcon
                    fontSize="small"
                    sx={{ verticalAlign: "sub" }}
                  />
                )}
              </Typography>
            </Box>
            <Box>
              {!nft.status ? (
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
                {nft.membersCount ? nft.membersCount : 0} members
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                {nft.mintAuthority ? shortenAddress(nft.mintAuthority) : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BoxStyled>
    </>
  );
};
