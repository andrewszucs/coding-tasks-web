import React from "react";
import { Router } from "@reach/router";
import LoginPage from "../pages/LoginPage";
import ExchangePage from "../pages/ExchangePage";
import ExchangeFlowPage from "../pages/ExchangeFlowPage";

import { CssBaseline } from "@material-ui/core";

// TODO: load token from localStorage as the initialState
const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <LoginPage path="/login" />
        <ExchangePage path="/" />
        <ExchangeFlowPage path="/exchange" />
      </Router>
    </>
  );
};

export default App;
