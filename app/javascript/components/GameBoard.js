import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  LoadBoard,
  ValidateWord,
  WordValidated,
} from "../redux/action/gameBoardAction";

const GameBoard = (props) => {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState({});

  //const history = useHistory();
  //if (props.userName == null) history.push("/");

  useEffect(() => {
    props.LoadBoard();
  }, []);

  const handleChange = (event) => {
    setErrors({});
    setWord(event.target.value.toUpperCase());
  };
  const submitWord = (event) => {
    event.preventDefault();
    if (formIsValid()) {
      const errors = {};
      const wordalreadyselected =
        props.scores.filter((item) => item.word == word).length > 0;
      if (wordalreadyselected) {
        errors.word = "Invalid word";
        setErrors(errors);
        return;
      }
      let boardlist = getCleanBoardItem().filter(
        (item) => item.value == word.charAt(0)
      );
      let wordFound = findword(boardlist, 1);
      if (wordFound) {
        ValidateWord(word)
          .then((response) => response.json())
          .then((data) => {
            if (!data.success) {
              errors.word = "Invalid word";
              setErrors(errors);
            } else {
              props.WordValidated(word);
              setWord("");
            }
          })
          .catch((error) => {
            throw error;
          });
      } else {
        errors.word = "Invalid word";
        setErrors(errors);
      }
    }
  };
  const findword = (list, nextletterindex) => {
    for (let item of list) {
      item.validNeighbor = getValidNeighbour(
        item,
        word.charAt(nextletterindex)
      );
      item.level = nextletterindex;
      if (item.level == word.length) {
        return true;
      }

      if (item.validNeighbor.length > 0) {
        if (nextletterindex < word.length) {
          return findword(item.validNeighbor, nextletterindex + 1);
        }
      }
    }
  };
  const getValidNeighbour = (current, nextletter) => {
    if (current.excludeItems == undefined) current.excludeItems = [];
    let excludeItems = [...current.excludeItems];
    excludeItems.push(current);
    const clonedBoard = Object.assign([], props.board);
    return clonedBoard
      .filter((item) => {
        return (
          item.value == nextletter &&
          current.excludeItems.filter(
            (exitem) => exitem.row == item.row && exitem.column == item.column
          ).length == 0 &&
          ((Math.abs(item.row - current.row) == 1 &&
            Math.abs(item.column - current.column) == 1) ||
            (Math.abs(item.row - current.row) == 1 &&
              Math.abs(item.column - current.column) == 0) ||
            (Math.abs(item.row - current.row) == 0 &&
              Math.abs(item.column - current.column) == 1))
        );
      })
      .map((item) => {
        item.excludeItems = excludeItems;
        return item;
      });
  };
  const getCleanBoardItem = () => {
    const clonedBoard = Object.assign([], props.board);
    return clonedBoard.map((item) => {
      return { row: item.row, column: item.column, value: item.value };
    });
  };
  const getTotalScore = () => {
    return props.scores.length == 0
      ? 0
      : props.scores.map((item) => item.score).reduce((sum, x) => sum + x);
  };
  const formIsValid = () => {
    const errors = {};

    if (!word || word.trim() == "") errors.word = "Please enter word";
    else if (word.trim().length < 3) errors.word = "Invalid word";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };
  const textUpperCaseStyles = {
    textTransform: "uppercase",
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
        <div className="col-md-4">
          <form onSubmit={submitWord}>
            <h3>Enter Word</h3>
            <input
              style={textUpperCaseStyles}
              type="text"
              onChange={handleChange}
              value={word}
            />
            <input type="submit" value="Submit" />
            {errors.word && <div className="text-danger">{errors.word}</div>}
          </form>
        </div>
        <div className="col-md-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Word</th>
                <th>Score</th>
              </tr>
            </thead>
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
                <th>{getTotalScore()}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userName: state.home.userName,
    board: state.gameboard.data,
    scores: state.gameboard.scores,
  };
}
const mapDispatchToProps = {
  LoadBoard,
  WordValidated,
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
