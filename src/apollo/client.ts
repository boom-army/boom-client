import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_API || "http://locahost:7777",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an instance of InMemoryCache with possibleTypes configuration
const cache = new InMemoryCache({
  // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-merge-function
  typePolicies: {
    User: {
      keyFields: ['id'],
      merge(existing, incoming) {
        return {
          ...existing,
          ...incoming,
        };
      },
    },
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
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache, // Use the configured InMemoryCache instance
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
