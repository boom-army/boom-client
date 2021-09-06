import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AccountsProvider } from "./contexts/accounts";
import { ConnectionProvider } from "./contexts/connection";
import { Home, Suggestion, Nav } from "./views";
import { MarketProvider } from "./contexts/market";
import { WalletProvider } from "./contexts/wallet";
import { makeStyles, Container, Grid } from "@material-ui/core";
import { AppHeader } from "./components/AppHeader";

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
        <ConnectionProvider>
          <WalletProvider>
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
          </WalletProvider>
        </ConnectionProvider>
      </BrowserRouter>
    </div>
  );
}
