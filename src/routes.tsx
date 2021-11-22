import React, { useContext } from "react";
import { AccountsProvider } from "./contexts/accounts";
import { AppHeader } from "./components/AppHeader";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { EditProfile } from "./components/Profile/EditProfile";
import { Home, Suggestion, Nav, ConnectView, Notifications, Following } from "./views";
import { MarketProvider } from "./contexts/market";
import { MasterTweet } from "./components/Tweet/MasterTweet";
import { Profile } from "./components/Profile/Profile";
import { Wallet } from "./contexts/wallet";
import { Container, Grid } from "@mui/material";
import { ThemeContext } from "./contexts/theme";
import { GiphyContextProvider } from "./contexts/giphy";

export function Routes() {
  const { theme } = useContext(ThemeContext);

  const middleColStyles = {
    borderRight: `1px solid ${theme.tertiaryColor}`,
    borderLeft: `1px solid ${theme.tertiaryColor}`,
  };

  return (
    <>
      <BrowserRouter basename={"/"}>
        <Wallet>
          <AccountsProvider>
            <MarketProvider>
              <GiphyContextProvider>
                <AppHeader />
                <Container maxWidth="lg">
                  <Grid container>
                    <Grid item xs={1} sm={1} md={2}>
                      <Nav />
                    </Grid>
                    <Grid item xs={7} sx={middleColStyles}>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/following" component={Following} />
                        <Route exact path="/connect" component={ConnectView} />
                        <Route
                          exact
                          path="/notifications"
                          component={Notifications}
                        />
                        <Route
                          exact
                          path={`/:handle/status/:tweetId`}
                          component={MasterTweet}
                        />
                        <Route
                          exact
                          path={`/settings/profile`}
                          component={EditProfile}
                        />
                        <Route exact path={`/:handle`} component={Profile} />
                        <Redirect from="*" to="/" />
                      </Switch>
                    </Grid>
                    <Grid item xs={3}>
                      <Suggestion />
                    </Grid>
                  </Grid>
                </Container>
              </GiphyContextProvider>
            </MarketProvider>
          </AccountsProvider>
        </Wallet>
      </BrowserRouter>
    </>
  );
}
