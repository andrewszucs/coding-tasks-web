import { from, of } from "rxjs";
import { ofType, Epic } from "redux-observable";
import { map, catchError, switchMap } from "rxjs/operators";
import { Services } from "../../services";
import {
  LoginActionTypes,
  LoginState,
  LOGIN_REQUEST,
  ApiServiceError
} from "../../types";
import {
  LoginRequestParams,
  loginFulfilled,
  loginFailed
} from "../actions/loginAsync";

const fetchCountries: Epic<
  LoginActionTypes,
  LoginActionTypes,
  LoginState,
  Services
> = (action$, _, { apiService, localStorageService }) =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    switchMap(action =>
      from(apiService.login(action.payload as LoginRequestParams)).pipe(
        map(user => {
          localStorageService.setUser(user);
          return user;
        }),
        map(loginFulfilled),
        catchError((error: ApiServiceError) => of(loginFailed(error)))
      )
    )
  );

export default fetchCountries;
