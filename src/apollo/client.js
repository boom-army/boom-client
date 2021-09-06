import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_APOLLO_API || "http://locahost:7777",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  context: async ({ req }) => {
    const token = req?.headers?.authorization || null;
    const user = token ? JSON.parse(localStorage.getItem("user")) : null;
    return { user, isLoggedIn: !!token };
  },
});
