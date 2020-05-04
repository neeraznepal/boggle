import * as types from "./actionType";
export function SetUser(userName) {
  return { type: types.SET_USER, userName: userName };
}

export function GetHighestScorers() {
  return fetch("/score/list");
}
