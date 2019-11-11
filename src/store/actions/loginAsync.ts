import {
  LoginActionTypes,
  ApiServiceError,
  LOGIN_REQUEST,
  LOGIN_FULFILLED,
  LOGIN_FAILED,
  User
} from "../../types";

export interface LoginRequestParams {
  name: string;
  password: string;
}

export function loginRequest({
  name,
  password
}: LoginRequestParams): LoginActionTypes {
  return {
    type: LOGIN_REQUEST,
    payload: {
      name,
      password
    }
  };
}

export function loginFulfilled(response: User): LoginActionTypes {
  return {
    type: LOGIN_FULFILLED,
    payload: response
  };
}

export function loginFailed(error: ApiServiceError): LoginActionTypes {
  return {
    type: LOGIN_FAILED,
    payload: error
  };
}
