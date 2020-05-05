import React from "react";
import { mount } from "enzyme";
import { Home } from "./Home";
import { MemoryRouter } from "react-router-dom";

function renderHome(args) {
  const defaultProps = {
    SetUser: () => {},
    highestScorers: [
      { id: 1, user: "Player 1", point: 20 },
      { id: 2, user: "Player 2", point: 10 },
    ],
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  );
}

it("sets error when attempting to submit an empty user name field", () => {
  const wrapper = renderHome();
  wrapper.find("form").simulate("submit");
  expect(wrapper.find(".text-danger").length).toBe(1);
  expect(wrapper.find(".text-danger").text()).toBe("Please enter name");
});
