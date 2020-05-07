import * as homeActions from "./homeAction";
import * as types from "./actionType";

describe("setUser", () => {
  it("should create a SET_USER action", () => {
    //arrange
    const userName = "Player 1";
    const expectedAction = {
      type: types.SET_USER,
      userName,
    };

    //act
    const action = homeActions.SetUser(userName);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
