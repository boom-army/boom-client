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
  Popper,
  // List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Face6Icon from "@mui/icons-material/Face6";
import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { useContext, useMemo, useState } from "react";
import { AuctionLabel } from "../components/Auctions/AuctionLabel";
import { UserAvatar } from "../components/UserAvatar";
import { useSnackbar } from "../contexts/snackbar";
import { PublicKey } from "@solana/web3.js";
import {
  CandyShop,
  fetchAuctionsByShopAddress,
  ExplorerLinkBase,
} from "@liqnft/candy-shop-sdk";
import {
  AuctionStatus,
  AuctionBid,
  Blockchain,
} from "@liqnft/candy-shop-types";
import { shortenAddress } from "../utils/utils";
import { Countdown } from "../components/Auctions/CandyCountdown";
import { Price } from "../components/Auctions/CandyPrice";
import { AuctionActivity } from "../components/Auctions/CandyAuctionActivity";
import { ExplorerLink } from "../components/Auctions/CandyExplorer";
import { NftAttributes } from "../components/Auctions/CandyAttributes";
import BN from "bn.js";
import { Loader } from "../components/Loader";
import { useProfileByPubKeyQuery } from "../generated/graphql";
import { Refresh } from "../components/Auctions/RefreshAuction";

function removeDuplicate<T>(
  oldList: T[] = [],
  addList: T[],
  key: keyof T
): T[] {
  const duplicateList = [...oldList, ...addList];
  const newList: T[] = [];
  const memo: any = {};
  for (const item of duplicateList) {
    if (memo[item[key]]) break;
    newList.push(item);
    memo[item[key]] = true;
  }
  return newList;
}

const ORDER_FETCH_LIMIT = 10;
const BMA_TICK_SIZE = 1000000000;
const DEFAULT_LIST_AUCTION_STATUS = [
  AuctionStatus.CREATED,
  AuctionStatus.STARTED,
  AuctionStatus.EXPIRED,
  AuctionStatus.COMPLETE,
];

// interface ListBase<T> {
//   success: boolean;
//   msg: undefined | string;
//   result: T[];
//   totalCount: number;
//   count: number;
//   offset: number;
// }

interface Auction {
  auctionAddress: string;
  tokenAccount: string;
  candyShopAddress: string;
  tokenMint: string;
  sellerAddress: string;
  startingBid: string;
  startTime: string;
  biddingPeriod: string;
  highestBid: string;
  tickSize: string;
  buyNowPrice: string | null;
  status: AuctionStatus;
  highestBidBuyer?: string;
  highestBidPrice?: string;
  userBid?: boolean;
  totalBid?: number;
  nftUri?: string;
  name: string;
  symbol: string;
  description?: string;
  sellerFeeBasisPoint: number;
  image?: string;
  animationUrl?: string;
  attributes?: NftAttribute[];
  externalUri?: string;
  properties?: NftProperties;
}

interface NftCreator {
  address: string;
  share: number;
  verified?: number;
}
interface NftFiles {
  uri: string;
  type: string;
}

interface NftProperties {
  files: NftFiles[];
  category: string;
  creators: NftCreator[];
}
interface NftAttribute {
  value: string;
  trait_type: string;
}

