import {
  ApolloClient,
  createHttpLink,
  split,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APOLLO_API || "http://locahost:7777/gql",
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

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_APOLLO_WS_API || "ws://localhost:7777/subscriptions",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache({
  typePolicies: {
    Tweet: {
      keyFields: ["id"],
      fields: {
        user: {
          merge(existing, incoming) {
            return {
              ...existing,
              ...incoming,
            };
          },
        },
      },
    },
    User: {
      keyFields: ["id"],
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
  link: authLink.concat(splitLink),
  cache,
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
