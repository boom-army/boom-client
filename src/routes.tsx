import React from "react";
import { AccountsProvider } from "./contexts/accounts";
import { AppHeader } from "./components/AppHeader";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { EditProfile } from "./components/Profile/EditProfile";
import { Home, Suggestion, Nav, Explore, Notifications } from "./views";
import { MarketProvider } from "./contexts/market";
import { MasterTweet } from "./components/Tweet/MasterTweet";
import { Profile } from "./components/Profile/Profile";
import { Wallet } from "./contexts/wallet";
import { makeStyles, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export function Routes() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter basename={"/"}>
          <Wallet>
            <AccountsProvider>
              <MarketProvider>
                <AppHeader />
                <main className={classes.content}>
                  <div className={classes.appBarSpacer} />
                  <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
                      <Grid direction="row" xs={2}>
                        <Nav />
                      </Grid>
                      <Grid direction="row" xs={7}>
                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/explore" component={Explore} />
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
                      <Grid direction="row" xs={3}>
                        <Suggestion />
                      </Grid>
                    </Grid>
                  </Container>
                </main>
              </MarketProvider>
            </AccountsProvider>
          </Wallet>
      </BrowserRouter>
    </div>
  );
}
