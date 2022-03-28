import React from "react";
import { ImageGrid } from "../../../components/Giphy/ImageGrid";
import { act, fireEvent, render , screen} from "@testing-library/react";

let data: any = [
  {
    type: "gif",
    id: "YOvOkaS5ZKfimDIgwJ",
    url: "https://giphy.com/gifs/badboys-bad-boys-for-life-badboysforlife-YOvOkaS5ZKfimDIgwJ",
    slug: "badboys-bad-boys-for-life-badboysforlife-YOvOkaS5ZKfimDIgwJ",
    bitly_gif_url: "https://gph.is/g/4zgRG1K",
    bitly_url: "https://gph.is/g/4zgRG1K",
    embed_url: "https://giphy.com/embed/YOvOkaS5ZKfimDIgwJ",
    username: "badboys",
    source: "www.badboysforlife.movie",
    title: "Will Smith Yes GIF by Bad Boys For Life",
    rating: "pg",
    content_url: "",
    source_tld: "",
    source_post_url: "www.badboysforlife.movie",
    is_sticker: 0,
    import_datetime: "2019-09-04 20:47:40",
    trending_datetime: "0000-00-00 00:00:00",
    images: {
      original: {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
        mp4_size: "210163",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.mp4&ct=g",
        webp_size: "461402",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.webp&ct=g",
        frames: "33",
        hash: "bd8e74007cbede5e05220db07761e383",
      },
      downsized: {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
      },
      downsized_large: {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
      },
      downsized_medium: {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
      },
      downsized_small: {
        height: "190",
        width: "373",
        mp4_size: "69136",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-downsized-small.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-downsized-small.mp4&ct=g",
      },
      downsized_still: {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy_s.gif&ct=g",
      },
      fixed_height: {
        height: "200",
        width: "392",
        size: "898974",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.gif&ct=g",
        mp4_size: "139701",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.mp4&ct=g",
        webp_size: "306122",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.webp&ct=g",
      },
      fixed_height_downsampled: {
        height: "200",
        width: "392",
        size: "180734",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_d.gif&ct=g",
        webp_size: "108670",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_d.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_d.webp&ct=g",
      },
      fixed_height_small: {
        height: "100",
        width: "196",
        size: "281494",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.gif&ct=g",
        mp4_size: "58004",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.mp4&ct=g",
        webp_size: "114836",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.webp&ct=g",
      },
      fixed_height_small_still: {
        height: "100",
        width: "196",
        size: "12831",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100_s.gif&ct=g",
      },
      fixed_height_still: {
        height: "200",
        width: "392",
        size: "33295",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_s.gif&ct=g",
      },
      fixed_width: {
        height: "102",
        width: "200",
        size: "290925",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.gif&ct=g",
        mp4_size: "59946",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.mp4&ct=g",
        webp_size: "117976",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.webp&ct=g",
      },
      fixed_width_downsampled: {
        height: "102",
        width: "200",
        size: "55694",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.gif&ct=g",
        webp_size: "35826",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.webp&ct=g",
      },
      fixed_width_small: {
        height: "51",
        width: "100",
        size: "93335",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.gif&ct=g",
        mp4_size: "24146",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.mp4&ct=g",
        webp_size: "46812",
        webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.webp&ct=g",
      },
      fixed_width_small_still: {
        height: "51",
        width: "100",
        size: "4076",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w_s.gif&ct=g",
      },
      fixed_width_still: {
        height: "102",
        width: "200",
        size: "13175",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_s.gif&ct=g",
      },
      looping: {
        mp4_size: "2442444",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-loop.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-loop.mp4&ct=g",
      },
      original_still: {
        height: "245",
        width: "480",
        size: "83712",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy_s.gif&ct=g",
      },
      original_mp4: {
        height: "244",
        width: "480",
        mp4_size: "210163",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.mp4&ct=g",
      },
      preview: {
        height: "96",
        width: "188",
        mp4_size: "24519",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.mp4&ct=g",
      },
      preview_gif: {
        height: "50",
        width: "98",
        size: "49798",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.gif&ct=g",
      },
      preview_webp: {
        height: "74",
        width: "144",
        size: "32880",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.webp&ct=g",
      },
      hd: {
        height: "408",
        width: "800",
        mp4_size: "1419392",
        mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-hd.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-hd.mp4&ct=g",
      },
      "480w_still": {
        height: "245",
        width: "480",
        size: "1813192",
        url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/480w_s.jpg?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=480w_s.jpg&ct=g",
      },
    },
    user: {
      avatar_url: "https://media0.giphy.com/avatars/badboys/Xgc5LRQrvsHx.jpg",
      banner_image: "https://media0.giphy.com/headers/badboys/tUHXq0J22npn.jpg",
      banner_url: "https://media0.giphy.com/headers/badboys/tUHXq0J22npn.jpg",
      profile_url: "https://giphy.com/badboys/",
      username: "badboys",
      display_name: "Bad Boys For Life",
      description:
        "BAD BOYS FOR LIFE, starring Will Smith and Martin Lawrence, on\r\nDigital Now, 4K UHD, Blu-ray & DVD 4/21!",
      instagram_url: "https://instagram.com/badboys",
      website_url: "http://badboysforlife.movie",
      is_verified: true,
    },
  },
];

