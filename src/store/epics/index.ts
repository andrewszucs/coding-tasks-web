import { combineEpics } from "redux-observable";
import fetchCountriesEpic from "./fetchCountriesEpic";
import fetchCountryDetailEpic from "./fetchCountryDetailEpic";

export default combineEpics(fetchCountriesEpic, fetchCountryDetailEpic);
