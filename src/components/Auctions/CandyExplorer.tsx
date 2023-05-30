import React from "react";
import { web3 } from "@coral-xyz/anchor";
import { shortenAddress } from "../../utils/utils";
import { ExplorerLinkBase } from "@liqnft/candy-shop-sdk";
import { Box, SxProps, Theme } from "@mui/material";

export const BaseUrlType = {
  [ExplorerLinkBase.SolScan]: "https://solscan.io",
  [ExplorerLinkBase.SolanaFM]: "https://solana.fm",
  [ExplorerLinkBase.Explorer]: "https://explorer.solana.com",
};

const getClusterQuery = (
  network: string | undefined,
  baseUrl: ExplorerLinkBase
) => {
  if (network !== "devnet") return "";
  if (baseUrl === ExplorerLinkBase.SolanaFM) return "?cluster=devnet-qn1";
  return `?cluster=devnet`;
};

export const ExplorerLink = (props: {
  address: string | web3.PublicKey;
  type: string;
  length?: number;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  source: ExplorerLinkBase;
  env: web3.Cluster;
}): JSX.Element | null => {
  const { type, children, sx, length = 4, address, source, env } = props;
  if (!address) return null;
  const addressString =
    typeof address === "string" ? address : address?.toBase58();
  return (
    <Box display={"inline"} sx={sx}>
      <a
        href={`${
          BaseUrlType[ExplorerLinkBase.SolanaFM]
        }/${type}/${address}${getClusterQuery(env, source)}`}
        target="_blank"
        rel="noreferrer noopener"
        title={addressString}
      >
        {children || shortenAddress(addressString, length)}
      </a>
    </Box>
  );
};
