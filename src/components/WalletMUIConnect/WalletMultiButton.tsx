import {
  // FIXME(https://github.com/mui/material-ui/issues/35233)
  FileCopy as CopyIcon,
  // FIXME(https://github.com/mui/material-ui/issues/35233)
  LinkOff as DisconnectIcon,
  // FIXME(https://github.com/mui/material-ui/issues/35233)
  SwapHoriz as SwitchIcon,
} from "@mui/icons-material";
import type { ButtonProps, Theme } from "@mui/material";
import {
  Button,
  Collapse,
  Fade,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useCallback } from "react";
import React, { useMemo, useState } from "react";
import { useWalletDialog } from "./useWalletDialog.js";
import { WalletConnectButton } from "./WalletConnectButton.js";
import { WalletDialogButton } from "./WalletDialogButton.js";
import { WalletIcon } from "./WalletIcon.js";
import { useSnackbar } from "../../contexts/snackbar.js";
import { useNavigate } from "react-router-dom";
import { localStorageLogout } from "../../utils";

const StyledMenu = styled(Menu)(({ theme }: { theme: Theme }) => ({
  "& .MuiList-root": {
    padding: 0,
  },
  "& .MuiListItemIcon-root": {
    marginRight: theme.spacing(),
    minWidth: "unset",
    "& .MuiSvgIcon-root": {
      width: 20,
      height: 20,
    },
  },
}));

const WalletActionMenuItem = styled(MenuItem)(
  ({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(1, 2),
    boxShadow: "inset 0 1px 0 0 " + "rgba(255, 255, 255, 0.1)",

    "&:hover": {
      boxShadow:
        "inset 0 1px 0 0 " +
        "rgba(255, 255, 255, 0.1)" +
        ", 0 1px 0 0 " +
        "rgba(255, 255, 255, 0.05)",
    },
  })
);

const WalletMenuItem = styled(WalletActionMenuItem)(
  ({ theme }: { theme: Theme }) => ({
    padding: 0,

    "& .MuiButton-root": {
      borderRadius: 0,
    },
  })
);

export const WalletMultiButton: FC<ButtonProps> = ({
  color = "primary",
  type = "button",
  children,
  ...props
}) => {
  const { publicKey, wallet, disconnect } = useWallet();
  const { setOpen } = useWalletDialog();
  const [anchor, setAnchor] = useState<HTMLElement>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  const handleLogout = useCallback(
    (event: any) => {
      localStorageLogout()
      disconnect().catch(() => {
        // Silently catch because any errors are caught by the context `onError` handler
      });
      setTimeout(() => {
        navigate("/", { replace: true }); // Redirect using React Router
        window.location.reload(); // Force refresh after redirecting
      }, 2100);
      return enqueueSnackbar("You are logged out", { variant: "success" });
    },
    [disconnect, enqueueSnackbar]
  );

  if (!wallet) {
    return (
      <WalletDialogButton color={color} type={type} {...props}>
        {children}
      </WalletDialogButton>
    );
  }
  if (!base58) {
    return (
      <WalletConnectButton color={color} type={type} {...props}>
        {children}
      </WalletConnectButton>
    );
  }

  return (
    <>
      <Button
        color={color}
        type={type}
        startIcon={<WalletIcon wallet={wallet} />}
        onClick={(event) => setAnchor(event.currentTarget)}
        aria-controls="wallet-menu"
        aria-haspopup="true"
        {...props}
      >
        {content}
      </Button>
      <StyledMenu
        id="wallet-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(undefined)}
        marginThreshold={0}
        TransitionComponent={Fade}
        transitionDuration={250}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <WalletMenuItem onClick={() => setAnchor(undefined)}>
          <Button
            color={color}
            type={type}
            startIcon={<WalletIcon wallet={wallet} />}
            onClick={(event) => setAnchor(undefined)}
            fullWidth
            {...props}
          >
            {wallet.adapter.name}
          </Button>
        </WalletMenuItem>
        <Collapse in={!!anchor}>
          <WalletActionMenuItem
            onClick={async () => {
              setAnchor(undefined);
              await navigator.clipboard.writeText(base58);
            }}
          >
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
            Copy address
          </WalletActionMenuItem>
          <WalletActionMenuItem
            onClick={() => {
              setAnchor(undefined);
              localStorageLogout();
              setOpen(true);
            }}
          >
            <ListItemIcon>
              <SwitchIcon />
            </ListItemIcon>
            Change wallet
          </WalletActionMenuItem>
          <WalletActionMenuItem onClick={handleLogout}>
            <ListItemIcon>
              <DisconnectIcon />
            </ListItemIcon>
            Disconnect
          </WalletActionMenuItem>
        </Collapse>
      </StyledMenu>
    </>
  );
};
