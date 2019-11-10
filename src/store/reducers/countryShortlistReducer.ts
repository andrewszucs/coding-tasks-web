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
  console.log(action);
  switch (action.type) {
    case FETCH_COUNTRY_DETAIL_REQUEST:
      return {
        ...state,
        isLoadingCountryDetail: true
      };
    case FETCH_COUNTRY_DETAIL_FULFILLED:
      return {
        countryShortlist: [...state.countryShortlist, action.payload],
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
