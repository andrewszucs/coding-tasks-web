import { Country, ApiServiceError, CountryDetail, User } from "./apiService";
import { LoginRequestParams } from "../store/actions/loginAsync";

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

export interface ValueState {
  value: number;
  selectedCountry: string | null;
}

export interface LoginState {
  loggedInUser: User | null;
  isLoadingLogin: boolean;
  errorLogin: ApiServiceError | null;
}

/// Fetch Countries

export const FETCH_COUNTRIES_REQUEST = "FETCH_COUNTRIES_REQUEST";
export const FETCH_COUNTRIES_FULFILLED = "FETCH_COUNTRIES_FULFILLED";
export const FETCH_COUNTRIES_FAILED = "FETCH_COUNTRIES_FAILED";

interface FetchCountriesRequestActionType {
  type: typeof FETCH_COUNTRIES_REQUEST;
  payload: {
    name: string;
    token: string;
  };
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
  payload: {
    code: string;
    token: string;
  };
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

/// Login

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_FAILED = "LOGIN_FAILED";

interface LoginRequestActionType {
  type: typeof LOGIN_REQUEST;
  payload: LoginRequestParams;
}

interface LoginFulfilledActionType {
  type: typeof LOGIN_FULFILLED;
  payload: User;
}

interface LoginFailedActionType {
  type: typeof LOGIN_FAILED;
  payload: ApiServiceError;
}

export type LoginActionTypes =
  | LoginRequestActionType
  | LoginFulfilledActionType
  | LoginFailedActionType;

/// Set Value

export const SET_VALUE = "SET_VALUE";

export interface SetValueActionType {
  type: typeof SET_VALUE;
  payload: number;
}

/// Set Selected Country

export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";

export interface SetSelectedCountryActionType {
  type: typeof SET_SELECTED_COUNTRY;
  payload: string | null;
}

export type SetValueActionTypes =
  | SetValueActionType
  | SetSelectedCountryActionType;
