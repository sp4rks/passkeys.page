import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import Tokens from "../pages/tokens";

export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tokens" component={Tokens} />
    </Switch>
);