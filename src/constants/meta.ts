import boom72 from 'boom-72.png'
import boomLogo from 'logo.png'

export const META_LINKS = [
  {
    rel: "icon",
    type: "image/png",
    href: boomLogo,
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    type: "image/png",
    href: boom72,
  },
];

export const META_METAS = [{ name: "url", content: window.location.href }];
