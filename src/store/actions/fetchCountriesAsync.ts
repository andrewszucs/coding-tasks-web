import {
  FetchCountriesActionTypes,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FULFILLED,
  Country,
  FETCH_COUNTRIES_FAILED,
  ApiServiceError
} from "../../types";

export interface FetchCountriesRequestParams {
  name: string;
  token: string;
}

export function fetchCountriesRequest({
  name,
  token
}: FetchCountriesRequestParams): FetchCountriesActionTypes {
  return {
    type: FETCH_COUNTRIES_REQUEST,
    payload: {
      name,
      token
    }
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
