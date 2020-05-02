import * as types from "../action/actionType";
import initialState from "./initialState";

export default function gameBoardReducer(state = initialState.board, action) {
  switch (action.type) {
    case types.LOAD_BOARD:
      return { data: action.data };
    default:
      return state;
  }
}
