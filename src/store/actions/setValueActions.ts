import { SetValueActionType, SET_VALUE } from "../../types";

import {
  SetSelectedCountryActionType,
  SET_SELECTED_COUNTRY
} from "../../types";

export function setValue(value: number): SetValueActionType {
  return {
    type: SET_VALUE,
    payload: value
  };
}

export function setSelectedCountry(
  code: string | null
): SetSelectedCountryActionType {
  return {
    type: SET_SELECTED_COUNTRY,
    payload: code
  };
}
