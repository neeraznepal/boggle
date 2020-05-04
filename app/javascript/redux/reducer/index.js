import { combineReducers } from "redux";
import home from "./homeReducer";
import game from "./gameReducer";

const rootReducer = combineReducers({
  home,
  game,
});

export default rootReducer;
