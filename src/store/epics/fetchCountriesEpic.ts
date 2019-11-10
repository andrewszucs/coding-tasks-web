// import { from, of } from "rxjs";
// import { filter, switchMap, map, catchError, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
// import { Epic } from "redux-observable";
// import { FetchCountriesActions, fetchCountriesAsync } from "../actions";
// import { RootState } from "../reducers";

// import { Services } from "../../services";

// const fetchCountriesEpic: Epic<
//   FetchCountriesActions,
//   FetchCountriesActions,
//   RootState,
//   Services
// > = (action$, _, { apiService }) =>
//   action$.pipe(
//     filter(isActionOf(fetchCountriesAsync.request)),
//     tap(value => console.log("Gonna fetch", value)),
//     switchMap(action =>
//       from(apiService.getCountries("Hun")).pipe(
//         map(fetchCountriesAsync.success),
//         catchError(message => of(fetchCountriesAsync.failure(message)))
//       )
//     )
//   );

// export default fetchCountriesEpic;

import { from, of } from "rxjs";
import { ofType, Epic } from "redux-observable";
import { map, catchError, switchMap } from "rxjs/operators";
import {
  FETCH_COUNTRIES_REQUEST,
  FetchCountriesActionTypes,
  CountrySuggestionsState,
  ApiServiceError
} from "../../types";
import { fetchCountriesFulfilled, fetchCountriesFailed } from "../actions";
import { Services } from "../../services";

const fetchCountries: Epic<
  FetchCountriesActionTypes,
  FetchCountriesActionTypes,
  CountrySuggestionsState,
  Services
> = (action$, _, { apiService }) =>
  action$.pipe(
    ofType(FETCH_COUNTRIES_REQUEST),
    switchMap(action =>
      from(apiService.getCountries(action.payload as string)).pipe(
        map(fetchCountriesFulfilled),
        catchError((error: ApiServiceError) => of(fetchCountriesFailed(error)))
      )
    )
  );

// {
//   return action$.pipe(
//     ofType(FETCH_COUNTRIES_REQUEST),
//     mergeMap(action =>
//       from(apiService.getCountries(action.payload as string)).pipe(
//         tap(value => console.log("Result", value)),
//         map(response => fetchCountriesFulfilled(response)),
//         catchError((error: ApiServiceError) => of(fetchCountriesFailed(error))),
//         takeUntil(
//           action$.pipe(
//             tap(value => console.log("CANCELLING!", value)),
//             ofType(FETCH_COUNTRIES_REQUEST)
//           )
//         )
//       )
//     )
//   );
// };

export default fetchCountries;
