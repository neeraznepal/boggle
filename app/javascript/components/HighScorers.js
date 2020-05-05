import React from "react";
import PropTypes from "prop-types";

const HighScorers = (props) => {
  return (
    <>
      <h3>Highest Scorers</h3>
      <div className="card">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {props.highestScorers.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.user}</td>
                  <td>{item.point}</td>
                </tr>
              );
            })}
          </tbody>
          {props.highestScorers.length == 0 && props.highestScorerLoaded && (
            <tfoot>
              <tr>
                <th colSpan="2">No one has played the game yet</th>
              </tr>
            </tfoot>
          )}
          {!props.highestScorerLoaded && (
            <tfoot>
              <tr>
                <th colSpan="2">Loading...</th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

HighScorers.propTypes = {
  highestScorers: PropTypes.array.isRequired,
  highestScorerLoaded: PropTypes.bool.isRequired,
};
export default HighScorers;
