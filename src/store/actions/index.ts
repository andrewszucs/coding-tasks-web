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

export { fetchCountriesRequest, fetchCountriesFulfilled, fetchCountriesFailed };

export type FetchCountriesRequestType = typeof fetchCountriesRequest;

export {
  fetchCountryDetailRequest,
  fetchCountryDetailFulfilled,
  fetchCountryDetailFailed
};

export type FetchCountryDetailRequestType = typeof fetchCountryDetailRequest;
