import React, { useState, useContext, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";

import Modal from "@mui/material/Modal";
import { Button, Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { ThemeContext } from "../../contexts/theme";
import { darkTheme } from "../../styles/themes";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const BasicModal = ({ isClicked }: any) => {
  const [open, setOpen] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme.primaryColor === darkTheme.primaryColor;
  const [defaultProfile, setDefaultProfile] = useState({
    isdefault: true,
    isList: false,
    isWithdraw: false,
    isBuyNow: false,
  });

  const handleClose = () => {
    setOpen(false);
    isClicked(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: theme.background,
    border: `2px solid ${theme.blueLight}`,
    borderRadius: 2,
    boxShadow: 24,
    outline: "none",
    p: 1,
    ".btn-explore": {
      border: `1px solid ${theme.blueLight}`,
      color: theme.blueLight,
      background: theme.background,
      padding: "4px 10px",
      borderRadius: "25px",
      cursor: "pointer",
    },
    ".btn-section": {
      marginTop: "20px",
      ".btn": {
        textTransform: "uppercase",
        color: "#fff",
        width: "100%",
        border: "1px solid",
        borderRadius: "5px",
        padding: "8px 0",
        margin: "5px 0",
        fontWeight: "600",
        cursor: "pointer",
      },
      ".btn-profilepic": {
        background: theme.blueLight,
        borderColor: theme.blueLight,
      },
      ".btn-order": {
        background: "#f20769",
        borderColor: "#f20769",
      },
      ".btn-list": {
        background: theme.greenLight,
        borderColor: theme.greenLight,
      },
      ".btn-cancel": {
        background: "transparent",
        borderColor: theme.blueLight,
        color: theme.blueLight,
        textTransform: "capitalize",
        fontWeight: "500",
      },
      ".solBtn": {
        color: theme.greenLight,
        border: `1px solid ${theme.greenLight}`,
        borderRadius: "25px",
        height: "45px",
      },
    },
    fieldset: {
      border: `1px solid ${theme.textColor} !important`,
      borderRadius: "5px",
      color: theme.textColor,
      height: "50px",
    },
    input: {
      padding: "0 10px",
      height: "45px",
      color: theme.textColor,
      marginBottom: "6px",
    },
    label: {
      color: `${theme.textColor} !important`,
      lineHeight: "1em",
    },
  };

  return (
    <>
      {open ? (
        <Box display="flex">
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container>
                <Grid xs={12}>
                  <Box
                    display="flex"
                    sx={{
                      gap: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Box display="inline-flex">
                      <Avatar src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png"></Avatar>
                    </Box>
                    <Typography fontWeight={600} fontSize={15}>
                      Solana Monkey Business #619
                    </Typography>
                    <HighlightOffIcon
                      color="info"
                      fontSize="large"
                      onClick={handleClose}
                    />
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box>
                    <Box
                      display="inline-flex"
                      sx={{
                        width: "105px",
                        height: "105px",
                        objectFit: "cover",
                      }}
                    >
                      <img src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png" />
                    </Box>
                    <Box
                      display="inline-flex"
                      sx={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        svg: {
                          background: theme.greenLight,
                          color: "#ffff",
                          borderRadius: "50%",
                        },
                      }}
                    >
                      <DoneIcon fontSize="small" />
                      Verified
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={8}>
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Type: Brown
                  </Box>{" "}
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Eyes: None
                  </Box>{" "}
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Cloths: Jacket
                  </Box>{" "}
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Ears: None
                  </Box>{" "}
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Mouth: None
                  </Box>{" "}
                  <Box
                    display="inline-flex"
                    sx={{
                      color: theme.tagColor,
                      border: `1px solid ${theme.tagColor}`,
                      padding: "2px 10px",
                      display: "inline-block",
                      fontSize: "13px",
                      borderRadius: "25px",
                      marginBottom: "10px",
                    }}
                  >
                    Hat: Fedora
                  </Box>{" "}
                  <button className="btn-explore">View in explore</button>
                </Grid>

                {defaultProfile.isdefault && (
                  <Grid xs={12} className="btn-section" mt={2}>
                    <Button className="btn btn-profilepic">
                      SET PROFILE PICTURE
                    </Button>
                    <Button className="btn btn-order">ORDER PRINT</Button>
                    <Button
                      className="btn btn-list"
                      onClick={() => {
                        setDefaultProfile({
                          isdefault: false,
                          isList: true,
                          isWithdraw: false,
                          isBuyNow: false,
                        });
                      }}
                    >
                      LIST FOR SALE
                    </Button>
                    <Button className="btn btn-cancel" onClick={handleClose}>
                      CANCEL
                    </Button>
                  </Grid>
                )}
                {defaultProfile.isList && (
                  <Grid container className="btn-section">
                    <Grid xs={9}>
                      <TextField id="outlined-basic" label="List Price" />
                    </Grid>
                    <Grid xs={3}>
                      <Button className="solBtn">SOL</Button>
                    </Grid>
                    <Button
                      className="btn btn-list"
                      onClick={() => {
                        setDefaultProfile({
                          isdefault: false,
                          isList: false,
                          isWithdraw: true,
                          isBuyNow: false,
                        });
                      }}
                    >
                      LIST NOW
                    </Button>
                    <Button className="btn btn-cancel" onClick={handleClose}>
                      Cancel Listing
                    </Button>
                  </Grid>
                )}

                {defaultProfile.isWithdraw && (
                  <Grid container className="btn-section">
                    <Box
                      display="flex"
                      sx={{
                        background: isDarkTheme ? "#0e1b25" : "#ffff",
                        border: `2px solid  ${theme.borderColor}`,
                        width: "100%",
                        fontWeight: "600",
                        height: "42px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      3.4 SOL
                    </Box>
                    <Button
                      className="btn btn-list"
                      onClick={() => {
                        setDefaultProfile({
                          isdefault: false,
                          isList: false,
                          isWithdraw: false,
                          isBuyNow: true,
                        });
                      }}
                    >
                      WITHDRAW LISTING
                    </Button>
                    <Button className="btn btn-cancel" onClick={handleClose}>
                      CANCEL
                    </Button>
                  </Grid>
                )}
                {defaultProfile.isBuyNow && (
                  <Grid container className="btn-section">
                    <Box
                      display="flex"
                      sx={{
                        background: isDarkTheme ? "#0e1b25" : "#ffff",
                        border: `2px solid  ${theme.borderColor}`,
                        width: "100%",
                        fontWeight: "600",
                        height: "42px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      3.4 SOL
                    </Box>
                    <Button className="btn btn-list">BUY NOW</Button>
                    <Button className="btn btn-cancel" onClick={handleClose}>
                      CANCEL
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Modal>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
export default BasicModal;
