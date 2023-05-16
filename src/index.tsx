// import * as serviceWorker from "./serviceWorker";
import "./index.css";
import "dayjs/locale/en-nz";
import * as Sentry from "@sentry/react";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { Integrations } from "@sentry/tracing";
import { client } from "./apollo/client";
import { createRoot } from "react-dom/client";

if (import.meta.env.VITE_ENV === "production") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5,
  });
}

const RootApp = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<RootApp />);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
