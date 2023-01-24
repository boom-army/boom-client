import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const client = new ApolloClient({
  cache: new InMemoryCache({
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
  credentials: 'include',
  uri: process.env.REACT_APP_APOLLO_API || "http://locahost:7777",
  headers: {
    authorization: localStorage.getItem("token") || "",
    "Access-Control-Allow-Origin" : "*",
  },
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
