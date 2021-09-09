import React from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { formatNumber } from "../../utils/utils";
import { Identicon } from "../Identicon";
import { useNativeAccount } from "../../contexts/accounts";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  units: {
    paddingTop: "3px",
  }
}));

export const CurrentUserBadge = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();
  const classes = useStyles();

  // should use SOL ◎ ?

  return (
    <>
      <Grid container>
        <Grid className={classes.icon}>
          {/* <Identicon
            address={wallet.name}
            style={{ marginLeft: "0.5rem", display: "flex", width: "30" }}
          /> */}
          {/* Put wallet.icon here if no avatar */}
        </Grid>
        <Grid className={classes.units}>
          <p>{formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL</p>
        </Grid>
      </Grid>
    </>
  );
};
