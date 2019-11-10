import {
  CountrySuggestionsState,
  FetchCountriesActionTypes,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FULFILLED,
  FETCH_COUNTRIES_FAILED
} from "../../types";

const initialState: CountrySuggestionsState = {
  countrySuggestions: [],
  isLoadingCountrySuggestions: false,
  errorCountrySuggestions: null
};

export function countrySuggestionsReducer(
  state = initialState,
  action: FetchCountriesActionTypes
): CountrySuggestionsState {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        isLoadingCountrySuggestions: true
      };
    case FETCH_COUNTRIES_FULFILLED:
      return {
        countrySuggestions: action.payload,
        isLoadingCountrySuggestions: false,
        errorCountrySuggestions: null
      };
    case FETCH_COUNTRIES_FAILED:
      return {
        countrySuggestions: [],
        isLoadingCountrySuggestions: false,
        errorCountrySuggestions: action.payload
      };
    default:
      return state;
  }
}
