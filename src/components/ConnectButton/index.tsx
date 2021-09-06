import React, { useState } from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useWallet } from "../../contexts/wallet";
import { WALLET_PROVIDERS } from "../../contexts/wallet";
import { shortenAddress } from "../../utils/utils";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const ConnectButton = () => {
  const { wallet, connect, connected, setProviderUrl, disconnect } = useWallet();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [autoConnect, setAutoConnect] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (provider: any) => {
    setAnchorEl(null);
    setProviderUrl(provider?.url);
    setAutoConnect(true);
    connect();
  };

  return (
    <>
      <Button
        aria-controls="connect-wallet-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
        startIcon={<AccountBalanceWalletIcon />}
        endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        style={{ textTransform: "none" }}
      >
        {!connected ? 'Connect wallet' : shortenAddress(`${wallet?.publicKey}`, 11)}
      </Button>
      <Menu
        id="connect-wallet-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {!connected
          ? WALLET_PROVIDERS.map((provider) => {
              return (
                <MenuItem
                  key={provider.name}
                  onClick={() => handleClose(provider)}
                >
                  <ListItemIcon>
                    <img
                      alt={`${provider.name}`}
                      width={20}
                      height={20}
                      src={provider.icon}
                      style={{ marginRight: 8 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={provider.name} />
                </MenuItem>
              );
            })
          : <MenuItem onClick={disconnect}>Disconnect</MenuItem>}
      </Menu>
    </>
  );
};
