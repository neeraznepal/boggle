import { createStore } from "redux";
import rootReducer from "./reducer";
import initialState from "./reducer/initialState";
import * as homeActions from "./action/homeAction";

it("Should handle setting user", function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const user = "Player 1";

  // act
  const action = homeActions.SetUser(user);
  store.dispatch(action);

  // assert
  const userSet = store.getState().home.userName;
  expect(userSet).toEqual(user);
});
