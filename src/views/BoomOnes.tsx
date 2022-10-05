import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormGroup,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Face6Icon from "@mui/icons-material/Face6";
import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from '@mui/icons-material/Twitter';
import { ThemeContext } from "../contexts/theme";
import { useContext, useState } from "react";
import { AuctionLabel } from "../components/Auctions/AuctionLabel";
import { UserAvatar } from "../components/UserAvatar";
import { useSnackbar } from "../contexts/snackbar";

export const BoomOnes = () => {
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accordionPanel, setAccordionPanel] = useState("bids");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleShare = (text: string) => {
    navigator.clipboard.writeText(text)
    setAnchorEl(null);
    enqueueSnackbar("Copied to clipboard", { variant: "success" });
  };

  const bids = [1, 2, 3, 4];

  const open = Boolean(anchorEl);
  const id = open ? "share-popper" : undefined;
  return (
    <Grid
      container
      spacing={1}
      mt={2}
      px={2}
      sx={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h2" sx={{ lineHeight: 1.5 }}>
            Boom Heroes Hero #420
          </Typography>
          <Link>
            <IconButton
              aria-describedby={id}
              type="button"
              onClick={handleClick}
              sx={{
                backgroundColor: theme.accentColor,
                color: theme.primaryColor,
                "&:hover": {
                  backgroundColor: theme.accentColor,
                  opacity: 0.8,
                },
              }}
            >
              <ShareIcon />
            </IconButton>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement={"left-start"}
            >
              <Box
                sx={{
                  border: `1px solid ${theme.blue.light}`,
                  borderRadius: "8px",
                  p: 1,
                  mr: 1,
                  bgcolor: theme.background2,
                }}
              >
                <IconButton
                  type="button"
                  size="small"
                  onClick={() => handleShare("Boom is copying")}
                  sx={{
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <TwitterIcon sx={{ fontSize: 16, color: theme.accentColor }} />
                </IconButton>
                <IconButton
                  type="button"
                  size="small"
                  onClick={() => handleShare("Boom is copying")}
                  sx={{
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: 16, color: theme.accentColor, ml: 2 }} />
                </IconButton>
              </Box>
            </Popper>
          </Link>
        </Box>
        <Box display="flex" justifyContent={"space-between"} mt={2}>
          <Typography mt={2} variant="h4">
            <CollectionsIcon
              sx={{ color: theme.accentColor, verticalAlign: "middle" }}
            />{" "}
            BoomOnes Collection
          </Typography>
          <Stack mt={1} spacing={1} direction="row">
            <Chip
              label="harkL...a3W"
              variant="outlined"
              icon={
                <Face6Icon
                  sx={{ "&.MuiChip-icon": { color: theme.accentColor } }}
                />
              }
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ overflow: "hidden" }}>
          <img src={"/assets/420.png"} width="100%" alt="Boom Heroes #420" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          p={2}
          sx={{
            border: `1px solid ${theme.secondaryColor}`,
            backgroundColor: theme.background2,
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <AuctionLabel
              label="Leader"
              content={
                <Chip
                  label="@harkl"
                  variant="outlined"
                  icon={
                    <UserAvatar
                      // avatar={user?.avatar}
                      // isNFT={user?.data?.avatarMint}
                      sx={{ width: "23px", height: "23px", ml: "3px" }}
                    />
                  }
                />
              }
            />
            <AuctionLabel
              label="Time left"
              content={
                <Typography
                  pt={0.5}
                  variant="h3"
                  component={"p"}
                  display={"inline"}
                  ml={0.5}
                >
                  00:46
                </Typography>
              }
            />
            <AuctionLabel
              label="Leading bid"
              content={
                <Typography pt={0.5} variant="h3" component={"p"}>
                  💥345 ($0.34)
                </Typography>
              }
            />
          </Box>
          <FormGroup row={true} sx={{ width: "100%", pt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  id="bid"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label="Bid"
                  name="bid"
                  required
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.secondaryColor },
                  }}
                  InputProps={{
                    style: { color: theme.secondaryColor },
                  }}
                  value={345}
                  onChange={() => {}}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" size="large" sx={{ width: "100%" }}>
                  <Typography display={"inline"}>Place </Typography>
                  <Typography
                    display={"inline"}
                    sx={{ fontWeight: 600 }}
                    ml={0.5}
                  >
                    💥346 ($32.89)
                  </Typography>
                  <Typography display={"inline"} ml={0.5}>
                    Bid
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
          <Box mt={3} display="flex" justifyContent={"center"}>
            <Link
              href="https://dex.aldrin.com/swap?base=USDC&quote=BMA"
              target={"_blank"}
            >
              <Typography variant={"body2"}>
                Don't have any 💥BMA? Get some here.
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={1}>
          <Accordion
            expanded={accordionPanel === "bids"}
            onChange={() =>
              setAccordionPanel(accordionPanel !== "bids" ? "bids" : "")
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="bids-content"
              id="bids-header"
            >
              <Typography variant="h6">Bid History</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {bids.map((bid, index) => (
                  <ListItem
                    key={bid + index}
                    sx={{ borderTop: `1px solid ${theme.tertiaryColor2}` }}
                  >
                    <ListItemAvatar>
                      <UserAvatar
                      // avatar={user?.avatar}
                      // isNFT={user?.data?.avatarMint}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display={"flex"} justifyContent={"space-between"}>
                          <Typography display={"inline"}>@harkl</Typography>
                          <Box>
                            <Typography
                              display={"inline"}
                              color={theme.secondaryColor}
                            >
                              bid
                            </Typography>{" "}
                            <Typography display={"inline"}>💥345</Typography>
                          </Box>
                        </Box>
                      }
                      secondary="5 hours ago"
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={1}>
          <Accordion
            expanded={accordionPanel === "description"}
            onChange={() =>
              setAccordionPanel(
                accordionPanel !== "description" ? "description" : ""
              )
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description-content"
              id="description-header"
            >
              <Typography variant="h6">Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={1}>
          <Accordion
            expanded={accordionPanel === "details"}
            onChange={() =>
              setAccordionPanel(accordionPanel !== "details" ? "details" : "")
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="details-content"
              id="details-header"
            >
              <Typography variant="h6">Details</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ overflow: "hidden" }}>
              <ul>
                <li>
                  Mint address <strong>6aDpE ... KUw</strong>
                </li>
                <li>On-chain Collection 6XxjK ... zNr</li>
                <li>Token address 5XgEo ... 7Hp</li>
                <li>Owner 4n8hb ... HyC</li>
                <li>Creator Royalties 9.99%</li>
                <li>Transaction Fee 2%</li>
                <li>Listing/Bidding/Cancel Free</li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={1}>
          <Accordion
            expanded={accordionPanel === "metadata"}
            onChange={() =>
              setAccordionPanel(accordionPanel !== "metadata" ? "metadata" : "")
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="metadata-content"
              id="metadata-header"
            >
              <Typography variant="h6">Metadata</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ overflow: "hidden" }}>
              <pre>
                {JSON.stringify(
                  {
                    item: "one",
                    name: "Boom Hero #420",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing",
                  },
                  null,
                  2
                )}
              </pre>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      {/* <Grid item xs={12}>
        <Typography mt={2} variant={"h4"}>
          Promo box
        </Typography>
      </Grid> */}
    </Grid>
  );
};
