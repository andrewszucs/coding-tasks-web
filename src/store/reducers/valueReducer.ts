import {
  ValueState,
  SetValueActionTypes,
  SET_VALUE,
  SET_SELECTED_COUNTRY,
  SetValueActionType,
  SetSelectedCountryActionType
} from "../../types";

const initialState: ValueState = {
  value: 0,
  selectedCountry: null
};

export function valueReducer(
  state = initialState,
  action: SetValueActionTypes
): ValueState {
  switch (action.type) {
    case SET_VALUE:
      return {
        ...state,
        value: action.payload
      };
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload
      };
    default:
      return state;
  }
}
