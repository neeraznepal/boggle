import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Board from "./Board";
import GameScore from "./GameScore";

import {
  LoadBoard,
  ValidateWord,
  WordValidated,
  SaveScore,
} from "../redux/action/gameAction";

export const Game = (props) => {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [clonedBoard, setClonedBoard] = useState([]);
  const history = useHistory();
  if (props.userName == null) history.push("/");
  let interval = null;

  useEffect(() => {
    props.LoadBoard();
    startTimer(120);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const startTimer = (duration) => {
    var timer = duration,
      minutes,
      seconds;
    interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTime(minutes + ":" + seconds);

      if (--timer < 0) {
        endGame();
      }
    }, 1000);
  };
  const endGame = () => {
    clearInterval(interval);
    setGameOver(true);
    const score = getTotalScore();
    if (score > 0) {
      SaveScore({ user: props.userName, score: score })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setScoreSaved(data.success);
          }
        })
        .catch((error) => {
          throw error;
        });
    } else setScoreSaved(true);
  };
  const confirmEndGame = () => {
    if (confirm("Are you sure you want to end this game?")) {
      endGame();
    }
  };
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
      const cleanBoardItem = Object.assign([], props.board).map((item) => {
        return { row: item.row, column: item.column, value: item.value };
      });
      setClonedBoard(cleanBoardItem);
      let boardlist = clonedBoard.filter(
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

    let filtered = clonedBoard.filter((item) => {
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
    });

    return [...filtered].map((item) => {
      item.excludeItems = excludeItems;
      return item;
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
  const endGameButtonStyles = {
    marginTop: 50,
  };
  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1>Boggle</h1>
          <p>Best of luck, {props.userName}</p>
        </div>
        {!gameOver && (
          <div className="col-md-6 text-right">
            <h5>Timer</h5>
            <h4>{time}</h4>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-md-4">
          <Board board={props.board} />
        </div>
        <div className="col-md-4">
          {!gameOver && (
            <>
              <form onSubmit={submitWord}>
                <h3>Enter Word</h3>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    style={textUpperCaseStyles}
                    onChange={handleChange}
                    value={word}
                  />
                  <div className="input-group-append">
                    <input
                      className="btn btn-secondary"
                      type="submit"
                      value="Ok"
                    />
                  </div>
                </div>
                {errors.word && (
                  <div className="text-danger">{errors.word}</div>
                )}
              </form>
              <div className="row">
                <div className="col-md-12 text-center">
                  <input
                    style={endGameButtonStyles}
                    type="button"
                    value="End game"
                    onClick={confirmEndGame}
                    className="btn btn-danger"
                  />
                </div>
              </div>
            </>
          )}
          <div className="row">
            <div className="col-md-12 text-center">
              {gameOver && <h3 className="text-danger">Game Over</h3>}
              {scoreSaved && <Link to="/">Return to home</Link>}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <GameScore scores={props.scores} getTotalScore={getTotalScore} />
        </div>
      </div>
    </div>
  );
};
Game.propTypes = {
  board: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired,
  LoadBoard: PropTypes.func.isRequired,
  WordValidated: PropTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    userName: state.home.userName,
    board: state.game.data,
    scores: state.game.scores,
  };
}
const mapDispatchToProps = {
  LoadBoard,
  WordValidated,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
