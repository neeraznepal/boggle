import React from "react";
import { mount } from "enzyme";
import { Game } from "./Game";
import { MemoryRouter } from "react-router-dom";

function renderGame(args) {
  const defaultProps = {
    SetUser: () => {},
    userName: "Player 1",
    board: [],
    scores: [],
    LoadBoard: () => {},
    WordValidated: () => {},
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <MemoryRouter>
      <Game {...props} />
    </MemoryRouter>
  );
}

it("sets error when attempting to submit word with length 2", () => {
  const wrapper = renderGame();
  const wordInput = wrapper.find("input[type='text']").at(0);
  wordInput.instance().value = "ya";
  wordInput.simulate("change");
  wrapper.find("form").simulate("submit");
  expect(wrapper.find(".text-danger").length).toBe(1);
  expect(wrapper.find(".text-danger").text()).toBe("Invalid word");
});
