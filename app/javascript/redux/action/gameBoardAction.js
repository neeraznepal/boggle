import * as types from "./actionType";

export function LoadBoard() {
  const data = init();
  return { type: types.LOAD_BOARD, data: data };
}
export function WordValidated(word) {
  return { type: types.WORD_VALIDATED, word: word };
}
export function ValidateWord(word) {
  return fetch("/dictionary/validate?word=" + word);
}

const init = () => {
  const dice = [
    "ARELSC",
    "TABIYL",
    "EDNSWO",
    "BIOFXR",
    "MCDPAE",
    "IHFYEE",
    "KTDNUO",
    "MOQAJB",
    "ESLUPT",
    "INVTGE",
    "ZNDVAE",
    "UKGELY",
    "OCATAI",
    "ULGWIR",
    "SPHEIN",
    "MSHARO",
  ];
  const shuffledDice = shuffle(dice);
  let row = 1;
  let column = 1;
  let boarddata = [];
  for (let i = 0; i < shuffledDice.length; i++) {
    boarddata.push({
      row: row,
      column: column,
      value: shuffledDice[i].charAt(Math.round(Math.random() * 5)),
    });
    if (column == 4) {
      row++;
      column = 1;
    } else column++;
  }
  return boarddata;
};
const shuffle = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};
