import {
  FetchCountryDetailActionTypes,
  FETCH_COUNTRY_DETAIL_REQUEST,
  CountryDetail,
  FETCH_COUNTRY_DETAIL_FULFILLED,
  ApiServiceError,
  FETCH_COUNTRY_DETAIL_FAILED
} from "../../types";

export interface FetchCountryDetailRequestParams {
  code: string;
  token: string;
}

export function fetchCountryDetailRequest({
  code,
  token
}: FetchCountryDetailRequestParams): FetchCountryDetailActionTypes {
  return {
    type: FETCH_COUNTRY_DETAIL_REQUEST,
    payload: {
      code,
      token
    }
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
