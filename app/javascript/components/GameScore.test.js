import React from "react";
import GameScore from "./GameScore";
import { shallow } from "enzyme";

function renderGameScore(args) {
  const defaultProps = {
    scores: [],
    getTotalScore: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<GameScore {...props} />);
}

it("hides score header with no scores list", () => {
  const wrapper = renderGameScore();
  expect(wrapper.find("thead").length).toBe(0);
});

it("display total score on footer of table", () => {
  const wrapper = renderGameScore({
    getTotalScore: () => {
      return 10;
    },
  });
  expect(wrapper.find("tfoot tr th").at(1).text()).toBe("10");
});
