import React from "react";
import Home from "./Home";
import { shallow } from "enzyme";

function renderHome(args) {
  const defaultProps = {
    userName: null,
    SetUser: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return shallow(<Home {...props} />);
}

it("renders form", () => {
  const wrapper = renderHome();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
});
