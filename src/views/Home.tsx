import React, { useEffect } from "react";
import useMetaTags from "react-metatags-hook";
import { FeedList } from "../components/FeedList";
import { META_METAS, META_LINKS, META_OG } from "../constants/meta";
import { NewTweet } from "../components/Tweet";
import { useFeedQuery } from "../generated/graphql";
import BoomArmy from "../images/raise-the-boomarmy.png";

export const Home: React.FC = () => {
  const { loading, error, data, fetchMore } = useFeedQuery({
    variables: {
      offset: 0,
      limit: 10,
      global: true,
    },
    fetchPolicy: "network-only",
  });

  useMetaTags(
    {
      metas: [...META_METAS],
      links: [
        { rel: "canonical", href: window.location.origin },
        ...META_LINKS,
      ],
      openGraph: META_OG,
      twitter: {
        card: 'summary',
        creator: '@boom_army_',
        title: 'Boom | NFT Driven Communities on Solana',
        image: BoomArmy,
      },
    },
    []
  );

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      fetchMore({
        variables: {
          offset: data?.feed?.length ?? 0,
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <NewTweet feed={data?.feed} parentTweet={null} />
      <FeedList loading={loading} error={error} data={data} />
    </>
  );
};
