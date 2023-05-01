import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_API || "http://locahost:7777",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
    possibleTypes: {
      Tweet: ["ParentTweet"],
    },
    typePolicies: {
      Query: {
        fields: {
          feed: offsetLimitPagination(),
          heroFeed: offsetLimitPagination(),
          getChannelById: offsetLimitPagination(),
          users: offsetLimitPagination(),
          searchTweets: offsetLimitPagination(),
          searchUser: offsetLimitPagination(),
          mentions: offsetLimitPagination(),
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      context: async ({ req }: any) => {
        const token = req?.headers?.authorization || null;
        const user = token ? localStorage.getItem("user")?.toString() : null;
        return { user, isLoggedIn: !!token };
      },
    },
  },
});
