import * as types from "../action/actionType";
import initialState from "./initialState";

export default function gameBoardReducer(state = initialState.board, action) {
  switch (action.type) {
    case types.LOAD_BOARD:
      return { ...state, data: action.data };
    case types.WORD_VALIDATED:
      let newstate = { ...state };
      newstate.scores.push({ word: action.word, score: action.word.length });
      return newstate;
    default:
      return state;
  }
}
