import React, { useState, useContext, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
// import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import { Button, Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { color } from "@mui/system";
import { ThemeContext } from "../../contexts/theme";
import { darkTheme } from "../../styles/themes";

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
    border: "2px solid #4d97cb",
    borderRadius: 2,
    boxShadow: 24,
    outline: "none",
    p: 1,
    ".modalHeader": {
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      ".userImg": {
        img: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
      ".businessName": {
        fontWeight: "600",
        fontSize: "15px",
      },
      ".cancel-btn": {
        background: "transparent",
        border: "none",
      },
    },
    ".detailSection": {
      ".userImg": {
        img: {
          width: "105px",
          height: "105px",
          objectFit: "cover",
        },
      },
      ".veridied": {
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        svg: {
          background: "#35a600",
          borderRadius: "50%",
        },
      },
    },
    ".tags": {
      span: {
        color: "#949a9e",
        border: "1px solid #949a9e",
        padding: "2px 10px",
        display: "inline-block",
        fontSize: "13px",
        borderRadius: "25px",
        marginBottom: "10px",
      },
      ".btn-explore": {
        border: "1px solid #4d97cb",
        color: "#4d97cb",
        background: theme.background,
        padding: "4px 10px",
        borderRadius: "25px",
        cursor: "pointer",
      },
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
        background: "#4d97cb",
        borderColor: "#4d97cb",
      },
      ".btn-order": {
        background: "#f20769",
        borderColor: "#f20769",
      },
      ".btn-list": {
        background: "#35a600",
        borderColor: "#35a600",
      },
      ".btn-cancel": {
        background: "transparent",
        borderColor: "#4d97cb",
        color: "#4d97cb",
        textTransform: "capitalize",
        fontWeight: "500",
      },
      ".solBtn": {
        color: "#35a600",
        border: "1px solid #35a600",
        borderRadius: "25px",
        height: "45px",
      },
    },
    fieldset: {
      border: "1px solid #838689 !important",
      borderRadius: "5px",
      color: "#838689",
      height: "50px",
    },
    input: {
      padding: "0 10px",
      height: "45px",
      color: "#838689",
      marginBottom: "6px",
    },
    label: {
      color: "#838689 !important",
      lineHeight: "1em",
    },
    ".solText": {
      background: isDarkTheme ? "#0e1b25" : "#ffff",
      border: `2px solid  ${isDarkTheme ? "#374148" : "#838689"}`,
      width: "100%",
      fontWeight: "600",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <>
      {open ? (
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container>
                <Grid xs={12}>
                  <div className="modalHeader">
                    <span className="userImg">
                      <img src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png" />
                    </span>

                    <span className="businessName">
                      Solana Monkey Business #619
                    </span>
                    <button className="cancel-btn" onClick={handleClose}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="35px"
                        height="35px"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4d97cb"
                          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
                        />
                        <path
                          fill="#4d97cb"
                          d="M14.71 9.29a1 1 0 0 0-1.42 0L12 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"
                        />
                      </svg>
                    </button>
                  </div>
                </Grid>
                <Grid xs={4}>
                  <div className="detailSection">
                    <span className="userImg">
                      <img src="https://ec4meandtybfo3zpqizry3nes5efdzazxhucv6jrjvc5n4igcy.arweave.net/ILjCAaOeAldvL4IzHG2k_l0hR5Bm56Cr5MU1F1vEGFo?ext=png" />
                    </span>
                    <span className="veridied">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="20px"
                        height="20px"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.267.267 0 0 1 .02-.022z"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                </Grid>
                <Grid xs={8} className="tags">
                  <span>Type: Brown</span> <span>Eyes: None</span>{" "}
                  <span>Cloths: Jacket</span> <span>Ears: None</span>{" "}
                  <span>Mouth: None</span> <span>Hat: Fedora</span>
                  <button className="btn-explore">View in explore</button>
                </Grid>

                {defaultProfile.isdefault && (
                  <Grid xs={12} className="btn-section">
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
                    <span className="solText">3.4 SOL</span>
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
                    <span className="solText">3.4 SOL</span>
                    <Button className="btn btn-list">BUY NOW</Button>
                    <Button className="btn btn-cancel" onClick={handleClose}>
                      CANCEL
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default BasicModal;
