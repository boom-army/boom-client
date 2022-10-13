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
import { Box, Button, Grid, styled } from "@mui/material";
import { ThemeContext } from "../../contexts/theme";

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
  withdraw: () => Promise<void>;
  walletAddress: string | undefined;
  leadingBid: string | undefined;
  bidding: boolean;
  setMustWithdraw: (mustWithdraw: boolean) => void;
}

const LIMIT = 10;
const Logger = "CandyShopUI/AuctionActivity";

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
}) => {
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const { theme } = useContext(ThemeContext);

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

          setHasMore(hasMore);
          setBids((list) => {
            console.log("list", list);
            if (firstLoad) return result || [];
            return removeDuplicate<AuctionBid>(list, result, "bidAddress");
          });
        })
        .catch((error: any) => {
          setHasMore(false);
          console.log(`${Logger}: fetchAuctionHistory failed, error=`, error);
        });
    },
    [auctionAddress, orderBy]
  );

  useEffect(() => {
    getAuctionBids(0, LIMIT)();
  }, [getAuctionBids]);

  function to(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  const makeWithdraw = async () => {
    console.log('***************1');
    // await withdraw();
    // await to(2000);
    // console.log('***************2');
    // await to(2000);
    // console.log('***************3');
    // wait 10 seconds for the withdraw to be confirmed
    
  };

  return (
    <>
      <Grid
        container
        id="auctionHistory"
        sx={{
          minHeight: "110px",
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
          loader={<Loader />}
          scrollableTarget="auctionHistory"
          hasMore={hasMore}
        >
          {bids.map((auction, index) => {
            console.log("auction", AuctionStatus[auction.status], index);

            const canWithdraw =
              walletAddress === auction.buyerAddress &&
              index !== 0 &&
              AuctionStatus[auction.status] !== "STARTED" &&
              walletAddress !== auction.bidAddress;
            setMustWithdraw(canWithdraw);
            // const canWithdraw = false;
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
                          "&.Mui-disabled": { color: theme.secondaryColor },
                        }}
                        disabled={bidding}
                        onClick={async () => await makeWithdraw()}
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
