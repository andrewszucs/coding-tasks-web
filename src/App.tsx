import React from "react";
import { Router } from "@reach/router";
import LoginPage from "./pages/LoginPage";
import ExchangePage from "./pages/ExchangePage";
import ExchangeFlowPage from "./pages/ExchangeFlowPage";

import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";

import store from "./store";

// TODO: load token from localStorage as the initialState
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <LoginPage path="/login" />
        <ExchangePage path="/" />
        <ExchangeFlowPage path="/exchange" />
      </Router>
    </Provider>
  );
};

export default App;
