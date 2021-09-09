import React, { useMemo, MouseEventHandler, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // icon: {
  //   marginRight: theme.spacing(2),
  // }
}));

export const CurrentUser = (props: { connected: boolean }) => {
  const { connected } = props;
  const classes = useStyles();
  const { wallet, publicKey } = useWallet();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [wallet, base58]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      console.log(event);
    },
    []
  );

  // should use SOL ◎ ?

  return (
    <>
      <Grid container direction="row">
        <Typography variant="h6">Sosol</Typography>
        {connected && (
          <>
            <Avatar src={wallet?.icon} />
            <Button variant="contained" color="primary" onClick={handleClick}>
              Login with {content}
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};
