// import * as serviceWorker from "./serviceWorker";
import "./index.css";
import * as Sentry from "@sentry/react";
import OneSignal from "react-onesignal";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { Integrations } from "@sentry/tracing";
import { ThemeProvider } from "./contexts/theme";
import { client } from "./apollo/client";
import { render } from "react-dom";

if (process.env.REACT_APP_ENV !== "development") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

OneSignal.init({
  appId: process.env.REACT_APP_ONESIGNAL_APP_ID as string,
});
OneSignal.registerForPushNotifications();

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
