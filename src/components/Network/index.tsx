import React from "react";
import { ENDPOINTS, useConnectionConfig } from "../../contexts/connection";
import { useWallet } from "../../contexts/wallet";
import {
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

export const Network = () => {
  const { connected, disconnect } = useWallet();
  const { endpoint, setEndpoint } = useConnectionConfig();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (endpoint: string) => {
    setEndpoint(endpoint);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="connect-network-button"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        {endpoint}
      </Button>
      <Menu
        id="connect-network-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {!connected
          ? ENDPOINTS.map(({ name, endpoint }) => {
              return (
                <MenuItem 
                key={name}
                onClick={() => handleClose(endpoint)} 
                value={endpoint}>{name}</MenuItem>
              );
            })
          : <MenuItem onClick={disconnect}>Disconnect</MenuItem>}
      </Menu>
    </>
  );
};
