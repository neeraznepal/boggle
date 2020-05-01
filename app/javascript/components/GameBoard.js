import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { LoadBoard } from "../redux/action/gameBoardAction";

const GameBoard = (props) => {
  const history = useHistory();
  if (props.userName == null) history.push("/");

  useEffect(() => {
    props.LoadBoard();
  }, []);

  const handleChange = (event) => {};
  const submitWord = (event) => {
    event.preventDefault();
  };
  return (
    <div className="jumbotron">
      <h1>Boggle</h1>
      <p>Best of luck, {props.userName}</p>
      <div className="row">
        <div className="col-md-4">
          <table className="table table-bordered">
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
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <form onSubmit={submitWord}>
            <h3>Enter Word</h3>
            <input type="text" onChange={handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userName: state.home.userName,
    board: state.gameboard.data,
  };
}
const mapDispatchToProps = {
  LoadBoard,
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
