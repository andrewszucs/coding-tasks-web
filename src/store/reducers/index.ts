import { combineReducers } from "redux";
import { countrySuggestionsReducer } from "./countrySuggestionsReducer";
import { countryShortlistReducer } from "./countryShortlistReducer";

const rootReducer = combineReducers({
  countrySuggestions: countrySuggestionsReducer,
  countryShortlist: countryShortlistReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
