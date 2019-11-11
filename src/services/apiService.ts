import { Country, CountryDetail, User, ApiServiceError } from "../types";
import { LoginRequestParams } from "../store/actions/loginAsync";
import { FetchCountriesRequestParams } from "../store/actions/fetchCountriesAsync";
import { FetchCountryDetailRequestParams } from "../store/actions/fetchCountryDetailsAsync";

export type Fetch = (url: string, options?: object) => Promise<Response>;

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export default function createApiService(fetch: Fetch) {
  return {
    login({ name, password }: LoginRequestParams) {
      const base64EncodedUsernameAndPassword = new Buffer(
        `${name}:${password}`
      ).toString("base64");
      return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64EncodedUsernameAndPassword}`,
          "Client-Id": CLIENT_ID
        }
      })
        .then(res =>
          Promise.all([res.ok, res.statusText, res.json(), res.headers])
        )
        .then(([ok, _, json, headers]) => {
          if (!ok) {
            throw json as ApiServiceError;
          }
          return {
            ...json.data,
            token: headers.get("Authorization")
          } as User;
        });
    },
    getCountries({ name, token }: FetchCountriesRequestParams) {
      return fetch(`${BASE_URL}/country?search=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => Promise.all([res.ok, res.statusText, res.json()]))
        .then(([ok, _, json]) => {
          if (!ok) {
            throw json as ApiServiceError;
          }
          return json.result as Country[];
        });
    },
    getCountryDetail({ code, token }: FetchCountryDetailRequestParams) {
      return fetch(`${BASE_URL}/country/${code}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => Promise.all([res.ok, res.statusText, res.json()]))
        .then(([ok, _, json]) => {
          if (!ok) {
            throw json as ApiServiceError;
          }
          return json.result as CountryDetail;
        });
    }
  };
}
