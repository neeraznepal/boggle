import homeReducer from "./homeReducer";
import * as actions from "../action/homeAction";

it("should set user when passed SET_USER", () => {
  // arrange
  const initialState = { userName: null };

  const userName = "Player 1";

  const action = actions.SetUser(userName);

  // act
  const newState = homeReducer(initialState, action);

  // assert
  expect(newState.userName).toEqual(userName);
});