let gif: any = {
  type: "gif",
  id: "YOvOkaS5ZKfimDIgwJ",
  url: "https://giphy.com/gifs/badboys-bad-boys-for-life-badboysforlife-YOvOkaS5ZKfimDIgwJ",
  slug: "badboys-bad-boys-for-life-badboysforlife-YOvOkaS5ZKfimDIgwJ",
  bitly_gif_url: "https://gph.is/g/4zgRG1K",
  bitly_url: "https://gph.is/g/4zgRG1K",
  embed_url: "https://giphy.com/embed/YOvOkaS5ZKfimDIgwJ",
  username: "badboys",
  source: "www.badboysforlife.movie",
  title: "Will Smith Yes GIF by Bad Boys For Life",
  rating: "pg",
  content_url: "",
  source_tld: "",
  source_post_url: "www.badboysforlife.movie",
  is_sticker: 0,
  import_datetime: "2019-09-04 20:47:40",
  trending_datetime: "0000-00-00 00:00:00",
  images: {
    original: {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
      mp4_size: "210163",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.mp4&ct=g",
      webp_size: "461402",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.webp&ct=g",
      frames: "33",
      hash: "bd8e74007cbede5e05220db07761e383",
    },
    downsized: {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
    },
    downsized_large: {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
    },
    downsized_medium: {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.gif&ct=g",
    },
    downsized_small: {
      height: "190",
      width: "373",
      mp4_size: "69136",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-downsized-small.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-downsized-small.mp4&ct=g",
    },
    downsized_still: {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy_s.gif&ct=g",
    },
    fixed_height: {
      height: "200",
      width: "392",
      size: "898974",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.gif&ct=g",
      mp4_size: "139701",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.mp4&ct=g",
      webp_size: "306122",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200.webp&ct=g",
    },
    fixed_height_downsampled: {
      height: "200",
      width: "392",
      size: "180734",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_d.gif&ct=g",
      webp_size: "108670",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_d.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_d.webp&ct=g",
    },
    fixed_height_small: {
      height: "100",
      width: "196",
      size: "281494",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.gif&ct=g",
      mp4_size: "58004",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.mp4&ct=g",
      webp_size: "114836",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100.webp&ct=g",
    },
    fixed_height_small_still: {
      height: "100",
      width: "196",
      size: "12831",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100_s.gif&ct=g",
    },
    fixed_height_still: {
      height: "200",
      width: "392",
      size: "33295",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200_s.gif&ct=g",
    },
    fixed_width: {
      height: "102",
      width: "200",
      size: "290925",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.gif&ct=g",
      mp4_size: "59946",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.mp4&ct=g",
      webp_size: "117976",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w.webp&ct=g",
    },
    fixed_width_downsampled: {
      height: "102",
      width: "200",
      size: "55694",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.gif&ct=g",
      webp_size: "35826",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.webp&ct=g",
    },
    fixed_width_small: {
      height: "51",
      width: "100",
      size: "93335",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.gif&ct=g",
      mp4_size: "24146",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.mp4&ct=g",
      webp_size: "46812",
      webp: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w.webp&ct=g",
    },
    fixed_width_small_still: {
      height: "51",
      width: "100",
      size: "4076",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/100w_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=100w_s.gif&ct=g",
    },
    fixed_width_still: {
      height: "102",
      width: "200",
      size: "13175",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_s.gif&ct=g",
    },
    looping: {
      mp4_size: "2442444",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-loop.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-loop.mp4&ct=g",
    },
    original_still: {
      height: "245",
      width: "480",
      size: "83712",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy_s.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy_s.gif&ct=g",
    },
    original_mp4: {
      height: "244",
      width: "480",
      mp4_size: "210163",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy.mp4&ct=g",
    },
    preview: {
      height: "96",
      width: "188",
      mp4_size: "24519",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.mp4&ct=g",
    },
    preview_gif: {
      height: "50",
      width: "98",
      size: "49798",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.gif&ct=g",
    },
    preview_webp: {
      height: "74",
      width: "144",
      size: "32880",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-preview.webp?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-preview.webp&ct=g",
    },
    hd: {
      height: "408",
      width: "800",
      mp4_size: "1419392",
      mp4: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/giphy-hd.mp4?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=giphy-hd.mp4&ct=g",
    },
    "480w_still": {
      height: "245",
      width: "480",
      size: "1813192",
      url: "https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/480w_s.jpg?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=480w_s.jpg&ct=g",
    },
  },
  user: {
    avatar_url: "https://media0.giphy.com/avatars/badboys/Xgc5LRQrvsHx.jpg",
    banner_image: "https://media0.giphy.com/headers/badboys/tUHXq0J22npn.jpg",
    banner_url: "https://media0.giphy.com/headers/badboys/tUHXq0J22npn.jpg",
    profile_url: "https://giphy.com/badboys/",
    username: "badboys",
    display_name: "Bad Boys For Life",
    description:
      "BAD BOYS FOR LIFE, starring Will Smith and Martin Lawrence, on\r\nDigital Now, 4K UHD, Blu-ray & DVD 4/21!",
    instagram_url: "https://instagram.com/badboys",
    website_url: "http://badboysforlife.movie",
    is_verified: true,
  },
};

