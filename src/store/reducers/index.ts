import { combineReducers } from "redux";
import { countrySuggestionsReducer } from "./countrySuggestionsReducer";
import { countryShortlistReducer } from "./countryShortlistReducer";
import { valueReducer } from "./valueReducer";
import { loginReducer } from "./loginReducer";

const rootReducer = combineReducers({
  countrySuggestions: countrySuggestionsReducer,
  countryShortlist: countryShortlistReducer,
  values: valueReducer,
  login: loginReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
