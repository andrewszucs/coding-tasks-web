import {
  fetchCountriesRequest,
  fetchCountriesFulfilled,
  fetchCountriesFailed
} from "./fetchCountriesAsync";

import {
  fetchCountryDetailRequest,
  fetchCountryDetailFulfilled,
  fetchCountryDetailFailed
} from "./fetchCountryDetailsAsync";

import { loginRequest, loginFulfilled, loginFailed } from "./loginAsync";

import { setValue, setSelectedCountry } from "./setValueActions";

export { fetchCountriesRequest, fetchCountriesFulfilled, fetchCountriesFailed };

export type FetchCountriesRequestType = typeof fetchCountriesRequest;

export {
  fetchCountryDetailRequest,
  fetchCountryDetailFulfilled,
  fetchCountryDetailFailed
};

export type FetchCountryDetailRequestType = typeof fetchCountryDetailRequest;

export { loginRequest, loginFulfilled, loginFailed };
export type LoginRequestType = typeof loginRequest;

export { setValue, setSelectedCountry };
export type SetValueType = typeof setValue;
export type SetSelectedCountryType = typeof setSelectedCountry;