let setOpen: any = false;

describe("<ImageGrid/> component :", () => {
  test("display <ImageGrid/> component when gifArr undefined", () => {
    let rendered = render(
      <ImageGrid
        gifArr={[]}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  test("display <ImageGrid/> component  when loading", async () => {
    let rendered = render(
      <ImageGrid
        gifArr={data}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  test("display <ImageGrid/> component  when gifArr have list", async () => {
    let rendered = render(
      <ImageGrid
        gifArr={data}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});

describe("Assertion testing of <ImageGrid/> component  :", () => {
  test("When gifArr undefined", () => {
  render(
      <ImageGrid
        gifArr={[]}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={false}
      />
    );
   expect(screen.getByText('No gifs were found')).toBeInTheDocument();
  });

  test("When loading", async () => {
    render(
      <ImageGrid
        gifArr={data}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={true}
      />
    );
  
     expect(screen.getByRole('img', { name: 'Will Smith Yes GIF by Bad Boys For Life' })).toHaveAttribute('src', 'https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.gif&ct=g');
     expect(screen.getByRole('progressbar')).toBeInTheDocument();
     expect(screen.getByRole('list')).toBeInTheDocument();
     expect(screen.getByRole('button', { name: 'Will Smith Yes GIF by Bad Boys For Life' })).toBeInTheDocument();
  });

  test("When gifArr have list", async () => {
   render(
      <ImageGrid
        gifArr={data}
        setGif={gif}
        setOpen={setOpen}
        isLoadingMore={false}
      />
    );
   
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Will Smith Yes GIF by Bad Boys For Life' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Will Smith Yes GIF by Bad Boys For Life' })).toHaveAttribute('src', 'https://media4.giphy.com/media/YOvOkaS5ZKfimDIgwJ/200w_d.gif?cid=e0fc1889ila69xrbm6kvpj1jlybb6ekm6rlldv3rgul4jvxn&rid=200w_d.gif&ct=g');
  
  });
});
