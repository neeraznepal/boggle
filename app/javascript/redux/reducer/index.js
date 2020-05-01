import { combineReducers } from "redux";
import home from "./homeReducer";
import gameboard from "./gameBoardReducer";

const rootReducer = combineReducers({
  home,
  gameboard,
});

export default rootReducer;
