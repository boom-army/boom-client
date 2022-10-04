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
  Popper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import Face6Icon from "@mui/icons-material/Face6";
import { ThemeContext } from "../contexts/theme";
import { useContext, useState } from "react";
import { AuctionLabel } from "../components/Auctions/AuctionLabel";

export const BoomOnes = () => {
  const { theme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
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
                The content of the Popper.
              </Box>
            </Popper>
          </Link>
        </Box>
        <Box display="flex" justifyContent={"space-between"} mt={2}>
          <Typography mt={2} variant="h4">
            Family: BoomOnes Collection
          </Typography>
          <Stack mt={1} spacing={1} direction="row">
            <Chip
              label="Creator"
              variant="outlined"
              icon={
                <Face6Icon
                  sx={{ "&.MuiChip-icon": { color: theme.accentColor } }}
                />
              }
            />
            <Chip
              label="Series"
              variant="outlined"
              icon={
                <CollectionsIcon
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
            border: `1px solid ${theme.blue.light}`,
            backgroundColor: theme.blue.dark,
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
                    <Face6Icon
                      sx={{ "&.MuiChip-icon": { color: theme.accentColor } }}
                    />
                  }
                />
              }
            />
            <AuctionLabel
              label="Leading bid"
              content={<Typography variant="h3">💥345 ($0.34)</Typography>}
            />
            <Box>
              <AuctionLabel
                label="Time left"
                content={
                  <Typography variant="h3" display={"inline"} ml={0.5}>
                    00:46
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box pt={4} display="flex" justifyContent={"center"}>
            <FormGroup>
              <TextField
                autoFocus
                id="bid"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Bid"
                name="bid"
                required
                type="number"
                InputLabelProps={{
                  shrink: true,
                  style: { color: theme.secondaryColor },
                }}
                InputProps={{
                  style: { color: theme.secondaryColor },
                }}
                value={345}
                onChange={() => {}}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ minWidth: "50%", marginTop: "1em" }}
              >
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
            </FormGroup>
          </Box>
          <Box mt={2} display="flex" justifyContent={"center"}>
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
        <Box mt={2}>
          <Accordion expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description-content"
              id="description-header"
            >
              <Typography>Description</Typography>
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
        <Box>
          <Typography variant="h6">Bid History</Typography>
          <List></List>
        </Box>
        <Box>Metadata</Box>
        <Box>Price</Box>
      </Grid>
      <Grid item xs={12}>
        Promo box
      </Grid>
    </Grid>
  );
};
