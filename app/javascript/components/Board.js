import React from "react";
import PropTypes from "prop-types";

const Board = (props) => {
  return (
    <div className="card">
      <table className="table table-bordered text-center m-0">
        <tbody>
          <tr>
            {props.board
              .filter((item) => item.row == 1)
              .map((item, index) => {
                return <td key={index + "1"}>{item.value}</td>;
              })}
          </tr>
          <tr>
            {props.board
              .filter((item) => item.row == 2)
              .map((item, index) => {
                return <td key={index + "1"}>{item.value}</td>;
              })}
          </tr>
          <tr>
            {props.board
              .filter((item) => item.row == 3)
              .map((item, index) => {
                return <td key={index + "1"}>{item.value}</td>;
              })}
          </tr>
          <tr>
            {props.board
              .filter((item) => item.row == 4)
              .map((item, index) => {
                return <td key={index + "1"}>{item.value}</td>;
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
};
export default Board;
