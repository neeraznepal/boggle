import gameReducer from "./gameReducer";
import * as actions from "../action/gameAction";

it("should load board items when passed LOAD_BOARD", () => {
  // arrange
  const initialState = { data: [] };

  const action = actions.LoadBoard();

  // act
  const newState = gameReducer(initialState, action);

  // assert
  expect(newState.data.length).toEqual(16);
});

it("should add score item when passed WORD_VALIDATED", () => {
  // arrange
  const initialState = { scores: [] };

  const word = "Play";

  const action = actions.WordValidated(word);

  // act
  const newState = gameReducer(initialState, action);

  // assert
  expect(newState.scores.length).toEqual(1);
  expect(newState.scores[0].word).toEqual(word);
  expect(newState.scores[0].score).toEqual(word.length);
});
