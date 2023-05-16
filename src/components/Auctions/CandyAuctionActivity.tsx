import React, { useState, useCallback, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CandyShop, fetchAuctionHistory } from "@liqnft/candy-shop-sdk";
import {
  AuctionBid,
  AuctionStatus,
  ListBase,
  SortBy,
} from "@liqnft/candy-shop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader } from "../Loader";
import { ExplorerLink } from "../ExplorerLink";
import { Box, Button, Grid, styled, Typography, useTheme } from "@mui/material";

dayjs.extend(relativeTime);

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

function EMPTY_FUNCTION(): void {
  //
}

interface AuctionActivityProps {
  candyShop: CandyShop;
  orderBy?: SortBy;
  auctionAddress: string;
  withdraw: (bidIndex?: number) => Promise<void>;
  walletAddress: string | undefined;
  leadingBid: string | undefined;
  bidding: boolean;
  setMustWithdraw: (mustWithdraw: boolean) => void;
  mustWithdraw: boolean;
  bids: AuctionBid[];
  setBids: (bids: AuctionBid[]) => void;
}

const LIMIT = 10;

const MinBox = styled(Box)({
  "&.MuiBox-root": {
    minWidth: "9em",
    marginLeft: "1em",
    "& span": {
      fontSize: "0.8em",
      paddingLeft: "0.3em",
    },
  },
});

export const AuctionActivity: React.FC<AuctionActivityProps> = ({
  candyShop,
  auctionAddress,
  orderBy,
  withdraw,
  walletAddress,
  bidding,
  setMustWithdraw,
  mustWithdraw,
  bids,
  setBids,
}) => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const theme = useTheme();

  const getAuctionBids = useCallback(
    (offset: number, limit: number, firstLoad?: boolean) => () => {
      fetchAuctionHistory(auctionAddress, {
        offset,
        limit,
        orderByArr: orderBy,
      })
        .then((res: ListBase<AuctionBid>) => {
          const { result, offset, totalCount, count, success } = res;
          if (!success) {
            return setHasMore(false);
          }
          const hasMore = offset + count < Number(totalCount);
          if (hasMore) {
            setOffset(offset + count + 1);
          }

          //@ts-ignore
          setBids((list) => {
            if (firstLoad) return result || [];
            return removeDuplicate<AuctionBid>(list, result, "bidAddress");
          });
        })
        .catch((error: any) => {
          setHasMore(false);
          console.log(`fetchAuctionHistory failed, error=`, error);
        });
    },
    []
  );

  useEffect(() => {
    getAuctionBids(0, LIMIT)();
  }, [getAuctionBids]);

  return (
    <>
      <Grid
        container
        id="scrollBox"
        sx={{
          minHeight: "150px",
          overflow: "auto",
        }}
      >
        <Grid item xs={12}>
          <Box display={"inline-flex"}>
            <MinBox>BUYER ADDRESS</MinBox>
            <MinBox>PRICE</MinBox>
            <MinBox>STATUS</MinBox>
          </Box>
        </Grid>

        <InfiniteScroll
          dataLength={bids.length}
          next={offset === 0 ? EMPTY_FUNCTION : getAuctionBids(offset, LIMIT)}
          loader={
            bids.length ? (
              <Box sx={{ marginTop: "1em", ml: "1em" }}>
                <Loader />
              </Box>
            ) : (
              <Typography m={2}>There are no bids yet.</Typography>
            )
          }
          scrollableTarget="scrollBox"
          hasMore={hasMore}
          style={{ minHeight: "150px" }}
        >
          {bids.map((auction, index) => {
            const canWithdraw =
              walletAddress === auction.buyerAddress &&
              index !== 0 &&
              AuctionStatus[auction.status] !== "STARTED" &&
              walletAddress !== auction.bidAddress;
            setMustWithdraw(canWithdraw);
            return (
              <Grid item xs={12}>
                <Box key={auction.bidAddress} display={"inline-flex"}>
                  <MinBox>
                    <ExplorerLink
                      type="address"
                      address={auction.buyerAddress}
                      code={true}
                    />
                  </MinBox>
                  <MinBox>
                    {`${(
                      Number(auction.price) / candyShop.baseUnitsPerCurrency
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: candyShop.priceDecimalsMin,
                      maximumFractionDigits: candyShop.priceDecimals,
                    })} ${candyShop.currencySymbol}`}
                  </MinBox>
                  <MinBox>
                    {canWithdraw ? (
                      <Button
                        size="small"
                        sx={{
                          "&.Mui-disabled": { color: theme.palette.secondary },
                        }}
                        disabled={bidding}
                        onClick={async () => withdraw(index)}
                      >
                        Withdraw bid
                      </Button>
                    ) : (
                      <span>{AuctionStatus[auction.status]}</span>
                    )}
                  </MinBox>
                </Box>
              </Grid>
            );
          })}
        </InfiniteScroll>
      </Grid>
    </>
  );
};
