import * as anchor from "@project-serum/anchor";
import { useContext } from "react";

import { Grid, Typography } from "@mui/material";
import { MintCountdown } from "./MintCountdown";
import { toDate, formatNumber } from "../../utils/utils";
import { CandyMachineAccount } from "../../utils/candy-machine";
import { ThemeContext } from "../../contexts/theme";

type HeaderProps = {
  candyMachine?: CandyMachineAccount;
};

export const Header = ({ candyMachine }: HeaderProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid container direction="row" justifyContent="center" wrap="nowrap">
      <Grid container direction="row" wrap="nowrap">
        {candyMachine && (
          <Grid container direction="row" wrap="nowrap">
            <Grid container direction="column">
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ color: theme.secondaryColor }}
              >
                Remaining
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
                style={{
                  fontWeight: "bold",
                  color: theme.primaryColor,
                }}
              >
                {`${candyMachine?.state.itemsRemaining}`}
              </Typography>
            </Grid>
            <Grid container direction="column">
              <Typography
                variant="body2"
                color="textPrimary"
                style={{ color: theme.secondaryColor }}
              >
                Price
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
                style={{ fontWeight: "bold", color: theme.primaryColor }}
              >
                {getMintPrice(candyMachine)}
              </Typography>
            </Grid>
          </Grid>
        )}
        <MintCountdown
          date={toDate(
            candyMachine?.state.goLiveDate
              ? candyMachine?.state.goLiveDate
              : candyMachine?.state.isPresale
              ? new anchor.BN(new Date().getTime() / 1000)
              : undefined
          )}
          style={{ justifyContent: "flex-end" }}
          status={
            !candyMachine?.state?.isActive || candyMachine?.state?.isSoldOut
              ? "COMPLETED"
              : candyMachine?.state.isPresale
              ? "PRESALE"
              : "LIVE"
          }
        />
      </Grid>
    </Grid>
  );
};

const getMintPrice = (candyMachine: CandyMachineAccount): string => {
  const price = formatNumber.asNumber(
    candyMachine.state.isPresale &&
      candyMachine.state.whitelistMintSettings?.discountPrice
      ? candyMachine.state.whitelistMintSettings?.discountPrice!
      : candyMachine.state.price!
  );
  return `◎ ${price}`;
};
