import React from "react";
import HighScorers from "./HighScorers";
import { shallow } from "enzyme";

function renderHighScorers(args) {
  const defaultProps = {
    highestScorers: [
      { id: 1, user: "Player 1", point: 20 },
      { id: 2, user: "Player 2", point: 10 },
    ],
    highestScorerLoaded: true,
  };

  const props = { ...defaultProps, ...args };
  return shallow(<HighScorers {...props} />);
}

it("generates 2 high scorers", () => {
  const wrapper = renderHighScorers();
  expect(wrapper.find("tbody tr").length).toBe(2);
});
