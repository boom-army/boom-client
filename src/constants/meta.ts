import BoomArmy from "../images/raise-the-boomarmy.png";
import Boom72 from "../images/boom-72.png";
import BoomLogo from "../images/logo.png";

export const META_LINKS = [
  {
    rel: "icon",
    type: "image/png",
    href: BoomLogo,
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    type: "image/png",
    href: Boom72,
  },
];

export const META_METAS = [
  { "http-equiv": "Cache-Control", content: "no-cache" },
  {
    name: "description",
    content:
      "Boom Army is changing the way Creators develop NFTs to engage their Communities on Solana.",
  },
  { name: "keywords", content: "boom army, solana, social media, NFT" },
  { name: "robots", content: "index, follow" },
  { name: "url", content: window.location.href },
];

export const META_OG = {
  title: "Boom",
  image: BoomArmy,
  site_name: "Boom",
};
