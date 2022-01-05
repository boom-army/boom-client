import React, { useEffect, useState } from "react";
import { Metadata, MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { useConnection } from "@solana/wallet-adapter-react";

interface props {
  publicAddress: string;
}

export const NFTGallery: React.FC<props> = ({ publicAddress }) => {
  const { connection } = useConnection();
  const [nfts, setNfts] = useState<MetadataData[]>();

  useEffect(() => {
    (async () => {
      const nftMeta = await Metadata.findByOwnerV2(connection, publicAddress);
      const nftData = nftMeta.map((meta) => meta.data);
      setNfts(nftData);
      console.log(nftData);
    })();
  }, [publicAddress]);

  return (
    <>
      {nfts &&
        nfts.map((nft: any) => {
          return <div>{nft.mint}</div>;
        })}
    </>
  );
};
