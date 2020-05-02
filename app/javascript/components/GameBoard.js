import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { LoadBoard } from "../redux/action/gameBoardAction";

const GameBoard = (props) => {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState({});

  //const history = useHistory();
  //if (props.userName == null) history.push("/");

  useEffect(() => {
    props.LoadBoard();
  }, []);

  const handleChange = (event) => {
    setWord(event.target.value);
  };
  const submitWord = (event) => {
    event.preventDefault();
    if (formIsValid()) {
      const clonedBoard = [].concat(props.board);
      let boardlist = clonedBoard.filter(
        (item) => item.value == word.charAt(0)
      );
      var wordFound = findword(boardlist, 1);
      console.log(boardlist);
      //var wordFound = checkIfWordValid(boardlist);
      if (wordFound) {
        console.log("found");
      } else console.log("not found");
    }
  };
  //   const checkIfWordValid = (wordslist) => {
  //     for (let item of wordslist) {
  //       if (item.level == word.length) {
  //         console.log(item.level);
  //         return true;
  //       } else if (item.validNeighbor.length > 0) {
  //         return checkIfWordValid(item.validNeighbor);
  //       }
  //     }
  //   };
  const findword = (list, nextletterindex) => {
    for (let item of list) {
      item.validNeighbor = getValidNeighbour(
        item,
        word.charAt(nextletterindex)
      );
      item.level = nextletterindex;
      if (item.level == word.length) {
        console.log(item.level);
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
    const clonedBoard1 = [].concat(props.board);
    return clonedBoard1
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
  const formIsValid = () => {
    const errors = {};

    if (!word || word.trim() == "") errors.word = "Please enter word";
    else if (word.trim().length < 3) errors.word = "Invalid word";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
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
            {errors.word && <div className="text-danger">{errors.word}</div>}
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
