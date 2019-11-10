import {
  FetchCountriesActionTypes,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FULFILLED,
  Country,
  FETCH_COUNTRIES_FAILED,
  ApiServiceError
} from "../../types";

export function fetchCountriesRequest(name: string): FetchCountriesActionTypes {
  return {
    type: FETCH_COUNTRIES_REQUEST,
    payload: name
  };
}

export function fetchCountriesFulfilled(
  response: Country[]
): FetchCountriesActionTypes {
  return {
    type: FETCH_COUNTRIES_FULFILLED,
    payload: response
  };
}

export function fetchCountriesFailed(
  error: ApiServiceError
): FetchCountriesActionTypes {
  return {
    type: FETCH_COUNTRIES_FAILED,
    payload: error
  };
}
