import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div className="card">
      <table className="table table-bordered">
        {props.scores.length > 0 && (
          <thead>
            <tr>
              <th>Word</th>
              <th>Score</th>
            </tr>
          </thead>
        )}
        <tbody>
          {props.scores.map((item) => {
            return (
              <tr key={item.word}>
                <td>{item.word}</td>
                <td>{item.score}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total Score</th>
            <th>{props.getTotalScore()}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

Board.propTypes = {
  scores: PropTypes.array.isRequired,
  getTotalScore: PropTypes.func.isRequired,
};
export default Board;
