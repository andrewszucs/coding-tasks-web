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

export default fetchCountries;
