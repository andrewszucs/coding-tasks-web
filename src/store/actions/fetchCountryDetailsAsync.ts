import {
  FetchCountryDetailActionTypes,
  FETCH_COUNTRY_DETAIL_REQUEST,
  CountryDetail,
  FETCH_COUNTRY_DETAIL_FULFILLED,
  ApiServiceError,
  FETCH_COUNTRY_DETAIL_FAILED
} from "../../types";

export function fetchCountryDetailRequest(
  name: string
): FetchCountryDetailActionTypes {
  return {
    type: FETCH_COUNTRY_DETAIL_REQUEST,
    payload: name
  };
}

export function fetchCountryDetailFulfilled(
  response: CountryDetail
): FetchCountryDetailActionTypes {
  return {
    type: FETCH_COUNTRY_DETAIL_FULFILLED,
    payload: response
  };
}

export function fetchCountryDetailFailed(
  error: ApiServiceError
): FetchCountryDetailActionTypes {
  return {
    type: FETCH_COUNTRY_DETAIL_FAILED,
    payload: error
  };
}
