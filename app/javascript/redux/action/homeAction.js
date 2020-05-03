import * as types from "./actionType";
export function SetUser(userName) {
  return { type: types.SET_USER, userName: userName };
}
export function HighestScorerLoaded(highestScorers) {
  return { type: types.HIGHEST_SCORER_LOADED, highestScorers: highestScorers };
}

export function GetHighestScorers() {
  return function (dispatch) {
    return fetch("/score/list")
      .then((response) => response.json())
      .then((data) => {
        dispatch(HighestScorerLoaded(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}
