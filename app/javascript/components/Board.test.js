import React from "react";
import Board from "./Board";
import { shallow } from "enzyme";

function renderBoard(args) {
  const defaultProps = {
    board: [
      { row: 1, column: 1, value: "A" },
      { row: 1, column: 2, value: "B" },
      { row: 1, column: 3, value: "C" },
      { row: 1, column: 4, value: "D" },
      { row: 2, column: 1, value: "E" },
      { row: 2, column: 2, value: "F" },
      { row: 2, column: 3, value: "G" },
      { row: 2, column: 4, value: "H" },
      { row: 3, column: 1, value: "I" },
      { row: 3, column: 2, value: "J" },
      { row: 3, column: 3, value: "K" },
      { row: 3, column: 4, value: "L" },
      { row: 4, column: 1, value: "M" },
      { row: 4, column: 2, value: "N" },
      { row: 4, column: 3, value: "O" },
      { row: 4, column: 4, value: "P" },
    ],
  };

  const props = { ...defaultProps, ...args };
  return shallow(<Board {...props} />);
}

it("generates 4X4 board", () => {
  const wrapper = renderBoard();
  expect(wrapper.find("td").length).toBe(16);
});
