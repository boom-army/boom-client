import React from "react";
import { User as UserProps } from "../../../generated/graphql";
import SearchResult from "../../../components/Search/SearchResult";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
// import { MentionsDocument, Tweet } from "../../../generated/graphql";
import { TOGGLE_REACTION, TWEET } from "../../../queries/tweet/index";

export const __mocks__: any = [
    {
        request: {
            query: TOGGLE_REACTION,
            variables: {

            },
            refetchQueries: [{ query: TWEET, variables: { id: "cl084xdy815761s0n5omoxoem0" } }],
        },
        result: {
            data: {

            },
            errors: "An error occurred",
        },
    }
]


const tags = {
    searchByTag: [
        {
            id: "cl084xdy815761s0n5omoxoem0",
            text: "testing after changes in input converted to ts",
            tags: [],
            isTweetMine: true,
            commentsCount: 1,
            retweetsCount: 0,
            isRetweet: false,
            tipsCount: "0",
            createdAt: "1646139451616",
            parentTweet: null,
            files: [],
            gif: null,
            nft: null,
            user: {
                id: "ckzny1iv10031lmn568gj3b3n",
                publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
                avatar: "",
                handle: "shy-cloud-4965",
                consumerName: "shy-cloud-4965",
                __typename: "User",
            },
            reactions: [
                {
                    id: "cl0c774p371312s0n533u0b29k",
                    emojiId: "+1",
                    skin: 1,
                    isMine: true,
                    count: 1,
                    __typename: "Reaction",
                },
            ],
            __typename: "Tweet",
        }

    ]
};



const tweets = {
    searchByTweet: [
        {
            id: "cl084xdy815761s0n5omoxoem0",
            text: "testing after changes in input converted to ts",
            tags: [],
            isTweetMine: true,
            commentsCount: 1,
            retweetsCount: 0,
            isRetweet: false,
            tipsCount: "0",
            createdAt: "1646139451616",
            parentTweet: null,
            files: [],
            gif: null,
            nft: null,
            user: {
                id: "ckzny1iv10031lmn568gj3b3n",
                publicAddress: "JBZ52cKhHiFJdzQBNWnp3Xy2jHgDgkhWwSLWoNgLNxD4",
                avatar: "",
                handle: "shy-cloud-4965",
                consumerName: "shy-cloud-4965",
                __typename: "User",
            },
            reactions: [
                {
                    id: "cl0c774p371312s0n533u0b29k",
                    emojiId: "+1",
                    skin: 1,
                    isMine: true,
                    count: 1,
                    __typename: "Reaction",
                },
            ],
            __typename: "Tweet",
        }

    ]
};

const users = {searchByUser:[
    {
        id: "ckzny1iv10031lmn568gj3b3n",
        handle: "shy-cloud-4965",
        avatar: "",
        isFollowing: false,
        isSelf: true,
        consumerName: "shy-cloud-4965",
        bio: "full stack developer",
        __typename: "User",
      }

]};


describe("Search :", () => {

    describe("TWEETS Result:", () => {
        test("display <SearchResult/> component when Tweets undefined", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={[]}
                    tweets={undefined} />,
                {}
            );
            fireEvent.click(tree.getByText("Tweets"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when Tweets loading", () => {
            const tree = render(
                <SearchResult searchTweetLoading={true}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={[]}
                    tweets={undefined} />,
                {}
            );
            fireEvent.click(tree.getByText("Tweets"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when Tweets not found", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={[]}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Tweets"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when tweets list found", () => {
            const tree = render(
                <MockedProvider mocks={__mocks__} addTypename={false}>
                    <SnackbarProvider>
                        <SearchResult searchTweetLoading={false}
                            searchUserLoading={false}
                            searchTagLoading={false}
                            tags={[]}
                            users={[]}
                            tweets={tweets} />
                    </SnackbarProvider>
                </MockedProvider>, { wrapper: MemoryRouter }
            )
            fireEvent.click(tree.getByText("Tweets"));
            expect(tree.asFragment()).toMatchSnapshot();
        });
    });

    describe("TAGS Result:", () => {
        test("display <SearchResult/> component when Tags undefined", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={undefined}
                    users={[]}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Tags"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when Tags loading", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={true}
                    tags={undefined}
                    users={[]}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Tags"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when Tags not found", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={[]}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Tags"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when tweets list found", () => {
            const tree = render(
                <MockedProvider mocks={__mocks__} addTypename={false}>
                    <SnackbarProvider>
                        <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={tags}
                    users={[]}
                    tweets={[]} />
                    </SnackbarProvider>
                </MockedProvider>, { wrapper: MemoryRouter }
            )
            fireEvent.click(tree.getByText("Tags"));
            expect(tree.asFragment()).toMatchSnapshot();
        });
    });

    describe("Users Result:", () => {
        test("display <SearchResult/> component when users undefined", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={undefined}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Users"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when users loading", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={true}
                    searchTagLoading={false}
                    tags={[]}
                    users={undefined}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Users"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when users not found", () => {
            const tree = render(
                <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={[]}
                    tweets={[]} />,
                {}
            );
            fireEvent.click(tree.getByText("Users"));
            expect(tree.asFragment()).toMatchSnapshot();
        });

        test("display <SearchResult/> component when userss list found", () => {
            const tree = render(
                
                    <SnackbarProvider>
                        <SearchResult searchTweetLoading={false}
                    searchUserLoading={false}
                    searchTagLoading={false}
                    tags={[]}
                    users={users}
                    tweets={[]} />
                    </SnackbarProvider>
                , { wrapper: MemoryRouter }
            )
            fireEvent.click(tree.getByText("Users"));
            expect(tree.asFragment()).toMatchSnapshot();
        });
    });
});

