import {
  LoginState,
  LoginActionTypes,
  LOGIN_REQUEST,
  LOGIN_FULFILLED,
  LOGIN_FAILED
} from "../../types";
import { localStorageService } from "../../services";

const initialState: LoginState = {
  loggedInUser: localStorageService.getUser(),
  isLoadingLogin: false,
  errorLogin: null
};

export function loginReducer(
  state = initialState,
  action: LoginActionTypes
): LoginState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoadingLogin: true
      };
    case LOGIN_FULFILLED:
      return {
        loggedInUser: action.payload,
        isLoadingLogin: false,
        errorLogin: null
      };
    case LOGIN_FAILED:
      return {
        loggedInUser: null,
        isLoadingLogin: false,
        errorLogin: action.payload
      };
    default:
      return state;
  }
}
