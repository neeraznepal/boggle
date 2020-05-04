import * as types from "../action/actionType";
import initialState from "./initialState";

export default function homeReducer(state = initialState.home, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, userName: action.userName };
    default:
      return state;
  }
}
