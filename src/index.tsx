import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import React from "react";
import { client } from "./apollo/client";
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from "./contexts/theme";
import { render } from "react-dom";

const RootApp = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

render(<RootApp />, document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
