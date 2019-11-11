import {
  CountryShortlistState,
  FetchCountryDetailActionTypes,
  FETCH_COUNTRY_DETAIL_REQUEST,
  FETCH_COUNTRY_DETAIL_FULFILLED,
  FETCH_COUNTRY_DETAIL_FAILED
} from "../../types";

const initialState: CountryShortlistState = {
  countryShortlist: [],
  isLoadingCountryDetail: false,
  errorCountryDetail: null
};

export function countryShortlistReducer(
  state = initialState,
  action: FetchCountryDetailActionTypes
): CountryShortlistState {
  switch (action.type) {
    case FETCH_COUNTRY_DETAIL_REQUEST:
      return {
        ...state,
        isLoadingCountryDetail: true
      };
    case FETCH_COUNTRY_DETAIL_FULFILLED:
      return {
        countryShortlist:
          state.countryShortlist.findIndex(
            country => country.alpha3Code === action.payload.alpha3Code
          ) >= 0
            ? state.countryShortlist
            : [...state.countryShortlist, action.payload],
        isLoadingCountryDetail: false,
        errorCountryDetail: null
      };
    case FETCH_COUNTRY_DETAIL_FAILED:
      return {
        ...state,
        isLoadingCountryDetail: false,
        errorCountryDetail: action.payload
      };
    default:
      return state;
  }
}
