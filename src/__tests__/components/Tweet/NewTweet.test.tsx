import React from "react";
import { NewTweet } from "../../../components/Tweet/NewTweet";
import { MockedProvider } from "@apollo/client/testing";
import { TWEET, NEW_TWEET } from "../../../queries/tweet/index";
import { SnackbarProvider } from "notistack";
import { act, fireEvent, render, screen } from "@testing-library/react";

const feed: any = {
  data: {
    feed: [
      {
        id: "cl0hygwrv9451301mmu613kt5j",
        text: "Ukrainian girl, 8, killed by Russian shelling despite grandad desperately trying to shield her from blast with his body\nAN EIGHT-year-old Ukrainian girl was killed by Russian shelling as her grandad desperately tried to shield her from the blast.\n\nTragic Alisa died as Putin's thugs opened fire and dropped devastating bombs in the city of Ochtyrka in Sumy Oblast, the wife of the Ukrainian President announced.\nhttps://www.thesun.co.uk/news/17871166/ukrainian-girl-killed-russian-shelling-grandad-body-shield/",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646733266923",
        parentTweet: null,
        files: [],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [],
        __typename: "Tweet",
      },
      {
        id: "cl0hy0cci2646601mo2cunn5i0",
        text: 'DEMORALISED Russian soldiers want to quit the army and say they are being "massacred" in Ukraine, according to intercepted phone calls to their comrades and loved ones back home.\n\nIn the calls, troops claim the war could drag on for "months", despite Vladimir Putin\'s claims the conflict would be over in just two weeks.\nhttps://www.thesun.co.uk/news/17873887/pasha-lees-haunting-final-insta-post/',
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646732493954",
        parentTweet: null,
        files: [],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [],
        __typename: "Tweet",
      },
      {
        id: "cl0hxzij47100301mmk6kr1s6a",
        text: "what",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646732455312",
        parentTweet: null,
        files: [],
        gif: null,
        nft: null,
        user: {
          id: "ckuw9oq1218015301l8iuw1ek0s",
          publicAddress: "BK2faaY1W41n66CedTM11wQhnhbTD6WQPusjY33AMDLP",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/2a544750f2694f1dbc687206b0ccb864.jpg",
          handle: "MrMroxxx",
          consumerName: "Mroxx",
          __typename: "User",
        },
        reactions: [],
        __typename: "Tweet",
      },
      {
        id: "cl0hxv8uz6504001mmyqk9rsc5",
        text: "THREE Russian commanders have been killed in recent fighting in Ukraine, with Z-marked tanks left abandoned during a stalled siege.\n\nIt comes as Ukrainian forces have recaptured Chuhuiv with defence officials claiming they have inflicted heavy losses on the Russian army.\nhttps://www.thesun.co.uk/news/17873540/three-putins-commanders-killed-recaptured-ukrainian-city/",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646732256155",
        parentTweet: null,
        files: [
          {
            id: "cl0hxv8va6505001mmd41ahtw9",
            url: "https://sosol-prod.s3.us-west-2.amazonaws.com/images/NINTCHDBPICT000717093284.webp",
            __typename: "File",
          },
        ],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxwmiy2084801mo0t154rue",
            emojiId: "+1",
            skin: 1,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hxppgb1426601mordppyu31",
        text: "Boomarmy to the world 🌎",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646731997723",
        parentTweet: null,
        files: [
          {
            id: "cl0hxppgh1427801mosyx6m0hx",
            url: "https://sosol-prod.s3.us-west-2.amazonaws.com/images/ZomboMeme%2019022022204129.jpg",
            __typename: "File",
          },
        ],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxwr5f2167101momns7dug6",
            emojiId: "+1",
            skin: 1,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hxdbyc216401moqnjnw92m",
        text: "MAHI MAHI Boom",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646731420356",
        parentTweet: null,
        files: [
          {
            id: "cl0hxdbyj217401moc4soue7q",
            url: "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220308_071118.jpg",
            __typename: "File",
          },
        ],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxlztt1100501mo9c66uaty",
            emojiId: "+1",
            skin: 1,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hx7vu6114601mo7dbl7siz",
        text: "You are welcome Boombot,let Boom together",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646731166190",
        parentTweet: null,
        files: [],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxwvf66684901mm0yad4wmv",
            emojiId: "+1",
            skin: 1,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hx1af04582101mmtvplsw14",
        text: "BZZRT! BOOMBOT ACTIVATED! PREPARE YOUR ASTOUNDING MEEPS FOR $BMA DISTRIBUTION!",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646730858492",
        parentTweet: null,
        files: [],
        gif: null,
        nft: null,
        user: {
          id: "cl0atq6my13790101l82ww7sq51",
          publicAddress: "HB1cRdkjaZN88o2w1Jq64iag3vEW8tjKthDqqPfKQ1y",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/boombotpfp.png",
          handle: "boombot",
          consumerName: "BOOMBOT",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxuwaj6411801mmqkj2q5s8",
            emojiId: "robot_face",
            skin: null,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hwytyc5566601laciohdawi",
        text: "We've updated our Road Map because we've been ticking things off.\n\nSee the bottom tile for #BoomHeroes info! Soon... https://t.co/jUK4jXABCA #boomarmy",
        tags: ["#BoomHeroes", "#boomarmy"],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646730743844",
        parentTweet: null,
        files: [
          {
            id: "cl0hwytyj5567601lawh2b6zob",
            url: "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220308_101049.jpg",
            __typename: "File",
          },
        ],
        gif: null,
        nft: null,
        user: {
          id: "ckv29k2gq49238501mkfc2oui25",
          publicAddress: "vv8AiCe1Uyhj7yqRmYfGVF5Y295ctb33npD3YzkwpJT",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/PicsArt_11-26-04.04.41.jpg",
          handle: "Samuel-of-9090",
          consumerName: "Okeke",
          __typename: "User",
        },
        reactions: [
          {
            id: "cl0hxy7g46914501mm1m92k8er",
            emojiId: "boom",
            skin: null,
            isMine: false,
            count: 1,
            __typename: "Reaction",
          },
        ],
        __typename: "Tweet",
      },
      {
        id: "cl0hwwizh3860801mm8pyy423s",
        text: "",
        tags: [],
        isTweetMine: false,
        commentsCount: 0,
        retweetsCount: 0,
        isRetweet: false,
        tipsCount: "0",
        createdAt: "1646730636317",
        parentTweet: null,
        files: [
          {
            id: "cl0hwwizr3861801mm3jdyxmho",
            url: "https://sosol-prod.s3.us-west-2.amazonaws.com/images/Screenshot_20220308-071155.png",
            __typename: "File",
          },
        ],
        gif: null,
        nft: null,
        user: {
          id: "ckzmvxjyq648201moik59nrii",
          publicAddress: "4AnbBRYKBrShQiXSvHDKUTgnSiuL5p8PRjictsRKc2T1",
          avatar:
            "https://sosol-prod.s3.us-west-2.amazonaws.com/images/20220216_192822.jpg",
          handle: "dark-field-1777",
          consumerName: "dark-field-1777",
          __typename: "User",
        },
        reactions: [],
        __typename: "Tweet",
      },
    ],
  },
};

export const __mocks__: any = [
  {
    request: {
      query: NEW_TWEET,
      variables: {},
      refetchQueries: [
        // { query: TWEET, variables: { id: "cl084xdy815761s0n5omoxoem0" } },
      ],
    },
    result: {
      data: {
        // mentions: [],
      },
      errors: "An error occurred",
    },
  },
];

test("display <NewTweet/> component", async () => {
  let rendered;
  await act(async () => {
    rendered = render(
      <MockedProvider mocks={__mocks__} addTypename={false}>
        <SnackbarProvider>
          <NewTweet feed={[]} parentTweet={[]} />
        </SnackbarProvider>
      </MockedProvider>
    );
  });
  expect(rendered).toMatchSnapshot();
});

test("Assertion testing of <NewTweet/> component", () => {
  render(
    <MockedProvider mocks={__mocks__} addTypename={false}>
      <SnackbarProvider>
        <NewTweet feed={[]} parentTweet={[]} />
      </SnackbarProvider>
    </MockedProvider>
  );

  expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "" })).toHaveAttribute(
    "placeholder",
    "What's happening?"
  );
});
