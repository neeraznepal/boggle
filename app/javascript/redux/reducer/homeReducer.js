import * as types from "../action/actionType";
import initialState from "./initialState";

export default function homeReducer(state = initialState.home, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, userName: action.userName };
    case types.HIGHEST_SCORER_LOADED:
      return { ...state, highestScorers: action.highestScorers };
    default:
      return state;
  }
}