export const BoomOnes = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accordionPanel, setAccordionPanel] = useState("bids");
  const [auctionNFT, setAuctionNFT] = useState<Auction>();
  const [candyShop, setCandyShop] = useState<CandyShop>();
  const [metadata, setMetadata] = useState<string>();
  const [bidding, setBidding] = useState(false);
  const [mustWithdraw, setMustWithdraw] = useState(false);
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [bidProfile, setBidProfile] = useState<string>("");
  const [bid, setBid] = useState<number>(1);

  const wallet = useAnchorWallet();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { data } = useProfileByPubKeyQuery({
    variables: {
      publicAddress: bidProfile,
    },
  });

  const fetchAuction = async (
    CandyShopInstance: CandyShop,
    walletKey: string
  ) => {
    try {
      const auction = await fetchAuctionsByShopAddress(
        CandyShopInstance.candyShopAddress,
        {
          offset: 0,
          limit: ORDER_FETCH_LIMIT,
          status: DEFAULT_LIST_AUCTION_STATUS,
          walletAddress: walletKey,
        }
      );
      setAuctionNFT(auction.result[0]);
      if (auction.result[0].highestBid) {
        setBid(
          (Number(auction.result[0]?.highestBidPrice) +
            Number(auction.result[0]?.tickSize)) /
            BMA_TICK_SIZE
        );
      }
      if (auction.result[0].highestBidBuyer) {
        setBidProfile(auction.result[0].highestBidBuyer);
      }
    } catch (error) {
      console.info(`fetch candy machine info, error= `, error);
    }
  };

  useMemo(() => {
    const CandyShopInstance = new CandyShop({
      candyShopCreatorAddress: new PublicKey(
        "G1p59D3CScwE9r31RNFsGm3q5xZapt6EXHmtHV7Jq5AS"
      ),
      treasuryMint: new PublicKey(
        "boomh1LQnwDnHtKxWTFgxcbdRjPypRSjdwxkAEJkFSH"
      ),
      candyShopProgramId: new PublicKey(
        "csbMUULiQfGjT8ezT16EoEBaiarS6VWRevTw1JMydrS"
      ),
      env: Blockchain.SolMainnetBeta,
      settings: {
        currencySymbol: "BMA",
        currencyDecimals: 9,
      },
    });
    setCandyShop(CandyShopInstance);
    const walletKey = wallet?.publicKey.toBase58() || "null";
    fetchAuction(CandyShopInstance, walletKey);
  }, []);

  useMemo(() => {
    auctionNFT?.nftUri &&
      fetch(auctionNFT?.nftUri)
        .then((res) => res.json())
        .then((data) => {
          setMetadata(JSON.stringify(data, null, 2));
        })
        .catch((error) => console.log(error));
  }, [auctionNFT]);

  const handleShare = (text: string, url?: boolean) => {
    if (url) {
      window.open(text, "_blank");
    } else {
      navigator.clipboard.writeText(text);
    }
    setAnchorEl(null);
    enqueueSnackbar("Copied to clipboard", { variant: "success" });
  };

  const open = Boolean(anchorEl);
  const id = open ? "share-popper" : undefined;

  const placeBid = (price: number) => {
    if (!wallet || !candyShop || !auctionNFT) {
      enqueueSnackbar("Auction not loaded", { variant: "info" });
      return;
    }
    setBidding(true);

    const minBidPrice =
      (auctionNFT?.highestBidPrice && auctionNFT?.highestBidPrice
        ? Number(auctionNFT?.highestBidPrice) + Number(auctionNFT?.tickSize)
        : Number(auctionNFT?.startingBid)) / candyShop?.baseUnitsPerCurrency;

    if (price < minBidPrice) {
      return enqueueSnackbar(`You must bid at least ${minBidPrice}`, {
        variant: "info",
      });
    }

    candyShop
      .bidAuction({
        wallet,
        tokenMint: new PublicKey(auctionNFT?.tokenMint),
        tokenAccount: new PublicKey(auctionNFT?.tokenAccount),
        bidPrice: new BN(price * candyShop.baseUnitsPerCurrency),
      })
      .then((txId: string) => {
        enqueueSnackbar(`Successful bid: ${txId}`, { variant: "success" });
        setMustWithdraw(false);
        setBids((list) => {
          const bid = {
            auctionAddress: auctionNFT?.auctionAddress,
            bidAddress: "null",
            buyerAddress: wallet.publicKey.toBase58(),
            price: String(price * candyShop.baseUnitsPerCurrency),
            status: 0,
          };
          list[0].status = 1;
          const updateList = [bid, ...list];
          return updateList;
        });
        setAuctionNFT((auction: any) => {
          return {
            ...auction,
            highestBidPrice: String(price * candyShop.baseUnitsPerCurrency),
            highestBidBuyer: wallet?.publicKey?.toBase58(),
          };
        });
        setBid(price + 1);
        setBidProfile(wallet?.publicKey?.toBase58());
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message, { variant: "error" });
        console.log(`bidAuction failed, error=`, err);
        setBidding(false);
      })
      .finally(() => {
        setBidding(false);
      });
  };

  const withdraw = async (bidIndex?: number) => {
    (async () => {
      try {
        if (!wallet || !candyShop || !auctionNFT) {
          enqueueSnackbar("Auction not loaded", { variant: "info" });
          return;
        }
        setBidding(true);
        const txId = await candyShop.withdrawAuctionBid({
          wallet,
          tokenMint: new PublicKey(auctionNFT?.tokenMint),
          tokenAccount: new PublicKey(auctionNFT?.tokenAccount),
        });
        //@ts-ignore
        bidIndex &&
          setBids((list) => {
            list[bidIndex].status = 1;
            return list;
          });
        enqueueSnackbar(`Successful bid withdrawal: ${txId}`, {
          variant: "success",
        });
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
        console.log(`withdrawAuctionBid failed, error=`, error);
        setBidding(false);
        setMustWithdraw(false);
      } finally {
        setBidding(false);
      }
    })();
  };

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
            {auctionNFT?.name}
          </Typography>
          <Link>
            <IconButton
              aria-describedby={id}
              type="button"
              onClick={handleClick}
              sx={{
                backgroundColor: theme.accentColor,
                color: theme.palette.primary,
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
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
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
                  onClick={() =>
                    handleShare(
                      `https://twitter.com/intent/tweet?url=${
                        window.location.href
                      }&text=Checkout%20Boom%20social%20auctions%20on%20Solana%0a%0a${
                        auctionNFT && auctionNFT.highestBidPrice
                          ? "Current%20bid%20is%20" +
                            (auctionNFT &&
                              Number(auctionNFT?.highestBidPrice) /
                                BMA_TICK_SIZE) +
                            "%20$BMA%0a%0a"
                          : null
                      }&via=boom_army_&hashtags=BoomOnes`,
                      true
                    )
                  }
                  sx={{
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <TwitterIcon
                    sx={{ fontSize: 16, color: theme.accentColor }}
                  />
                </IconButton>
                <IconButton
                  type="button"
                  size="small"
                  onClick={() => handleShare(window.location.href)}
                  sx={{
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <ContentCopyIcon
                    sx={{ fontSize: 16, color: theme.accentColor, ml: 2 }}
                  />
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
            {auctionNFT?.symbol}
          </Typography>
          <Stack mt={1} spacing={1} direction="row">
            <Chip
              label={auctionNFT && shortenAddress(auctionNFT?.sellerAddress)}
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
          <img src={auctionNFT?.image} width="100%" alt="Boom Heroes #420" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {auctionNFT?.status === AuctionStatus.STARTED && (
          <Refresh
            fetchAuction={() =>
              fetchAuction(
                candyShop as CandyShop,
                wallet?.publicKey.toBase58() as string
              )
            }
          />
        )}
        <Box
          p={2}
          sx={{
            border: `1px solid ${theme.palette.secondary}`,
            backgroundColor: theme.background2,
          }}
        >
          <Box
            display={{ xs: "block", sm: "flex" }}
            justifyContent={{ sm: "space-between" }}
          >
            <AuctionLabel
              label="Leader"
              content={
                auctionNFT?.highestBidBuyer && data?.profileByPubKey ? (
                  <Chip
                    label={`@${data?.profileByPubKey?.handle}`}
                    variant="outlined"
                    icon={
                      <UserAvatar
                        avatar={data?.profileByPubKey?.avatar}
                        handle={data?.profileByPubKey?.handle}
                        isNFT={data?.profileByPubKey?.data?.avatarMint}
                        sx={{ width: "23px", height: "23px", ml: "3px" }}
                      />
                    }
                  />
                ) : (
                  <Typography
                    pt={0.5}
                    variant="h3"
                    component={"p"}
                    display={"inline"}
                    ml={0.5}
                  >
                    N/A
                  </Typography>
                )
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
                  {auctionNFT && (
                    <Countdown
                      start={Number(auctionNFT.startTime)}
                      end={
                        Number(auctionNFT.startTime) +
                        Number(auctionNFT.biddingPeriod)
                      }
                      status={auctionNFT.status}
                    />
                  )}
                </Typography>
              }
            />
            <AuctionLabel
              label="Leading bid"
              content={
                <Typography pt={0.5} variant="h3" component={"p"}>
                  {candyShop && auctionNFT && (
                    <Price
                      value={auctionNFT.highestBidPrice}
                      candyShop={candyShop}
                    />
                  )}
                </Typography>
              }
            />
          </Box>
          <FormGroup row={true} sx={{ width: "100%", pt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                    style: { color: theme.palette.secondary },
                  }}
                  InputProps={{
                    style: { color: theme.palette.secondary },
                  }}
                  value={bid}
                  onChange={(e) => {
                    setBid(Number(e.target.value));
                  }}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "100%",
                    backgroundColor: bidding
                      ? theme.blue.dark
                      : theme.accentColor,
                    "&.Mui-disabled": {
                      backgroundColor: theme.blue.light,
                      color: theme.palette.primary,
                    },
                  }}
                  disabled={
                    auctionNFT?.status === AuctionStatus.COMPLETE ||
                    auctionNFT?.status === AuctionStatus.EXPIRED ||
                    auctionNFT?.status === AuctionStatus.CANCELLED ||
                    !wallet?.publicKey ||
                    mustWithdraw
                  }
                  onClick={() => placeBid(bid)}
                >
                  {mustWithdraw ? (
                    <Typography>Withdraw to raise bid</Typography>
                  ) : bidding ? (
                    <Loader size={24} />
                  ) : (
                    <>
                      <Typography display={"inline"}>Bid at</Typography>
                      <Typography
                        display={"inline"}
                        sx={{ fontWeight: 600 }}
                        ml={0.5}
                      >
                        💥
                        {bid}
                      </Typography>
                      <Typography display={"inline"} ml={0.5}>
                        BMA
                      </Typography>
                    </>
                  )}
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
                Don't have any 💥BMA to bid? Get some here.
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
            <AccordionDetails
              sx={{ p: 0, maxHeight: "300px", overflow: "scroll" }}
            >
              {candyShop && auctionNFT && (
                <AuctionActivity
                  candyShop={candyShop}
                  auctionAddress={auctionNFT?.auctionAddress}
                  orderBy={{ order: "desc", column: "price" }}
                  withdraw={withdraw}
                  walletAddress={wallet?.publicKey?.toBase58()}
                  leadingBid={auctionNFT?.highestBid}
                  bidding={bidding}
                  setMustWithdraw={setMustWithdraw}
                  mustWithdraw={mustWithdraw}
                  bids={bids}
                  setBids={setBids}
                />
              )}
              {/* <List>
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
                              color={theme.palette.secondary}
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
              </List> */}
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
                {auctionNFT?.description || "No description present"}
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
                  Mint address{" "}
                  <strong>
                    {auctionNFT && (
                      <ExplorerLink
                        address={auctionNFT?.tokenMint}
                        type="address"
                        source={ExplorerLinkBase.SolanaFM}
                        env={"mainnet-beta"}
                      />
                    )}
                  </strong>
                </li>
                {/* <li>On-chain Collection 6XxjK ... zNr</li> */}
                {/* <li>Token address 5XgEo ... 7Hp</li> */}
                <li>
                  Owner{" "}
                  <strong>
                    {auctionNFT && (
                      <ExplorerLink
                        address={auctionNFT?.sellerAddress}
                        type="address"
                        source={ExplorerLinkBase.SolanaFM}
                        env={"mainnet-beta"}
                      />
                    )}
                  </strong>
                </li>
                {/* <li>
                  Creator Royalties{" "}
                  <strong>{`${
                    Number(auctionNFT?.sellerFeeBasisPoint) / 100
                  }%`}</strong>
                </li>
                <li>
                  Transaction Fee <strong>2%</strong>
                </li> */}
                <li>
                  Bid/Withdraw Bid <strong>No cost</strong>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={1}>
          <Accordion
            expanded={accordionPanel === "attributes"}
            onChange={() =>
              setAccordionPanel(
                accordionPanel !== "attributes" ? "attributes" : ""
              )
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="attributes-content"
              id="attributes-header"
            >
              <Typography variant="h6">Attributes</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ overflow: "hidden" }}>
              <NftAttributes
                loading={false}
                attributes={auctionNFT?.attributes}
              />
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
              <pre>{metadata}</pre>
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
