import * as gameActions from "./gameAction";
import * as types from "./actionType";

describe("loadBoard", () => {
  it("should create a LOAD_BOARD action", () => {
    //act
    const action = gameActions.LoadBoard();

    //assert
    expect(action.data.length).toEqual(16);
  });
});

describe("wordValidated", () => {
  it("should create a WORD_VALIDATED action", () => {
    //arrange
    const word = "Player";
    const expectedAction = {
      type: types.WORD_VALIDATED,
      word,
    };

    //act
    const action = gameActions.WordValidated(word);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
