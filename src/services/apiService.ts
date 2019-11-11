import { Country, CountryDetail, User, ApiServiceError } from "../types";
import { LoginRequestParams } from "../store/actions/loginAsync";

export type Fetch = (url: string, options?: object) => Promise<Response>;

const BASE_URL = `http://localhost:8080/api`;
const CLIENT_ID = "Coding-Tasks-Client";

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
    getCountries(name: string) {
      return fetch(`${BASE_URL}/country?search=${name}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjF4Z3pQdG1YIiwiaWF0IjoxNTczNDAwNjQ4LCJleHAiOjE1NzU5OTI2NDgsImF1ZCI6IlBvc3RtYW4iLCJpc3MiOiJzZXJ2ZXIiLCJzdWIiOiJhbmRyZXdzenVjcyJ9.it0N8SDU2xolT11x_ZynCwrJWu0gAC4HVsYWbQD1p-FjeGrB-I2LiFXn4a4V23Z36CL8ccRVmyYvki3IzBubVcWBmRMDcQcaMYj7KHoeVp-mnoYw24emwOA6QXok9zVs_c5Dnb9X319RGMXxOHLYHLuNvf16UwfbX85mqMI6bxcpzNT2EYhkKsjt93ko28BIHwiTp64Bil8VifagfHqt-UtVufaS5uJvjxmBE7ND8HyKiyIax-GnUSw0u4-1tmcSB-CttR9PQ2XZpAv7OOkmB0QgA7tIAhR6IQjGxO70TGKGKCLEJ6ax99NfKGSAPe5Zom1uUQSu_rVFhFCxuIQy7X3zpUKbM4ntiK3WnU3VHoOHyY5RqgmsHqcrKDPVPd32d71i-6I-Cx5l3dLWR9t4_urQw-qaot2t7G1LkxmC-N5eb_2OJ6qhw8CUk6f0Iowr7fexuxVKor5JlY56Pm69EZEasso7GFL-n8A2t4YTeqSuR5d_TFKT-y55VFW2-I-X9tvz87CriEgFjjbL9zV1tclkqgd5ZFi37h_GmtEJOPck-w4z2NMEmSJH9gMWNc5ysLK8WaLiS1u6-LtvmVmz-2ZUgb0hK2Yv8lWGRwMuxiQlvNN-ogsRoeD4N6dSH6SWJQuQXWMnQ65v2oKzV4Q-9aZ9YWMZmD5MbUHPh-0yZv0`
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
    getCountryDetail(code: string) {
      return fetch(`${BASE_URL}/country/${code}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjF4Z3pQdG1YIiwiaWF0IjoxNTczNDAwNjQ4LCJleHAiOjE1NzU5OTI2NDgsImF1ZCI6IlBvc3RtYW4iLCJpc3MiOiJzZXJ2ZXIiLCJzdWIiOiJhbmRyZXdzenVjcyJ9.it0N8SDU2xolT11x_ZynCwrJWu0gAC4HVsYWbQD1p-FjeGrB-I2LiFXn4a4V23Z36CL8ccRVmyYvki3IzBubVcWBmRMDcQcaMYj7KHoeVp-mnoYw24emwOA6QXok9zVs_c5Dnb9X319RGMXxOHLYHLuNvf16UwfbX85mqMI6bxcpzNT2EYhkKsjt93ko28BIHwiTp64Bil8VifagfHqt-UtVufaS5uJvjxmBE7ND8HyKiyIax-GnUSw0u4-1tmcSB-CttR9PQ2XZpAv7OOkmB0QgA7tIAhR6IQjGxO70TGKGKCLEJ6ax99NfKGSAPe5Zom1uUQSu_rVFhFCxuIQy7X3zpUKbM4ntiK3WnU3VHoOHyY5RqgmsHqcrKDPVPd32d71i-6I-Cx5l3dLWR9t4_urQw-qaot2t7G1LkxmC-N5eb_2OJ6qhw8CUk6f0Iowr7fexuxVKor5JlY56Pm69EZEasso7GFL-n8A2t4YTeqSuR5d_TFKT-y55VFW2-I-X9tvz87CriEgFjjbL9zV1tclkqgd5ZFi37h_GmtEJOPck-w4z2NMEmSJH9gMWNc5ysLK8WaLiS1u6-LtvmVmz-2ZUgb0hK2Yv8lWGRwMuxiQlvNN-ogsRoeD4N6dSH6SWJQuQXWMnQ65v2oKzV4Q-9aZ9YWMZmD5MbUHPh-0yZv0`
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
