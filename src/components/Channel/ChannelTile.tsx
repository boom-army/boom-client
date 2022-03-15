import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box, Typography } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";
import { displayError } from "../../utils";
import { shortenAddress } from "../../utils/utils";
import { styled } from "@mui/material/styles";
import { ChannelsQuery, useAddChannelMutation } from "../../generated/graphql";
import { useSnackbar } from "notistack";

interface Props {
  nft: ChannelsQuery["channels"][0];
}

export const ChannelTile: React.FC<Props> = ({ nft }) => {
  const { theme } = useContext(ThemeContext);
  const [addChannelMutation, { data, loading }] = useAddChannelMutation();
  const { enqueueSnackbar } = useSnackbar();

  const toggleChannel = async () => {
    console.log("boom");

    try {
      await addChannelMutation({
        variables: {
          mintAuthority: nft.mintAuthority,
          name: nft.name,
          family: nft.family,
          description: nft.description,
          image: nft.image,
          status: "",
          channelParentId: "",
        },
      });
    } catch (error) {
      displayError(error, enqueueSnackbar);
    }
    console.log(data);
  };

  const StyledCircularProgress = styled(CircularProgress)((props: any) => ({
    color: props.theme.accentColor,
  }));

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
          <Avatar sx={{ width: "60px", height: "60px" }} src={nft.image as string} />
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
                {`${nft.family} - ${nft.name}`}{" "}
                {nft.status === "verified" && (
                  <VerifiedIcon
                    fontSize="small"
                    sx={{ verticalAlign: "sub" }}
                  />
                )}
              </Typography>
            </Box>
            <Box>
              {loading && <StyledCircularProgress size={16} />}
              {!loading && !nft.status ? (
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
              {/* <Typography variant="body2">
                {nft.membersCount ? nft.membersCount : 0} members
              </Typography> */}
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
