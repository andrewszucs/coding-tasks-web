import { combineEpics } from "redux-observable";
import fetchCountriesEpic from "./fetchCountriesEpic";
import fetchCountryDetailEpic from "./fetchCountryDetailEpic";
import loginEpic from "./loginEpic";

export default combineEpics(
  loginEpic,
  fetchCountriesEpic,
  fetchCountryDetailEpic
);
