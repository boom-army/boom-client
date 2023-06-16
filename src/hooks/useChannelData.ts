import { useMemo } from "react";
import { useApolloClient } from "@apollo/client";
import { uniqBy, differenceBy } from "lodash";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ChannelStatus } from "../constants";
import { useMetaplex } from "../contexts/metaplex";
import { useSnackbar } from "../contexts/snackbar";
import {
  useGetUserChannelsLazyQuery,
  useAddChannelMutation,
  useUnlinkChannelMutation,
} from "../generated/graphql";
import { displayError } from "../utils";

export const useChannelData = () => {
  const { connection } = useConnection();
  const metaplex = useMetaplex();
  const client = useApolloClient();
  const { publicKey, connected } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const [getUserChannels, { data, loading, error }] =
    useGetUserChannelsLazyQuery({
      fetchPolicy: "network-only",
    });
  const [addChannelMutation] = useAddChannelMutation();
  const [channelUnlinkMutation] = useUnlinkChannelMutation();

  useMemo(() => {
    (async () => {
      try {        
        if (!connected) displayError("Wallet not connected", enqueueSnackbar);
        const nftData = publicKey
          ? await metaplex?.nfts().findAllByOwner({
              owner: publicKey,
            })
          : [];

        const formatChannelData =
          nftData?.map(async (data, i) => {
            try {
              const meta: any = await fetch(data.uri).then((response) =>
                response.json()
              );              
              return {
                __typename: "Channel" as "Channel",
                // @ts-ignore
                id: data.mintAddress.toBase58() ?? "",
                mintAuthority: data.updateAuthorityAddress.toBase58() ?? "",
                collection: data.collection?.address ?? "",
                name: meta?.collection?.name ?? "",
                family: meta?.collection?.family ?? "",
                status: "active",
                image: meta.image ?? "",
                description: meta.description ?? "",
                verified: null,
                channelParentId: null,
                membersCount: null,
              };
            } catch (error) {
              return Promise.resolve({
                name: "",
                family: "",
                mintAuthority: "",
                description: "",
                image: "",
                status: "",
              });
            }
          }) || [];
        const channelData = await Promise.all(formatChannelData);
        // console.log("nftData", JSON.stringify(channelData));
        const validChannels = channelData?.filter(
          (channel) => channel?.name || channel?.family
        );
        const uniqueChannels = uniqBy(validChannels, (d) =>
          [d?.mintAuthority, d?.name, d?.family].join()
        );
        const currentChannels = await getUserChannels();
        const channelDiff = differenceBy(
          currentChannels?.data?.getUserChannels || [],
          uniqueChannels,
          (d) => [d?.mintAuthority, d?.name, d?.family].join()
        );
        // Unlink stale NFT channels
        if (channelDiff.length) {
          const unlinkStaleNFTs = channelDiff.map(async (channel) => {
            try {
              await channelUnlinkMutation({
                variables: { channelId: channel.id },
              });
            } catch (error) {
              return Promise.resolve();
            }
          });
          await Promise.all(unlinkStaleNFTs);
        }
        if (uniqueChannels.length) {
          const unlinkStaleNFTs = uniqueChannels.map(async (channel) => {
            try {
              await addChannelMutation({
                variables: {
                  mintAuthority: channel.mintAuthority,
                  name: channel.name,
                  family: channel.family,
                  description: channel.description,
                  image: channel.image,
                  status: ChannelStatus.ACTIVE,
                  channelParentId: null,
                },
              });
            } catch (error) {
              return Promise.resolve();
            }
          });
          await Promise.all(unlinkStaleNFTs);
        }
      } catch (error) {
        displayError(error, enqueueSnackbar);
      }
    })();
  }, [connection, publicKey, client]);

  return {
    channelData: { ...data },
    channelLoading: loading,
    channelError: error,
  };
};
