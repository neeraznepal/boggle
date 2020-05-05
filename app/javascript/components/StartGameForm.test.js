import React from "react";
import StartGameForm from "./StartGameForm";
import { shallow } from "enzyme";

function renderStartGameForm(args) {
  const defaultProps = {
    handleTextChange: () => {},
    formSubmit: () => {},
    formErrors: {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<StartGameForm {...props} />);
}

it("has a submit button", () => {
  const wrapper = renderStartGameForm();
  expect(wrapper.find("input[type='submit']").length).toBe(1);
});

it("displays error when set", () => {
  const wrapper = renderStartGameForm({
    formErrors: { userName: "Enter username" },
  });
  expect(wrapper.find(".text-danger").length).toBe(1);
  expect(wrapper.find(".text-danger").text()).toBe("Enter username");
});
