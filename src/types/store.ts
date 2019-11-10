import { Country, ApiServiceError, CountryDetail } from "./apiService";

/// State

export interface CountrySuggestionsState {
  countrySuggestions: Country[];
  isLoadingCountrySuggestions: boolean;
  errorCountrySuggestions: ApiServiceError | null;
}

export interface CountryShortlistState {
  countryShortlist: CountryDetail[];
  isLoadingCountryDetail: boolean;
  errorCountryDetail: ApiServiceError | null;
}

/// Fetch Countries

export const FETCH_COUNTRIES_REQUEST = "FETCH_COUNTRIES_REQUEST";
export const FETCH_COUNTRIES_FULFILLED = "FETCH_COUNTRIES_FULFILLED";
export const FETCH_COUNTRIES_FAILED = "FETCH_COUNTRIES_FAILED";

interface FetchCountriesRequestActionType {
  type: typeof FETCH_COUNTRIES_REQUEST;
  payload: string;
}

interface FetchCountriesFulfilledActionType {
  type: typeof FETCH_COUNTRIES_FULFILLED;
  payload: Country[];
}

interface FetchCountriesFailedActionType {
  type: typeof FETCH_COUNTRIES_FAILED;
  payload: ApiServiceError;
}

export type FetchCountriesActionTypes =
  | FetchCountriesRequestActionType
  | FetchCountriesFulfilledActionType
  | FetchCountriesFailedActionType;

/// Fetch Country Detail

export const FETCH_COUNTRY_DETAIL_REQUEST = "FETCH_COUNTRY_DETAIL_REQUEST";
export const FETCH_COUNTRY_DETAIL_FULFILLED = "FETCH_COUNTRY_DETAIL_FULFILLED";
export const FETCH_COUNTRY_DETAIL_FAILED = "FETCH_COUNTRY_DETAIL_FAILED";

interface FetchCountryDetailRequestActionType {
  type: typeof FETCH_COUNTRY_DETAIL_REQUEST;
  payload: string;
}

interface FetchCountryDetailFulfilledActionType {
  type: typeof FETCH_COUNTRY_DETAIL_FULFILLED;
  payload: CountryDetail;
}

interface FetchCountryDetailFailedActionType {
  type: typeof FETCH_COUNTRY_DETAIL_FAILED;
  payload: ApiServiceError;
}

export type FetchCountryDetailActionTypes =
  | FetchCountryDetailRequestActionType
  | FetchCountryDetailFulfilledActionType
  | FetchCountryDetailFailedActionType;
