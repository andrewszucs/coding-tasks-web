import { createStore, applyMiddleware } from "redux";

import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";

import { composeWithDevTools } from "redux-devtools-extension";
import reducer, { AppState } from "./reducers";
import { localStorageService, apiService, Services } from "../services";
import {
  FetchCountriesActionTypes,
  FetchCountryDetailActionTypes
} from "../types";

type RootActions = FetchCountriesActionTypes | FetchCountryDetailActionTypes;

const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  AppState,
  Services
>({
  dependencies: { apiService, localStorageService }
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
